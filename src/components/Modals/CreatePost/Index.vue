<template>
  <div class="fixed inset-0 overlay" @click="closeModal">
    <div class="bg-white modal rounded-lg flex flex-col max-h-full" ref="modal">
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
      <div class="p-5 flex space-x-4 items-center">
        <div class="flex items-center space-x-2">
          <select v-model="newPostForm.category" class="outline-none w-24">
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
            />
          </transition>
        </div>
        <Toolbar
          @createTitle="createTitle"
          @createParagraph="createParagraph"
          @createPostBackground="$refs.file.click()"
          @createImg="$refs.img.click()"
        />
      </div>
      <form method="post" enctype="multipart/form-data" class="hidden">
        <input type="file" ref="file" name="file" @change="selectFile" />
        <input type="file" ref="img" name="file" @change="selectImg" />
      </form>
      <input
        type="text"
        v-model="newPostForm.title"
        placeholder="Заголовок поста"
        class="outline-none p-5 pt-0 font-bold text-xl"
      />
      <div ref="editor" class="editor flex-1" />
      <div class="flex space-x-2 p-5">
        <button
          class="
            bg-blue-300
            hover:bg-blue-500
            transition
            p-2
            rounded-lg
            text-white
          "
          :class="{ 'bg-blue-500': !$v.newPostForm.$invalid }"
          :disabled="loading || $v.newPostForm.$invalid"
          @click="createPost"
        >
          Опубликовать
          <v-icon v-if="loading" animation="spin" name="fa-spinner" />
        </button>
        <button
          class="p-2 bg-white shadow rounded-lg hover:text-blue-500 transition"
        >
          <v-icon name="fa-eye" />
        </button>
        <button
          class="p-2 bg-white shadow rounded-lg hover:text-blue-500 transition"
          @click="trimText"
        >
          <v-icon name="fa-pen" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    loading: false,
    newPostForm: {
      img: "",
      title: "",
      icon: "",
      category: "",
      user: "",
    },
    options: {
      categories: null,
    },
  }),
  validations: {
    newPostForm: {
      title: {
        required,
      },
      img: {
        required,
      },
      icon: {
        required,
      },
      category: {
        required,
      },
    },
  },
  methods: {
    ...mapMutations(["toggleCreatePostModal"]),
    createTitle() {
      let h = document.createElement("h3");
      h.contentEditable = true;
      h.classList.add("outline-none", "font-bold", "text-xl", "mb-5", "pl-5");
      h.innerText = "Заголовок";
      this.$refs.editor.appendChild(h);
    },
    createParagraph() {
      let p = document.createElement("p");
      p.contentEditable = true;
      p.classList.add("outline-none", "my-3", "text-medium", "pl-5");
      p.innerText = "Текст";
      this.$refs.editor.appendChild(p);
    },
    createImg(src) {
      let img = document.createElement("img");
      img.src = this.webRoutes.postImg + src;
      img.classList.add("w-full", "my-3", "object-cover");
      this.$refs.editor.appendChild(img);
    },
    trimText() {
      this.newPostForm.title = this.newPostForm.title.replace(/\s+/g, " ").trim()
      let nodes = this.$refs.editor.childNodes;
      if (!nodes.length) return;
      nodes.forEach((node) => {
        node.innerText = node.innerText.replace(/\s+/g, " ").trim();
      });
    },
    async selectFile() {
      const formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      const { data } = await this.$axios.post("upload", formData);
      this.newPostForm.img = data;
    },
    async selectImg() {
      const formData = new FormData();
      formData.append("file", this.$refs.img.files[0]);
      const { data } = await this.$axios.post("upload", formData);
      this.createImg(data);
    },
    createPost() {
      this.$refs.editor.childNodes.forEach((node) => {
        node.contentEditable = false;
      });
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .post("posts/create", {
            newPost: {
              ...this.newPostForm,
              user: this.user,
              html: this.$refs.editor.getInnerHTML(),
            },
          })
          .then(() => {
            this.closeModal(null, true);
          })
          .finally(() => {
            this.loading = false;
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
    ...mapGetters(["user", "webRoutes"]),
    userAvatar() {
      return this.webRoutes.userAvatar + this.user.avatar;
    },
  },
  watch: {
    newPostForm: {
      handler(value) {
        if (value.category) {
          this.newPostForm.icon = this.options.categories.find(
            (category) => category.name === value.category
          ).icon;
        }
      },
      deep: true,
    },
  },
  components: {
    Toolbar: () => import("@/components/Modals/CreatePost/Toolbar/Index"),
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
  min-height: 450px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
}
.editor {
  max-height: 400px;
  max-width: 600px;
  overflow-y: scroll;
}
.editor::-webkit-scrollbar {
  width: 0;
}
</style>
