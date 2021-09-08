<template>
  <div class="flex space-x-6 items-start">
    <div class="w-2/3 rounded-lg flex justify-center items-center">
      <div v-if="posts" class="space-y-4 w-full">
        <Post v-for="post in posts" :key="post._id" :post="post" />
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
        <div v-if="$attrs.profileUser.subscriptions.length" class="mt-3">
          <div
            @click="commentHolderProfile(user._id)"
            v-for="user in $attrs.profileUser.subscriptions"
            :key="user._id"
            class="
              flex
              items-center
              hover:text-blue-400
              cursor-pointer
              transition
            "
          >
            <div
              class="bg-cover rounded-lg w-10 h-10 mr-2"
              :style="{
                backgroundImage: `url(${webRoutes.userAvatar + user.avatar})`,
              }"
            />
            <span class="text-sm">{{ user.name }}</span>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg p-5 mt-5">
        <p class="font-medium">Ссылки</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Entries",
  data: () => ({
    posts: null,
  }),
  components: {
    Post: () => import("@/components/Posts/Post/Index"),
  },
  computed: {
    ...mapGetters(["webRoutes"]),
  },
  methods: {
    commentHolderProfile(id) {
      this.$router.push({
        name: "profile",
        params: { id },
      });
    },
  },
  watch: {
    $route(to) {
      this.$axios.get("user/posts/" + to.params.id).then((res) => {
        this.posts = res.data;
      });
    },
  },
  mounted() {
    this.$axios.get("post/user/" + this.$route.params.id).then((res) => {
      this.posts = res.data;
    });
  },
};
</script>

<style scoped></style>
