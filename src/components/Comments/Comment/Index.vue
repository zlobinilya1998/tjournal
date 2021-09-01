<template>
  <div class="my-5">
    <div @click="postHolderProfile" class="flex items-center cursor-pointer hover:text-blue-400 transition">
      <div
        class="mr-2 bg-cover rounded-lg w-6 h-6"
        :style="{
          backgroundImage: `url(${this.userAvatar})`,
        }"
      />
      <span>{{ userName }}</span>
    </div>
    <p class="my-1 text-sm truncate">{{ comment.text }}</p>
    <p class="font-medium text-sm">{{ comment.post.title }}</p>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  computed: {
    userAvatar() {
      return `http://localhost:3000/static/images/avatar/${this.comment.user.avatar}`;
    },
    userName() {
      return this.comment.user.name + " " + this.comment.user.secondName;
    },
  },
  methods:{
    postHolderProfile() {
      this.$router.push({
        name: "profile",
        params: { id: this.comment.user._id },
      });
    },
  },
};
</script>

<style scoped></style>
