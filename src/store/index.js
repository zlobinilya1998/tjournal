import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    modals: {
      postSettings: {
        show: false,
      },
      registration: {
        show: false,
      },
      createPost: {
        show: false,
      },
    },
    menu: {
      leftSidebar: {
        show: false,
      },
    },
    webRoutes: {
      userAvatar: "http://localhost:3000/static/images/avatar/",
      postImg: "http://localhost:3000/static/images/news/",
    },
  },
  mutations: {
    setUser: (state, payload) => (state.user = payload),
    toggleRegistrationModal: (state, payload) =>
      (state.modals.registration = payload),
    toggleCreatePostModal: (state, payload) =>
      (state.modals.createPost = payload),
    toggleLeftSidebar: (state) =>
      (state.menu.leftSidebar.show = !state.menu.leftSidebar.show),
  },
  getters: {
    user: (state) => state.user,
    leftSideBar: (state) => state.menu.leftSidebar,
    modals: (state) => state.modals,
    webRoutes: (state) => state.webRoutes,
  },
  actions: {},
  modules: {},
});
