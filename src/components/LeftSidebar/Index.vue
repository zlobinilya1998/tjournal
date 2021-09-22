<template>
  <div
    class="sidebar bg-white rounded-lg"
    ref="sidebar"
    :style="{ width: leftSideBar.show ? '250px' : '45px' }"
  >
    <ul :class="{ 'divide-y': !leftSideBar.show }">
      <router-link
        :to="highlightProfileLink"
        @click.native.prevent="goToMyProfile"
        class="
          px-3
          h-12
          flex
          items-center
          cursor-pointer
          hover:text-yellow-500
          transition
        "
      >
        <v-icon name="fa-user" />
        <transition name="fade">
          <span v-if="leftSideBar.show" class="pl-2">Профиль</span>
        </transition>
      </router-link>
      <router-link
        :to="{ name: link.to }"
        class="
          px-3
          h-12
          flex
          items-center
          cursor-pointer
          hover:text-yellow-500
          transition
        "
        v-for="(link, index) in navigation"
        :key="index"
      >
        <v-icon :name="link.icon" />
        <transition name="fade">
          <span v-if="leftSideBar.show" class="pl-2">{{ link.name }}</span>
        </transition>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    navigation: [
      {
        name: "Новости",
        icon: "fa-book-open",
        to: "posts",
      },
      {
        name: "Популярное",
        icon: "fa-fire-alt",
        to: "news/comments",
      },
    ],
  }),
  methods: {
    ...mapMutations(["toggleRegistrationModal"]),
    goToMyProfile() {
      if (this.user) {
        this.$router.push({
          name: "profile",
          params: { id: this.user._id },
        });
      } else {
        this.toggleRegistrationModal({ show: true });
      }
    },
  },
  computed: {
    ...mapGetters(["leftSideBar", "user"]),
    highlightProfileLink(){
      return this.$route.meta.profileRoute ? this.$route.name : 'undefined'
    }
  },
};
</script>

<style scoped lang="postcss">
.sidebar {
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
}
.router-link-active {
  @apply text-yellow-500;
}
.router-link-exact-active {
  @apply text-yellow-500;
}
</style>
