<template>
  <div class="fixed inset-0 overlay" @click="closeModal">
    <div
      class="
        bg-white
        modal
        flex flex-col
        overflow-hidden
        transition
        h-screen
        w-5/12
      "
      ref="modal"
    >
      <svg @click="closeModal($event,true)" width="24" height="24" viewBox="0 0 24 24" id="v_close" class="cursor-pointer absolute right-5 top-5"><path data-v-6d733248="" fill-rule="evenodd" clip-rule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"></path></svg>
      <div class="flex items-center space-x-4 border-b-2 border-gray-300 p-5">
        <p>Настройка ленты</p>
        <span class="text-xs text-blue-500 cursor-pointer" @click="selectAll"
          >Выделить все</span
        >
      </div>
      <div class="p-5 relative flex-1">
        <v-icon
          v-if="loading"
          name="fa-spinner"
          animation="spin"
          class="text-yellow-300 absolute inset-1/2"
          :scale="2"
          >Loading</v-icon
        >
        <div v-else class="grid grid-cols-3">
          <div
            v-for="icon in category"
            :key="icon._id"
            class="flex items-center space-x-2 my-2"
          >
            <input
              type="checkbox"
              :value="icon.icon"
              v-model="selected"
              ref="checkbox"
            />
            <v-icon :name="icon.icon" />
            <span>{{ icon.name }}</span>
          </div>
        </div>
      </div>
      <div class="mt-auto border-t-2 border-gray-300 p-5">
        <button
          :disabled="!selected.length"
          class="
            py-2
            px-6
            bg-blue-300
            hover:bg-blue-500
            transition
            rounded-md
            text-white
          "
          :class="{ 'bg-blue-500': selected.length }"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    category: null,
    loading: false,
    selected: [],
  }),
  methods: {
    ...mapMutations(["toggleConfigureNewsModal"]),
    selectAll() {
      if (this.selected.length) {
        this.selected = [];
        return;
      }
      this.$refs.checkbox.map((item) => {
        this.selected.push(item.value);
      });
    },
    closeModal(e, flag = false) {
      if (e.target.classList.contains("overlay") || flag) {
        this.toggleConfigureNewsModal({ show: false });
      }
    },
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.$axios
        .get("category")
        .then((res) => {
          this.category = res.data;
        })
        .finally(() => (this.loading = false));
    }, 600);
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
