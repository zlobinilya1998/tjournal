<template>
  <div class="flex space-x-6 items-start">
    <div class="w-2/3 rounded-lg flex justify-center items-center">
      <div v-if="posts" class="space-y-4">
        <Post
          v-for="post in posts"
          :key="post._id"
          :post="post"
        />
      </div>
      <p v-else>Здесь еще нет публикаций</p>
    </div>
    <div class="w-1/3">
      <div class="bg-white rounded-lg p-5">
        <p class="font-medium">Подписчики</p>
        <p class="text-sm opacity-50 mt-3">У блога еще нет подписчиков</p>
      </div>
      <div class="bg-white rounded-lg p-5 mt-5">
        <p class="font-medium">Подписки</p>
      </div>
      <div class="bg-white rounded-lg p-5 mt-5">
        <p class="font-medium">Ссылки</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Entries",
  data: () => ({
    posts: null,
  }),
  components: {
    Post: () => import("@/components/Posts/Post/Index")
  },
  mounted() {
    this.$axios.get("user/posts/" + this.$route.params.id).then((res) => {
      this.posts = res.data;
    });
  },
};
</script>

<style scoped></style>
