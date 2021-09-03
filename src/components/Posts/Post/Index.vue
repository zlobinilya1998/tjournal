<template>
  <div class="mt-5 bg-white rounded-lg">
    <div class="p-5">
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
        <svg
          v-if="postCreatedByMySelf"
          class="hover:text-gray-900 fill-current cursor-pointer"
          width="18"
          height="24"
          viewBox="0 0 18 4"
          id="ui_etc"
        >
          <path
            d="M2 4a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
          ></path>
        </svg>
        <div v-else>
          <button
            :disabled="loading"
            v-if="subscribedOnPostCreator"
            @click="unsubscribeOnUser"
            class="
              flex
              bg-red-400
              hover:bg-red-500
              transition
              text-white
              rounded-lg
              p-2
              items-center
            "
          >
            <v-icon v-if="loading" animation="spin" name="fa-spinner" />
            <svg
              v-else
              class="fill-current"
              width="12"
              height="12"
              viewBox="0 0 10 10"
              id="ui_close"
            >
              <path
                fill-rule="evenodd"
                d="M9.096 0L5 4.097.903 0 0 .904 4.096 5 0 9.097.903 10 5 5.904 9.096 10 10 9.097 5.903 5 10 .904z"
              ></path>
            </svg>
            <span class="w-full text-center px-5">Отписаться</span>
          </button>
          <button
            :disabled="loading"
            v-else
            @click="subscribeOnUser"
            class="
              flex
              bg-blue-400
              hover:bg-blue-500
              transition
              text-white
              rounded-lg
              p-2
              items-center
            "
          >
            <v-icon v-if="loading" animation="spin" name="fa-spinner" />
            <svg
              v-else
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 20 20"
              id="v_follow"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.61 10.9c1.113-.611 2.578-.9 4.375-.9a.833.833 0 110 1.667c-1.644 0-2.797.268-3.573.693-.748.41-1.182.985-1.385 1.726-.06.22-.018.411.1.547.12.14.45.367 1.257.367h2.767l.001.833v.833H6.384c-1.101 0-1.972-.315-2.515-.94-.546-.628-.63-1.42-.45-2.08.324-1.179 1.05-2.12 2.191-2.747zm4.375 4.933c0 .46-.373.833-.833.833V15c.46 0 .833.373.833.834zm-3.318-10a3.333 3.333 0 116.666 0 3.333 3.333 0 01-6.667 0zM10 4.167A1.667 1.667 0 1010 7.5a1.667 1.667 0 000-3.333zm5 6.666c.46 0 .833.373.833.834v1.666H17.5a.833.833 0 110 1.667h-1.667v1.667a.833.833 0 01-1.667 0V15H12.5a.833.833 0 010-1.667h1.666v-1.666c0-.46.374-.834.834-.834z"
              ></path>
            </svg>
            <span class="w-full text-center px-5">Подписаться</span>
          </button>
        </div>
      </div>
      <h3 @click="postPage" class="font-bold text-lg mt-3 cursor-pointer">
        {{ post.title }}
      </h3>
      <p class="mt-5">{{ post.subtitle }}</p>
    </div>
    <img :src="pathToImg" />
    <div class="p-3 flex justify-between">
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
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: ["post"],
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters(["user", "webRoutes"]),
    pathToImg() {
      return this.webRoutes.postImg + this.post.img;
    },
    postCreatedByMySelf() {
      if (!this.user) return;
      return this.post.user._id === this.user._id;
    },
    subscribedOnPostCreator() {
      if (!this.user) return;
      return this.user.subscriptions.some(
        (user) => user._id === this.post.user._id
      );
    },
  },
  methods: {
    ...mapMutations(["setUser", "toggleRegistrationModal"]),
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
    postPage() {
      this.$router.push({
        name: "post",
        params: { id: this.post._id },
      });
    },
    subscribeOnUser() {
      if (!this.user) {
        this.toggleRegistrationModal({ show: true });
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .put("user/subscribe", {
            subscriber: this.user._id,
            publisher: this.post.user._id,
          })
          .then((res) => {
            this.setUser(res.data);
          })
          .catch((e) => console.log(e))
          .finally(() => {
            this.loading = false;
          });
      }, 600);
    },
    unsubscribeOnUser() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .put("user/unsubscribe", {
            subscriber: this.user._id,
            publisher: this.post.user._id,
          })
          .then((res) => {
            this.setUser(res.data);
          })
          .catch((e) => console.log(e))
          .finally(() => {
            this.loading = false;
          });
      }, 600);
    },
  },
};
</script>

<style scoped></style>
