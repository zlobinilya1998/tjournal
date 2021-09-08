<template>
  <div class="flex relative">
    <span @click="toggleShow" :class="{'text-blue-600': show}">
      <v-icon
        name="fa-plus"
        class="cursor-pointer transition"
        scale="1"
        :style="{ transform: show ? 'rotate(45deg)' : '' }"
      />
    </span>
    <transition name="slide">
      <div v-if="show" class="bg-white w-48 ring-1 ring-gray-100 shadow absolute left-8">
        <div
          @click="emitAndClose(tool.emit)"
          v-for="(tool, index) in tools"
          :key="index"
          class="
            p-2
            space-x-2
            hover:bg-gray-50
            hover:text-blue-600
            cursor-pointer
            flex
            items-center
            transition
          "
        >
          <v-icon :name="tool.icon" :scale="0.85" />
          <span class="text-xs">{{ tool.text }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    tools: [
      { icon: "fa-align-justify", text: "Текст", emit: "createParagraph" },
      { icon: "fa-heading", text: "Заголовок",emit: "createTitle" },
      { icon: "fa-image", text: "Выбрать фон поста",emit: "createPostBackground" },
      { icon: "fa-link", text: "Вставить фотографию",emit: "createImg" },
    ],
    show: false,
  }),
  methods: {
      emitAndClose(value){
          this.$emit(value);
          this.toggleShow();
      },
    toggleShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }
  .slide-enter, .slide-leave-to /* .slide-leave-active до версии 2.1.8 */ {
    opacity: 0;
    left: 0;
  }
</style>
