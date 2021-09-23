<template>
  <div id="app">
    <Modals />
    <component :is="currentLayout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { io } from "socket.io-client";

export default {
  computed: {
    ...mapGetters(['newPostsCount']),
    currentLayout: () => {
      return () => import("@/Layouts/MainLayout.vue");
    },
  },
  components: {
    Modals: () => import("@/components/Modals/Index"),
  },
  methods: {
    ...mapMutations(["setUser", "setSocket","incrementNewPostsCount"]),
    auth() {
      this.$axios
        .post("auth")
        .then((res) => {
          this.setUser(res.data);
        })
        .catch((e) => console.log(e));
    },
  },
  beforeMount() {
    if (sessionStorage.getItem("Authorization")) {
      this.$axios.defaults.headers.common["Authorization"] =
        sessionStorage.getItem("Authorization");
    }
    this.auth();
    const connection = io("http://localhost:8081");
    connection.on('new-post',()=>{
      this.incrementNewPostsCount(1)
    })
    this.setSocket(connection);
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
body::-webkit-scrollbar {
  width: 0;
}
</style>
