<template>
  <transition name="fade">
    <div v-if="leftSideBar.show" class="self-start w-1/6">Sidebar</div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["leftSideBar"]),
  },
};
</script>

<style scoped></style>
