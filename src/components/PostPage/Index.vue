<template>
  <div class="w-2/3 mx-auto" v-if="post">
    <div class="bg-white rounded-lg">
      <div class="mt-5 bg-white rounded-lg">
        <div class="p-5 px-48">
          <div class="flex justify-between items-center">
            <div>
              <v-icon :name="post.icon" class="mr-2" fill="blue" />
              <span class="mr-3 font-medium">{{ post.category }}</span>
              <span
                class="mr-3 cursor-pointer hover:text-blue-400 transition"
                @click="postHolderProfile"
                >{{ post.user.name + " " + post.user.secondName }}</span
              >
            </div>
          </div>
          <h3 class="font-bold text-4xl mt-3">
            {{ post.title }}
          </h3>
          <p class="mt-5 text-md">{{ post.subtitle }}</p>
        </div>
        <img :src="pathToImg" />
        <div class="p-3 flex justify-between px-48 py-10">
          <span class="flex space-x-10">
            <div class="flex items-center">
              <svg
                class="opacity-75 cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                id="v_comments"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.62 6.772C5.338 7.894 4.5 9.548 4.5 11.728c0 2.18.837 3.835 2.12 4.956 1.3 1.135 3.117 1.772 5.126 1.772 1.225 0 2.113-.08 3.025-.444.734-.292 1.507-.233 2.144-.019l.008.003 2.486.88-.862-2.746-.005-.02c-.167-.619-.247-1.385.023-2.142.27-.754.427-1.382.427-2.24 0-2.18-.836-3.834-2.12-4.956C15.572 5.637 13.755 5 11.746 5c-2.009 0-3.825.637-5.125 1.772zM5.306 5.266C7.021 3.767 9.327 3 11.746 3c2.42 0 4.725.767 6.441 2.266 1.732 1.512 2.805 3.722 2.805 6.462 0 1.16-.226 2.025-.543 2.913-.082.23-.084.539.019.93l.97 3.09.005.02c.189.702-.11 1.346-.471 1.73-.353.378-1.02.764-1.783.509l-.008-.003-2.91-1.03c-.301-.1-.57-.093-.76-.017-1.268.505-2.46.586-3.765.586-2.419 0-4.725-.767-6.44-2.266C3.572 16.678 2.5 14.469 2.5 11.729c0-2.74 1.073-4.95 2.805-6.462z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3" v-if="post.comments.length">{{
                post.comments.length
              }}</span>
            </div>
            <div class="flex items-center">
              <svg
                @click="createRepost"
                class="opacity-75 cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                id="v_repost"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.91 5a1 1 0 011-1h5.912a6 6 0 016 6v3.683l1.497-1.41a1 1 0 011.371 1.455l-3.182 3a1 1 0 01-1.372 0l-3.183-3a1 1 0 111.372-1.456l1.497 1.411V10a4 4 0 00-4-4H7.91a1 1 0 01-1-1zM4.497 7.272a1 1 0 011.372 0l3.182 3a1 1 0 01-1.372 1.456l-1.496-1.411v3.433c0 .242 0 .334.003.407a4 4 0 003.84 3.84c.073.003.165.003.407.003h5.661a1 1 0 110 2h-5.686c-.209 0-.343 0-.461-.005a6 6 0 01-5.76-5.76 12.488 12.488 0 01-.004-.46v-3.458l-1.497 1.41a1 1 0 01-1.372-1.455l3.183-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3" v-if="post.reposts.length">{{
                post.reposts.length
              }}</span>
            </div>
            <svg
              class="opacity-75 cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="v_favorite"
            >
              <path
                fill-rule="evenodd"
                d="M16 5H8a2 2 0 00-2 2v11.863l4.162-3.3a3 3 0 013.735.007L18 18.844V7a2 2 0 00-2-2zM8 3a4 4 0 00-4 4v12.545c0 1.397 1.613 2.177 2.707 1.309l4.698-3.723a1 1 0 011.245.002l4.638 3.702c1.094.873 2.712.095 2.712-1.305V7a4 4 0 00-4-4H8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="opacity-75 cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="v_share"
            >
              <path
                fill-rule="evenodd"
                d="M12.681 4.268a1 1 0 00-1.363 0l-4.5 4.19a1 1 0 001.363 1.464L11 7.298V15a1 1 0 002 0V7.298l2.818 2.624a1 1 0 101.363-1.463l-4.5-4.19zM5 14a1 1 0 10-2 0v3a3 3 0 003 3h12a3 3 0 003-3v-3a1 1 0 10-2 0v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span class="flex space-x-3">
            <svg
              @click="dislike"
              class="opacity-75 cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="v_arrow_down"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.831 7.067a1.25 1.25 0 00-1.764.103l-7.029 7.907a.046.046 0 01-.016.013.054.054 0 01-.021.004.054.054 0 01-.021-.004.046.046 0 01-.017-.013l-.921.82.921-.82L4.935 7.17a1.25 1.25 0 10-1.868 1.661l7.028 7.907a2.55 2.55 0 003.812 0l7.028-7.907a1.25 1.25 0 00-.104-1.764z"
              ></path>
            </svg>
            <p>{{ post.likes }}</p>
            <svg
              @click="like"
              class="opacity-75 cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="v_arrow_up"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.17 16.934a1.25 1.25 0 001.764-.104l7.029-7.907a.046.046 0 01.016-.012.053.053 0 01.021-.004c.009 0 .016.002.021.004a.03.03 0 01.016.012l7.029 7.907a1.25 1.25 0 001.868-1.66l-7.028-7.907a2.55 2.55 0 00-3.812 0l-7.028 7.906a1.25 1.25 0 00.104 1.765z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg mt-8 p-5 px-48">
      <h3 class="font-bold text-lg">
        {{
          post.comments.length > 0
            ? post.comments.length + " комментариев"
            : "Комментариев пока нет"
        }}
      </h3>
      <div class="flex items-center space-x-4 my-5">
        <input
          v-model="newComment"
          type="text"
          placeholder="Написать комментарий"
          class="
            p-3
            focus:outline-none focus:ring focus:border-blue-300
            bg-gray-50
            w-full
            rounded-lg
          "
        />
        <button
          @click="createComment"
          class="
            bg-blue-300
            hover:bg-blue-500
            transition
            p-3
            rounded-lg
            text-white
            flex
            items-center
          "
          :disabled="!newComment"
          :class="{ 'bg-blue-500': newComment }"
        >
          <span class="mr-2"> Отправить </span>
          <v-icon
            :name="loading ? 'fa-spinner' : 'fa-reply'"
            :animation="loading ? 'spin' : null"
          ></v-icon>
        </button>
      </div>
      <div v-if="post.comments.length > 0" class="mt-8">
        <div v-for="comment in post.comments" :key="comment._id" class="mb-5">
          <div class="flex justify-between items-start">
            <div class="flex items-center">
              <div
                class="mr-2 bg-cover rounded-lg w-8 h-8"
                :style="{
                  backgroundImage: `url(http://localhost:3000/static/images/avatar/${comment.user.avatar})`,
                }"
              />
              <span class="font-medium">{{
                comment.user.name + " " + comment.user.secondName
              }}</span>
            </div>
            <p
              class="p-1 px-4 bg-gray-100 rounded-md text-sm font-medium"
              :class="{ 'bg-green-100 text-green-700': comment.likes > 0 }"
            >
              {{ comment.likes }}
            </p>
          </div>
          <p class="mt-2">{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    post: null,
    newComment: "",
    loading: false,
  }),
  computed: {
    ...mapGetters(["user","webRoutes"]),
    pathToImg() {
      return this.webRoutes.postImg + this.post.img;
    },
    userAvatar() {
      return this.webRoutes.userAvatar + this.post.user.avatar;
    },
    userName() {
      return this.post.user.name + " " + this.post.user.secondName;
    },
  },
  methods: {
    like() {
      this.$axios.put("posts/like", { _id: this.post._id }).then((res) => {
        this.$emit("updated", res.data);
      });
    },
    dislike() {
      this.$axios.put("posts/dislike", { _id: this.post._id }).then((res) => {
        this.$emit("updated", res.data);
      });
    },
    createComment() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .post("comments/create", {
            _id: this.post._id,
            userId: this.user._id,
            text: this.newComment,
          })
          .then((res) => {
            this.post = res.data;
            this.newComment = "";
          })
          .finally(() => {
            this.loading = false;
          });
      }, 600);
    },
    createRepost() {
      this.$axios
        .post("/posts/repost/create", { _id: this.post._id })
        .then((res) => console.log(res));
    },
    postHolderProfile() {
      this.$router.push({
        name: "profile",
        params: { id: this.post.user._id },
      });
    },
  },
  mounted() {
    this.$axios
      .get(`posts/post/${this.$route.params.id}`)
      .then((res) => (this.post = res.data));
  },
};
</script>

<style scoped></style>
