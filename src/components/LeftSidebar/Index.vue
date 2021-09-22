<template>
  <transition name="fade">
    <div
      class="sidebar bg-white rounded-lg"
      ref="sidebar"
      :style="{ width: leftSideBar.show ? '250px' : '50px' }"
    >
      <ul>
        <li
          class="px-3 h-12 flex items-center cursor-pointer hover:text-yellow-500 transition"
          v-for="(link, index) in navigation"
          :key="index"
        >
          <v-icon :name="link.icon" class="mr-2" />
          <transition name="fade">
            <span v-if="leftSideBar.show">{{ link.name }}</span>
          </transition>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    navigation: [
      {
        name: "Популярное",
        icon: "fa-fire-alt",
        href: "",
      },
      {
        name: "Популярное",
        icon: "fa-fire-alt",
        href: "",
      },
      {
        name: "Популярное",
        icon: "fa-fire-alt",
        href: "",
      },
      {
        name: "Популярное",
        icon: "fa-fire-alt",
        href: "",
      },
    ],
  }),
  computed: {
    ...mapGetters(["leftSideBar"]),
  },
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
}
</style>
