<template>
  <div class="fixed inset-0 overlay" @click="closeModal">
    <div
      class="bg-white p-10 modal rounded-lg flex flex-col max-h-full"
      ref="modal"
    >
      <div class="flex items-center space-x-1">
        <div
          class="mr-2 bg-cover rounded-lg w-8 h-8"
          :style="{
            backgroundImage: `url(${userAvatar})`,
          }"
        ></div>
        <p @click="createPost">Мой блог</p>
        <svg width="14" height="14" viewBox="0 0 24 24" id="v_arrow_down">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.831 7.067a1.25 1.25 0 00-1.764.103l-7.029 7.907a.046.046 0 01-.016.013.054.054 0 01-.021.004.054.054 0 01-.021-.004.046.046 0 01-.017-.013l-.921.82.921-.82L4.935 7.17a1.25 1.25 0 10-1.868 1.661l7.028 7.907a2.55 2.55 0 003.812 0l7.028-7.907a1.25 1.25 0 00-.104-1.764z"
          ></path>
        </svg>
      </div>
      <form
        class="mt-5"
        @submit.prevent="createPost"
        method="post"
        enctype="multipart/form-data"
      >
        <input type="file" ref="file" name="file" @change="selectFile" />
      </form>
      <div class="flex items-center space-x-2 my-5">
        <select
          v-model="newPostForm.category"
          class="outline-none text-blue-500"
        >
          <option disabled value="">Выберите категорию</option>
          <option v-for="option in options.categories" :key="option._id">
            {{ option.name }}
          </option>
        </select>
        <transition name="fade" mode="out-in">
          <v-icon
            v-if="newPostForm.icon"
            :name="newPostForm.icon"
            :key="newPostForm.icon"
            class="text-blue-500"
          />
        </transition>
      </div>
      <textarea
        class="outline-none h-24 border-2 border-blue-300 p-3 rounded-lg"
        v-model="newPostForm.title"
        placeholder="Тема поста"
      />
      <textarea
        class="mt-3 outline-none h-48 border-2 border-blue-300 p-3 rounded-lg"
        placeholder="О чем хотите рассказать?"
        v-model="newPostForm.subtitle"
      />
      <div class="absolute right-2 top-2">
        <svg
          class="cursor-pointer"
          @click="closeModal($event, true)"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          id="v_close"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"
          ></path>
        </svg>
      </div>
      <button
        class="
          bg-blue-300
          hover:bg-blue-500
          transition
          p-3
          rounded-lg
          text-white
          mt-5
        "
        :class="{ 'bg-blue-500': newPostForm.title && newPostForm.subtitle }"
        @click="createPost"
        :disabled="loading"
      >
        Опубликовать
        <v-icon v-if="loading" animation="spin" name="fa-spinner" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data: () => ({
    loading: false,
    newPostForm: {
      img: "home.webp",
      icon: "",
      title: "",
      subtitle: "",
      category: "",
      user: "",
      comments: [],
    },
    options: {
      categories: null,
    },
  }),
  methods: {
    ...mapMutations(["toggleCreatePostModal"]),
    selectFile() {
      this.newPostForm.img = this.$refs.file.files[0];
    },
    createPost() {
      if (!this.newPostForm.title || !this.newPostForm.subtitle) return;
      this.loading = true;
      const formData = new FormData();
      formData.append("file", this.newPostForm.img);
      setTimeout(() => {
        this.$axios.post("upload", formData).then((res) => {
          this.$axios
            .post("posts/create", {
              newPost: { ...this.newPostForm, user: this.user, img: res.data },
            })
            .then(() => {
              this.closeModal(null, true);
            })
            .finally(() => {
              this.loading = false;
            });
        });
      }, 1000);
    },
    closeModal(e, flag = false) {
      if (e?.target.classList.contains("overlay") || flag) {
        this.toggleCreatePostModal({ show: false });
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
    userAvatar() {
      return `http://localhost:3000/static/images/avatar/${this.user.avatar}`;
    },
  },
  watch: {
    newPostForm: {
      handler(value) {
        this.newPostForm.icon = this.options.categories.find(category=>category.name === value.category).icon
      },
      deep: true,
    },
  },
  async mounted() {
    this.$axios.get("category").then((res) => {
      this.options.categories = res.data;
    });
    setTimeout(() => {
      this.$refs.modal.style.transform = "translate(-50%, -50%) scale(1)";
    }, 0);
  },
};
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
.modal {
  @apply transition;
  min-width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
}
</style>
