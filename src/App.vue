<template>
  <div id="app">
    <Modals />
    <component :is="currentLayout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    currentLayout: () => {
      return () => import("@/Layouts/MainLayout.vue");
    },
  },
  components: {
    Modals: () => import("@/components/Modals/Index"),
  },
  methods: {
    ...mapMutations(["setUser"]),
  },
  async mounted() {
    let user = await this.$axios
      .get("user/profile/612e734dc194f45caf180d04")
      .then((res) => res.data);
    this.setUser(user);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
* {
  font-family: Roboto, sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
