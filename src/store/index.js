import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    modals: {
      configureNews: {
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
      userAvatar: "http://localhost:3000/",
      postImg: "http://localhost:3000/",
      img: "http://localhost:3000/",
    },
  },
  mutations: {
    setUser: (state, payload) => (state.user = payload),
    toggleConfigureNewsModal: (state, payload) =>
      (state.modals.configureNews = payload),
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
