<template>
  <div class="fixed inset-0 overlay" @click="closeModal">
    <div class="bg-white modal rounded-lg flex flex-col max-h-full" ref="modal">
      <div
        class="absolute h-full w-full z-10 rounded-lg"
        :class="{ hidden: !showPreview }"
      >
        <img ref="preview" class="w-full h-full object-cover rounded-md" />
        <button
          @click="showPreview = false"
          class="
            absolute
            top-0
            bg-blue-500
            hover:bg-blue-600
            transition
            p-2
            m-3
            rounded-lg
            text-white
          "
        >
          <v-icon name="fa-arrow-left" scale=".85" />
          <span> Вернуться </span>
        </button>
      </div>
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
      <div class="p-5 pr-10 flex items-center">
        <div class="dropdown">
          <button
            @click="toggleDropDown"
            :class="{ 'text-blue-600': options.show }"
            class="hover:text-blue-600 transition font-medium mr-3"
            ref="category"
          >
            Категория
          </button>
          <transition name="fade">
            <div
              ref="dropdown"
              class="ring-1 ring-gray-100 absolute mt-2 bg-white"
              v-if="options.show"
            >
              <transition-group>
                <button
                  @click="selectCategory(option.name)"
                  class="
                    hover:text-blue-600
                    flex
                    p-2
                    transition
                    w-full
                    hover:bg-gray-50
                    text-xs
                    px-4
                  "
                  :class="{
                    'text-blue-600 bg-gray-50':
                      newPostForm.category === option.name,
                  }"
                  v-for="option in options.categories"
                  :key="option._id"
                >
                  <v-icon :name="option.icon" class="mr-2" />
                  <p>{{ option.name }}</p>
                </button>
              </transition-group>
            </div>
          </transition>
        </div>
        <Toolbar
          @createTitle="createTitle"
          @createParagraph="createParagraph"
          @createPostBackground="$refs.file.click()"
          @createImg="$refs.img.click()"
        />
        <button
          v-if="newPostForm.img"
          @click="showPreview = true"
          class="
            bg-blue-500
            hover:bg-blue-600
            transition
            p-2
            rounded-lg
            text-white
            ml-auto
          "
        >
          Превью картинки
        </button>
      </div>
      <form method="post" enctype="multipart/form-data" class="hidden">
        <input
          type="file"
          ref="file"
          name="file"
          @change="uploadPostBackground"
        />
        <input type="file" ref="img" name="file" @change="uploadImage" />
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
    showPreview: false,
    newPostForm: {
      img: "",
      title: "",
      icon: "",
      category: "",
    },
    options: {
      categories: null,
      show: false,
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
    toggleDropDown() {
      this.options.show = !this.options.show;
    },
    hideDropDown() {
      this.options.show = false;
    },
    selectCategory(category) {
      this.newPostForm.category = category;
    },
    changeCategory(e) {
      if (e === null) {
        this.newPostForm.icon = "";
        this.newPostForm.category = "";
        return;
      }
      this.newPostForm.icon = e.icon;
      this.newPostForm.category = e.name;
    },
    createTitle() {
      let h = document.createElement("h3");
      h.contentEditable = true;
      h.classList.add("outline-none", "font-bold", "text-lg", "m-5");
      h.innerText = "Заголовок";
      this.$refs.editor.appendChild(h);
    },
    createParagraph() {
      let p = document.createElement("p");
      p.contentEditable = true;
      p.classList.add("outline-none", "m-3", "ml-5", "text-medium");
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
      this.newPostForm.title = this.newPostForm.title
        .replace(/\s+/g, " ")
        .trim();
      let nodes = this.$refs.editor.childNodes;
      if (!nodes.length) return;
      nodes.forEach((node) => {
        node.innerText = node.innerText.replace(/\s+/g, " ").trim();
      });
    },
    async uploadPostBackground() {
      const formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      try {
        const { data } = await this.$axios.post("files", formData);
        this.newPostForm.img = data;
      } catch (e) {
        this.$toast.error('Произошла ошибка при записи файла')
      }
    },
    async uploadImage() {
      const formData = new FormData();
      formData.append("file", this.$refs.img.files[0]);
      const { data } = await this.$axios.post("files", formData);
      this.createImg(data);
    },
    createPost() {
      this.$refs.editor.childNodes.forEach((node) => {
        node.contentEditable = false;
      });
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .post("post", {
            ...this.newPostForm,
            html: this.$refs.editor.getInnerHTML(),
          })
          .then(() => {
            this.closeModal(null, true);
            this.socket.emit("new-post");
            this.$toast.open("Пост успешно создан!");
          })
          .catch(() => {
            this.$toast.error("Что-то пошло не так!");
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
    ...mapGetters(["user", "webRoutes", "socket"]),
    userAvatar() {
      return this.webRoutes.userAvatar + this.user.avatar;
    },
  },
  watch: {
    newPostForm: {
      handler(value) {
        if (value.img) {
          this.$refs.preview.src = `${this.webRoutes.img}${value.img}`;
        }
        if (value.category) {
          this.$refs.category.innerHTML = value.category;
          this.newPostForm.icon = this.options.categories.find(
            (item) => item.name === value.category
          ).icon;
          this.options.show = false;
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

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  margin-top: 10px;
  z-index: 1;
}
</style>
