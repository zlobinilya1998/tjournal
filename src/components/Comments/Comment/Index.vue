<template>
  <div class="my-5">
    <div
      @click="postHolderProfile"
      class="flex items-center cursor-pointer hover:text-blue-400 transition"
    >
      <img class="mr-2 rounded-lg w-6 h-6 object-cover" :src="userAvatar" />
      <span>{{ userName }}</span>
    </div>
    <p class="my-1 text-sm truncate">{{ comment.text }}</p>
    <p
      class="font-medium text-sm cursor-pointer hover:text-blue-400 transition"
      @click="postPage"
    >
      {{ comment.post.title }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["comment"],
  computed: {
    ...mapGetters(["webRoutes"]),
    userAvatar() {
      return this.webRoutes.userAvatar + this.comment.user.avatar;
    },
    userName() {
      return this.comment.user.name + " " + this.comment.user.secondName;
    },
  },
  methods: {
    postHolderProfile() {
      this.$router.push({
        name: "profile",
        params: { id: this.comment.user._id },
      });
    },
    postPage() {
      this.$router.push({
        name: "post",
        params: { id: this.comment.post._id },
      });
    },
  },
};
</script>

<style scoped></style>
