<template>
  <div class="lg:w-3/4 flex ml-auto">
    <div class="w-full md:w-8/12 lg:w-2/4">
      <div
        class="
          rounded-lg
          p-5
          bg-white
          flex
          justify-between
          items-start
          transition
        "
      >
        <p class="font-bold">{{ today }}</p>
        <div
          @click="collapsed = !collapsed"
          class="
            font-light
            flex
            items-center
            hover:text-blue-400
            cursor-pointer
          "
        >
          <svg
            class="mr-2"
            width="9"
            height="8"
            viewBox="0 0 18 11"
            id="ui_arrow_down"
          >
            <path
              fill-rule="evenodd"
              d="M8.109 10.41L.369 2.265a1.377 1.377 0 010-1.876 1.217 1.217 0 011.783 0L9 7.594 15.848.39a1.217 1.217 0 011.783 0 1.377 1.377 0 010 1.876L9.89 10.41c-.246.26-.57.39-.891.39-.322 0-.645-.132-.89-.39h-.001z"
            ></path>
          </svg>
          <p>развернуть</p>
        </div>
      </div>
      <div class="mt-8 pl-5 flex justify-between">
        <div class="flex items-center cursor-pointer" @click="configureNews">
          <svg
            class="mr-2"
            width="15"
            height="14"
            viewBox="0 0 14 16"
            id="ui_gear"
          >
            <path
              d="M3.743 8c0-1.818 1.46-3.294 3.257-3.294 1.797 0 3.264 1.476 3.264 3.294S8.797 11.294 7 11.294c-1.797 0-3.257-1.476-3.257-3.294zM7 5.98a1.79 1.79 0 00-.55.084c-.063.014-.118.042-.173.063-.007 0-.014.007-.02.007-.249.097-.483.25-.662.445a2.016 2.016 0 000 2.842c.035.048.083.09.131.132l.158.118.166.105c.22.118.468.202.723.23.075.006.151.014.227.014A2.01 2.01 0 008.997 8c0-.557-.22-1.059-.585-1.42a1.713 1.713 0 00-.29-.251 1.785 1.785 0 00-.247-.147A2.068 2.068 0 007 5.98zM2.613 4.1a.411.411 0 00-.557.153l-.737 1.289a.42.42 0 00.151.564l1.026.599-.082.445a4.697 4.697 0 000 1.7l.082.445-1.026.6a.42.42 0 00-.151.563l.737 1.288c.11.195.365.265.557.154l1.026-.6.338.293c.434.37.923.655 1.453.85l.413.153v1.19c0 .12.048.23.13.307a.405.405 0 00.297.133h1.467c.11 0 .206-.05.29-.133a.163.163 0 00.054-.062.425.425 0 00.076-.244v-1.19l.413-.154c.53-.195 1.02-.48 1.453-.85l.338-.292.04.02.986.579a.42.42 0 00.564-.154l.73-1.288a.414.414 0 00-.151-.564l-1.02-.599.076-.445a4.697 4.697 0 000-1.7l-.075-.445 1.019-.6c.2-.11.261-.368.151-.563l-.73-1.289a.42.42 0 00-.564-.153l-1.026.6-.338-.293a4.626 4.626 0 00-1.453-.85l-.413-.153v-1.19c0-.238-.2-.44-.42-.44H6.27a.417.417 0 00-.29.133.164.164 0 00-.054.062.425.425 0 00-.076.244v1.19l-.413.154a4.625 4.625 0 00-1.453.85l-.007.007-.338.285-.02-.007-.02-.014-.986-.578zm.634 8.907a1.676 1.676 0 01-2.293-.62L.224 11.1A1.714 1.714 0 01.058 9.81c.11-.432.4-.801.779-1.024l.268-.16a6.353 6.353 0 010-1.254l-.268-.16a1.705 1.705 0 01-.613-2.312L.967 3.6a1.673 1.673 0 011.006-.773 1.662 1.662 0 011.274.167l.262.16c.337-.244.695-.46 1.074-.634v-.306C4.583 1.266 5.34.5 6.27.5h1.467c.93 0 1.68.766 1.68 1.713v.306c.379.175.737.384 1.074.627l.262-.153a1.674 1.674 0 012.293.62l.73 1.288a1.705 1.705 0 01-.613 2.312l-.261.16c.041.418.041.836 0 1.254l.261.16a1.705 1.705 0 01.613 2.312l-.73 1.288a1.672 1.672 0 01-2.293.62l-.262-.16a6.42 6.42 0 01-1.074.633v.307c0 .947-.75 1.713-1.68 1.713H6.27c-.93 0-1.687-.766-1.687-1.713v-.307a6.67 6.67 0 01-1.074-.626l-.262.153zm.599-8.754l.007-.006h-.007v.006zm6.308 7.5l.007-.007h-.007v.008z"
            ></path>
          </svg>
          <span
            class="font-bold"
            :style="{ 'border-bottom': '1px dashed rgba(0,0,0,0.2)' }"
            >Настроить ленту</span
          >
        </div>
        <div>
          <span
            class="rounded-full p-3 mr-3 cursor-pointer transition"
            :class="{ 'bg-white shadow': filter === 'rating' }"
            @click="sortBy('rating')"
            >Популярное</span
          >
          <span
            class="rounded-full p-3 cursor-pointer transition"
            :class="{ 'bg-white shadow': filter === 'latest' }"
            @click="sortBy('latest')"
            >Свежее</span
          >
        </div>
      </div>
      <div class="relative">
        <v-icon
          v-if="loading && !posts"
          class="absolute inset-1/2 top-24 text-yellow-500"
          name="fa-spinner"
          :scale="1.5"
          animation="spin"
        />
        <div v-else-if="posts && posts.length" class="mt-5 space-y-8">
          <div
            @click="fetchPosts"
            v-if="newPostsCount"
            class="
              bg-white
              hover:bg-blue-500 hover:text-white
              font-bold
              transition
              p-5
              rounded-lg
              flex
              justify-center
              items-center
              cursor-pointer
              mb-10
            "
          >
            <p class="mr-3">Кол-во новых постов</p>
            <v-icon
              v-if="loading"
              name="fa-spinner"
              :scale="1"
              animation="spin"
            />
            <span v-else>{{ newPostsCount }}</span>
          </div>
          <transition-group @before-enter="beforeEnter" @enter="enter">
            <Post
              v-for="(post,index) in posts"
              :key="post._id"
              :post="post"
              :data-index="index"
              @updated="updatePost"
            />
          </transition-group>
        </div>
        <div v-else class="text-center mt-10 font-bold">Постов пока нет...</div>
      </div>
    </div>
    <Comments class="hidden md:block ml-auto w-3/12 lg:w-1/4" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data: () => ({
    posts: null,
    filter: "latest",
    loading: false,
    collapsed: false,
  }),
  components: {
    Post: () => import("@/components/Posts/Post/Index"),
    Comments: () => import("@/components/Comments/Index"),
  },
  computed: {
    ...mapGetters(["user", "newPostsCount"]),
    today: () =>
      new Date()
        .toLocaleDateString("ru-Ru", {
          day: "2-digit",
          month: "long",
          weekday: "long",
        })
        .split(",")
        .reverse()
        .join(","),
  },
  watch: {
    filter(newVal) {
      if (newVal === "rating") this.posts.sort((a, b) => b.likes - a.likes);
      else {
        this.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
    },
  },
  methods: {
    ...mapMutations([
      "toggleConfigureNewsModal",
      "toggleRegistrationModal",
      "setNewPostsCount",
    ]),
    beforeEnter: function (el) {
      el.style.opacity = '0'
      el.style.transform = "translateY(-10px)";
    },
    enter: function (el) {
      const delay = el.dataset.index * 75;
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = "";
      }, delay);
    },
    fetchPosts() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .get("post")
          .then((res) => {
            this.posts = res.data;
            this.setNewPostsCount(0);
          })
          .finally(() => {
            this.loading = false;
          });
      }, 1500);
    },
    sortBy(value) {
      this.filter = value;
    },
    async subscribeOnNewPosts() {
      try {
        let { data } = await this.$axios.get("posts/subscribe");
        this.posts = data;
        await this.subscribeOnNewPosts();
      } catch (e) {
        setTimeout(() => {
          this.subscribeOnNewPosts();
        }, 5000);
      }
    },
    updatePost(newPost) {
      let updatedPosts = this.posts.map((post) => {
        if (post._id === newPost._id) return newPost;
        else return post;
      });
      this.posts = updatedPosts;
    },
    configureNews() {
      if (!this.user) {
        return this.toggleRegistrationModal({ show: true });
      }
      this.toggleConfigureNewsModal({ show: true });
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped></style>
