<template>
  <div
    v-if="profileUser"
    class="mx-auto md:w-5/6 lg:w-2/3 xl:w-1/2"
    :key="profileUser._id"
  >
    <div class="bg-white p-5 pb-0 rounded-lg">
      <div class="flex items-start justify-between relative">
        <img
          @click="$refs.file.click()"
          :src="userAvatar"
          class="mr-2 rounded-md cursor-pointer w-24 h-24 object-cover"
          alt="avatar"
        />
        <input type="file" ref="selectAvatar" class="hidden" />
        <form method="post" enctype="multipart/form-data" class="hidden">
          <input
            type="file"
            ref="file"
            name="file"
            @change="uploadProfileAvatar"
          />
        </form>
        <button
          v-if="isMyProfile"
          @click="toggleDropDown"
          class="p-2 bg-white shadow hover:text-yellow-500"
          :class="{ 'text-yellow-500': showDropDown }"
        >
          <svg
            class="fill-current transition duration-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            id="v_gear"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.997 2c-.824 0-1.506.177-2.039.588-.524.404-.772.934-.926 1.336l-.18.491c-.196.543-.269.747-.604.918-.363.186-.596.137-1.129.023a18.62 18.62 0 00-.547-.11c-.427-.078-.99-.135-1.602.085-.614.22-1.14.668-1.617 1.331-.457.636-.66 1.287-.593 1.957.063.624.351 1.138.592 1.518.112.176.208.318.296.446a7 7 0 01.369.587c.162.3.244.558.244.83 0 .26-.08.512-.243.812-.118.216-.23.382-.364.579-.09.13-.188.276-.303.458-.242.383-.529.9-.591 1.524-.067.67.134 1.324.593 1.961.477.663 1.003 1.111 1.616 1.332.611.22 1.174.164 1.602.086.214-.039.394-.077.548-.11.532-.112.766-.161 1.129.025.335.172.408.375.603.918.05.14.108.301.181.49.154.403.402.934.926 1.337.533.41 1.215.588 2.04.588.823 0 1.505-.177 2.038-.588.524-.403.772-.934.926-1.336.073-.19.131-.352.181-.491.195-.543.27-.746.604-.918.363-.186.597-.137 1.13-.024.154.032.333.07.548.11.427.077.99.133 1.6-.087.615-.22 1.14-.67 1.617-1.332.459-.637.66-1.29.593-1.96-.062-.625-.349-1.142-.59-1.525a15.718 15.718 0 00-.304-.459c-.133-.196-.246-.362-.363-.578-.164-.3-.244-.552-.244-.812 0-.272.082-.53.245-.83.117-.217.232-.386.369-.587.087-.128.183-.27.295-.446.241-.38.53-.894.592-1.518.067-.67-.135-1.321-.593-1.957C20.165 6 19.64 5.551 19.025 5.33c-.611-.219-1.175-.162-1.602-.084-.215.04-.394.078-.548.11-.533.114-.766.163-1.128-.022-.336-.172-.409-.376-.604-.919a24.05 24.05 0 00-.18-.49c-.155-.403-.403-.933-.927-1.337-.533-.41-1.215-.588-2.039-.588zm5.529 14.727c-.584-.138-1.628-.385-2.69.16h-.002c-1.114.571-1.468 1.653-1.659 2.237-.03.092-.056.172-.08.235-.113.294-.196.405-.28.469-.073.056-.273.172-.818.172-.545 0-.745-.116-.819-.172-.082-.064-.166-.175-.279-.469a5.33 5.33 0 01-.08-.235c-.19-.584-.544-1.666-1.659-2.237-1.063-.545-2.107-.298-2.69-.16-.1.024-.186.044-.256.057-.294.053-.445.044-.568 0-.12-.043-.347-.17-.67-.618-.23-.32-.236-.497-.226-.594.014-.143.088-.331.292-.654.048-.076.113-.173.187-.284.171-.254.388-.578.545-.866.258-.473.487-1.06.487-1.768 0-.714-.227-1.304-.486-1.782-.16-.296-.38-.622-.552-.877a13.423 13.423 0 01-.182-.276c-.205-.322-.277-.507-.29-.646-.01-.093-.006-.268.226-.589.322-.449.55-.574.668-.617.123-.044.274-.053.567 0 .07.014.156.034.256.058.584.139 1.628.388 2.692-.158 1.115-.571 1.468-1.653 1.659-2.237.03-.092.056-.172.08-.235.113-.294.197-.405.28-.468.073-.057.273-.173.818-.173.545 0 .745.116.819.173.083.063.166.174.279.468.024.063.05.143.08.235.191.584.544 1.666 1.66 2.237 1.063.546 2.108.297 2.692.158.1-.024.185-.044.256-.057.293-.054.444-.045.567 0 .119.042.346.168.669.616.23.321.235.496.226.59-.014.138-.086.323-.29.645-.048.075-.111.169-.183.276l-.552.877c-.259.478-.486 1.068-.486 1.782 0 .709.23 1.295.487 1.768.157.288.374.612.545.866.074.11.14.208.187.284.205.323.278.511.292.654.01.097.004.274-.226.594-.323.449-.55.575-.67.618-.123.044-.274.053-.567 0a6.36 6.36 0 01-.256-.056z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 100 4 2 2 0 000-4z"
            ></path>
          </svg>
        </button>
        <div v-else class="flex space-x-4">
          <div>
            <button
              :disabled="loading"
              v-if="subscribedOnProfileCreator"
              @click="unsubscribeOnUser"
              class="
                flex
                bg-red-400
                hover:bg-red-500
                transition
                text-white
                rounded-lg
                p-2
                items-center
              "
            >
              <v-icon v-if="loading" animation="spin" name="fa-spinner" />
              <svg
                v-else
                class="fill-current"
                width="12"
                height="12"
                viewBox="0 0 10 10"
                id="ui_close"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.096 0L5 4.097.903 0 0 .904 4.096 5 0 9.097.903 10 5 5.904 9.096 10 10 9.097 5.903 5 10 .904z"
                ></path>
              </svg>
              <span class="w-full text-center px-5">Отписаться</span>
            </button>
            <button
              :disabled="loading"
              v-else
              @click="subscribeOnUser"
              class="
                flex
                bg-blue-400
                hover:bg-blue-500
                transition
                text-white
                rounded-lg
                p-2
                items-center
              "
            >
              <v-icon v-if="loading" animation="spin" name="fa-spinner" />
              <svg
                v-else
                class="fill-current"
                width="24"
                height="24"
                viewBox="0 0 20 20"
                id="v_follow"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.61 10.9c1.113-.611 2.578-.9 4.375-.9a.833.833 0 110 1.667c-1.644 0-2.797.268-3.573.693-.748.41-1.182.985-1.385 1.726-.06.22-.018.411.1.547.12.14.45.367 1.257.367h2.767l.001.833v.833H6.384c-1.101 0-1.972-.315-2.515-.94-.546-.628-.63-1.42-.45-2.08.324-1.179 1.05-2.12 2.191-2.747zm4.375 4.933c0 .46-.373.833-.833.833V15c.46 0 .833.373.833.834zm-3.318-10a3.333 3.333 0 116.666 0 3.333 3.333 0 01-6.667 0zM10 4.167A1.667 1.667 0 1010 7.5a1.667 1.667 0 000-3.333zm5 6.666c.46 0 .833.373.833.834v1.666H17.5a.833.833 0 110 1.667h-1.667v1.667a.833.833 0 01-1.667 0V15H12.5a.833.833 0 010-1.667h1.666v-1.666c0-.46.374-.834.834-.834z"
                ></path>
              </svg>
              <span class="w-full text-center px-5">Подписаться</span>
            </button>
          </div>
          <button
            class="
              flex
              bg-blue-400
              hover:bg-blue-500
              transition
              text-white
              rounded-lg
              p-2
            "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 21 19"
              class="fill-current"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.125.2C1.6.2 1.106.378.742.742.378 1.106.2 1.6.2 2.125V18.67l5.751-3.79H18.67c.526 0 1.02-.179 1.383-.543.364-.364.543-.858.543-1.383V2.125c0-.525-.179-1.019-.543-1.383C19.688.378 19.195.2 18.67.2H2.125zm-.481 1.925c0-.197.062-.305.12-.362.056-.057.164-.12.361-.12H18.67c.197 0 .305.063.362.12.057.057.12.165.12.362v10.83c0 .196-.063.304-.12.361-.057.057-.165.12-.362.12H5.52l-3.875 2.553V2.125zm4.241 4.211a1.354 1.354 0 100 2.708 1.354 1.354 0 000-2.708zM9.044 7.69a1.354 1.354 0 112.707 0 1.354 1.354 0 01-2.707 0zm5.865-1.354a1.354 1.354 0 100 2.708 1.354 1.354 0 000-2.708z"
              ></path>
            </svg>
            <span class="w-full text-center px-5">Написать</span>
          </button>
        </div>
        <div class="dropdown absolute right-24 top-12">
          <transition name="fade">
            <div
              ref="dropdown"
              class="ring-1 ring-gray-100 absolute mt-2 bg-white"
              v-if="showDropDown"
            >
              <button
                @click="logout"
                class="
                  hover:text-yellow-500
                  flex
                  items-center
                  p-2
                  transition
                  w-full
                  hover:bg-gray-50
                  text-sm
                  px-4
                "
              >
                <p class="mr-2">Выход</p>
                <v-icon name="fa-sign-out-alt" />
              </button>
            </div>
          </transition>
        </div>
      </div>
      <h2 class="text-3xl font-medium mt-5">
        {{ profileUser.name + " " + profileUser.secondName }}
      </h2>
      <p class="my-5">На проекте с {{ userCreated }}</p>
      <div class="space-x-8 h-12 flex">
        <router-link
          :to="{ name: 'entries' }"
          class="hover:text-blue-400 transition"
          >Статьи</router-link
        >
        <router-link
          :to="{ name: 'comments' }"
          class="hover:text-blue-400 transition"
          >Комментарии</router-link
        >
        <router-link
          :to="{ name: 'details' }"
          class="hover:text-blue-400 transition"
          >Подробнее</router-link
        >
      </div>
    </div>
    <div class="mt-10">
      <transition name="router-fade" mode="out-in">
        <router-view v-slot="{ Component }" :profileUser="profileUser">
          <component :is="Component" />
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    profileUser: null,
    loading: false,
    showDropDown: false,
  }),
  computed: {
    ...mapGetters(["user", "webRoutes"]),
    userAvatar() {
      return this.webRoutes.userAvatar + this.profileUser.avatar;
    },
    userCreated() {
      return new Date(this.profileUser.createdAt)
        .toLocaleDateString("ru-Ru", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replaceAll(".", " ");
    },
    isMyProfile() {
      if (!this.user) return;
      return this.profileUser._id === this.user._id;
    },
    subscribedOnProfileCreator() {
      if (!this.user) return;
      return this.user.subscriptions.some(
        (user) => user._id === this.profileUser._id
      );
    },
  },
  methods: {
    ...mapMutations(["setUser", "toggleRegistrationModal"]),
    logout() {
      sessionStorage.removeItem("Authorization");
      this.setUser(null);
      this.showDropDown = false;
      this.$toast.open("Выход из системы...");
    },
    toggleDropDown() {
      this.showDropDown = !this.showDropDown;
    },
    subscribeOnUser() {
      if (!this.user) {
        this.toggleRegistrationModal({ show: true });
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .put("user/subscribe", {
            subscriber: this.user._id,
            publisher: this.profileUser._id,
          })
          .then((res) => {
            this.setUser(res.data);
          })
          .catch((e) => console.log(e))
          .finally(() => {
            this.loading = false;
          });
      }, 600);
    },
    unsubscribeOnUser() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .put("user/unsubscribe", {
            subscriber: this.user._id,
            publisher: this.profileUser._id,
          })
          .then((res) => {
            this.setUser(res.data);
          })
          .catch((e) => console.log(e))
          .finally(() => {
            this.loading = false;
          });
      }, 600);
    },
    async uploadProfileAvatar() {
      const formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      try {
        this.$axios
          .post("files/avatar", formData)
          .then(({ data }) => this.setUser(data))
          .then(() => {
            this.$axios
              .get(`user/${this.$route.params.id}`)
              .then(({ data }) => (this.profileUser = data));
          });
        this.$toast.success("Аватар профиля успешно изменен");
      } catch (e) {
        this.$toast.error("Произошла ошибка при записи файла");
      }
    },
  },
  mounted() {
    this.$axios
      .get(`user/${this.$route.params.id}`)
      .then((res) => (this.profileUser = res.data));
  },
  watch: {
    $route(to) {
      this.$axios
        .get(`user/${to.params.id}`)
        .then((res) => (this.profileUser = res.data));
    },
  },
};
</script>

<style scoped>
.router-link-active {
  @apply text-black relative font-bold;
}
.router-link-active:after {
  @apply bg-blue-400;
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  left: 0;
  bottom: 0;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: all 0.2s;
}
.router-fade-enter, .router-fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
