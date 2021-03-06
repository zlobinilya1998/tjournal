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
    newPostsCount: 0,
    socket: null,
  },
  mutations: {
    setSocket: (state, payload) => (state.socket = payload),
    setUser: (state, payload) => (state.user = payload),
    setNewPostsCount: (state, payload) => (state.newPostsCount = payload),
    incrementNewPostsCount: (state, payload) =>
      (state.newPostsCount += payload),
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
    newPostsCount: (state) => state.newPostsCount,
    leftSideBar: (state) => state.menu.leftSidebar,
    modals: (state) => state.modals,
    webRoutes: (state) => state.webRoutes,
    socket: (state) => state.socket,
  },
  actions: {},
  modules: {},
});
