<template>
  <div class="bg-yellow-100 h-14 px-6 flex justify-between">
    <div class="flex items-center">
      <svg
        @click="toggleLeftSidebar"
        class="mr-4"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        id="ui_burger"
      >
        <path
          fill-rule="evenodd"
          d="M2 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <router-link :to="{ name: 'home' }">
        <svg
          class="mr-4"
          viewBox="0 0 24 25"
          height="50"
          width="32"
          id="site_logo"
        >
          <path fill="#e8a427" class="st0" d="M0 19h8.5v6H0v-6z"></path>
          <path class="st1" d="M0 7h8.5v18l6.5-6V7h9V0H0v7z"></path>
          <path
            fill="rgba(0,0,0,0.15)"
            class="st2"
            d="M7.5 19h1v6l-1-6z"
          ></path>
        </svg>
      </router-link>
      <div class="mr-2 flex items-center bg-gray-100 p-2 rounded-lg">
        <svg
          class="mr-2"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          id="v_search"
        >
          <path
            d="M11 5a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.905l3.387 3.388a1 1 0 01-1.414 1.414l-3.387-3.387A8 8 0 013 11z"
          ></path>
        </svg>
        <input class="outline-none" type="text" placeholder="Поиск" />
      </div>
      <button class="btn-white font-medium" @click="createNewPost">
        Новая запись
      </button>
    </div>
    <div v-if="user" class="flex items-center">
      <svg
        class="mr-4"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 21 19"
      >
        <g data-v-383ef8ac="" fill="currentColor">
          <path
            data-v-d4ebc8c2=""
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.125.2C1.6.2 1.106.378.742.742.378 1.106.2 1.6.2 2.125V18.67l5.751-3.79H18.67c.526 0 1.02-.179 1.383-.543.364-.364.543-.858.543-1.383V2.125c0-.525-.179-1.019-.543-1.383C19.688.378 19.195.2 18.67.2H2.125zm-.481 1.925c0-.197.062-.305.12-.362.056-.057.164-.12.361-.12H18.67c.197 0 .305.063.362.12.057.057.12.165.12.362v10.83c0 .196-.063.304-.12.361-.057.057-.165.12-.362.12H5.52l-3.875 2.553V2.125zm4.241 4.211a1.354 1.354 0 1 0 0 2.708 1.354 1.354 0 0 0 0-2.708zM9.044 7.69a1.354 1.354 0 1 1 2.707 0 1.354 1.354 0 0 1-2.707 0zm5.865-1.354a1.354 1.354 0 1 0 0 2.708 1.354 1.354 0 0 0 0-2.708z"
            data-v-383ef8ac=""
          ></path>
        </g>
      </svg>
      <svg class="mr-4" height="24" width="24" viewBox="0 0 16 17">
        <path
          fill-rule="evenodd"
          d="M15.49 13.802l.055.047v.066c0 .745-.581 1.078-1.3 1.078H9.468c0 .943-.786 2.007-1.695 2.007-.91 0-1.739-1.064-1.739-2.007H1.336C.618 14.993 0 14.66 0 13.915v-.066l.055-.047C2.009 12.179 3 9.585 3 6.085c0-1.783 1.318-3.887 3.782-4.359a.667.667 0 01-.055-.264c0-.528.491-.99 1.046-.99.554 0 1.045.462 1.045.99a.667.667 0 01-.054.264c2.463.472 3.781 2.576 3.781 4.359 0 3.5.991 6.094 2.946 7.717zM7.774 3.113c-2.41 0-3.41 1.88-3.41 2.888 0 3.236-.718 5.683-2.2 7.47h11.219c-1.482-1.787-2.2-4.234-2.2-7.47 0-1.009-1-2.888-3.41-2.888"
        ></path>
      </svg>
      <div
        class="mr-2 bg-cover rounded-lg w-10 h-10"
        :style="{
          backgroundImage: `url(${this.userAvatar})`,
        }"
      />
      <svg height="7" width="12" viewBox="0 0 18 11" id="ui_arrow_down">
        <path
          fill-rule="evenodd"
          d="M8.109 10.41L.369 2.265a1.377 1.377 0 010-1.876 1.217 1.217 0 011.783 0L9 7.594 15.848.39a1.217 1.217 0 011.783 0 1.377 1.377 0 010 1.876L9.89 10.41c-.246.26-.57.39-.891.39-.322 0-.645-.132-.89-.39h-.001z"
        ></path>
      </svg>
    </div>
    <div v-else class="flex items-center">
      <svg class="mr-4" height="24" width="24" viewBox="0 0 16 17">
        <path
          fill-rule="evenodd"
          d="M15.49 13.802l.055.047v.066c0 .745-.581 1.078-1.3 1.078H9.468c0 .943-.786 2.007-1.695 2.007-.91 0-1.739-1.064-1.739-2.007H1.336C.618 14.993 0 14.66 0 13.915v-.066l.055-.047C2.009 12.179 3 9.585 3 6.085c0-1.783 1.318-3.887 3.782-4.359a.667.667 0 01-.055-.264c0-.528.491-.99 1.046-.99.554 0 1.045.462 1.045.99a.667.667 0 01-.054.264c2.463.472 3.781 2.576 3.781 4.359 0 3.5.991 6.094 2.946 7.717zM7.774 3.113c-2.41 0-3.41 1.88-3.41 2.888 0 3.236-.718 5.683-2.2 7.47h11.219c-1.482-1.787-2.2-4.234-2.2-7.47 0-1.009-1-2.888-3.41-2.888"
        ></path>
      </svg>
      <button class="flex items-center hover:text-yellow-600 transition" @click="login">
        <svg
          class="mr-3 fill-current"
          width="24"
          height="24"
          viewBox="0 0 20 20"
          id="signin"
        >
          <path
            d="M.25 10C.25 4.62 4.61.25 10 .25c5.38 0 9.75 4.37 9.75 9.75s-4.37 9.75-9.75 9.75c-2.29 0-4.39-.79-6.05-2.11a9.81 9.81 0 01-1.24-1.17A9.71 9.71 0 01.25 10zM10 18.25c2.14 0 4.1-.82 5.56-2.16-1.05-2.53-3.2-4.34-5.56-4.34-2.36 0-4.51 1.81-5.56 4.34A8.21 8.21 0 0010 18.25zM12.25 8c0-1.24-1.01-2.25-2.25-2.25S7.75 6.76 7.75 8s1.01 2.25 2.25 2.25S12.25 9.24 12.25 8zm-4.77 2.78A3.751 3.751 0 0110 4.25a3.751 3.751 0 012.52 6.53c1.74.75 3.2 2.23 4.14 4.09 1-1.37 1.59-3.05 1.59-4.87 0-4.56-3.69-8.25-8.25-8.25-4.56 0-8.25 3.69-8.25 8.25 0 1.82.59 3.51 1.59 4.87.94-1.86 2.4-3.34 4.14-4.09z"
          ></path>
        </svg>
        <span class="font-medium">Войти</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  methods: {
    ...mapMutations(["toggleLeftSidebar", "toggleCreatePostModal","toggleRegistrationModal"]),
    createNewPost() {
      if (!this.user) return this.toggleRegistrationModal({show:true});
      this.toggleCreatePostModal({ show: true });
    },
    login(){
      this.toggleRegistrationModal({ show: true });
    },
  },
  computed: {
    ...mapGetters(["user","webRoutes"]),
    userAvatar() {
      return this.webRoutes.userAvatar + this.user.avatar;
    },
  },
};
</script>

<style scoped></style>
