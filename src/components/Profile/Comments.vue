<template>
  <div class="flex space-x-6 items-start">
    <div class="w-2/3 rounded-lg flex justify-center items-center">
      <div v-if="comments.length > 0" class="w-full">
        <div
          v-for="comment in comments"
          :key="comment._id"
          class="p-5 bg-white rounded-lg mb-8"
        >
          <p class="font-bold text-sm">{{ comment.post.title }}</p>
          <div
            @click="postHolderProfile"
            class="
              flex
              items-center
              cursor-pointer
              hover:text-blue-400
              transition
              my-3
            "
          >
            <div
              class="mr-2 bg-cover rounded-lg w-6 h-6"
              :style="{
                backgroundImage: `url(${userAvatar})`,
              }"
            />
            <span>{{ userName }}</span>
          </div>
          <p>{{ comment.text }}</p>
        </div>
      </div>
      <div v-else class="w-full p-5 bg-white rounded-lg">
        Пользователь еще не оставил ни одного комментария
      </div>
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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    comments: [],
  }),
  computed: {
    ...mapGetters(["webRoutes"]),
    userAvatar() {
      return this.webRoutes.userAvatar + this.$attrs.profileUser.avatar;
    },
    userName() {
      return (
        this.$attrs.profileUser.name + " " + this.$attrs.profileUser.secondName
      );
    },
  },
  methods: {
    postHolderProfile() {
      this.$router.push({
        name: `entries`,
      });
    },
  },
  watch: {
    $route(to) {
      this.$axios.get("comments/user/" + to.params.id).then((res) => {
        this.comments = res.data;
      });
    },
  },
  mounted() {
    this.$axios.get("comments/user/" + this.$route.params.id).then((res) => {
      this.comments = res.data;
    });
  },
};
</script>

<style scoped></style>
