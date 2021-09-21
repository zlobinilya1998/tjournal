<template>
  <div>
    <div class="flex items-center cursor-pointer" @click="show = !show">
      <h3 class="font-medium">Комментарии</h3>
      <svg
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        id="v_chevron_right"
        :style="{ transform: show ? 'rotate(90deg)' : '' }"
        class="transition"
        :class="{'text-blue-400': show}"
      >
        <path
          class="fill-current"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.793 6.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.086 12 9.793 7.707a1 1 0 010-1.414z"
          fill="#000"
        ></path>
      </svg>
    </div>
    <transition-group name="fade">
      <div key="first" class="mt-5" v-if="show && comments.length">
        <Comment
          v-for="comment in comments"
          :comment="comment"
          :key="comment._id"
        />
      </div>
      <div
        key="second"
        v-else-if="show && !comments.length && !loading"
        class="text-sm"
      >
        Комментариев пока нет...
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    comments: [],
    show: true,
    loading: true,
  }),
  mounted() {
    setTimeout(() => {
      this.$axios
        .get("comment")
        .then((res) => (this.comments = res.data))
        .finally(() => {
          this.loading = false;
        });
    }, 500);
  },
  components: {
    Comment: () => import("@/components/Comments/Comment/Index"),
  },
};
</script>

<style scoped></style>
