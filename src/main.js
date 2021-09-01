import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import { AOS, VueAxios, axios, OhVueIcon } from "./plugins/index";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
const axiosConfig = {
  baseURL: "http://localhost:3000/api/",
  timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig);

//Register global component
Vue.component("v-icon", OhVueIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    AOS.init({
      offset: 150,
      delay: 0,
      duration: 400,
      easing: "ease",
      once: true,
      anchorPlacement: "top-bottom",
    });
  },
}).$mount("#app");
