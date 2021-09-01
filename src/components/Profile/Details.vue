<template>
  <div class="flex space-x-6 items-start">
    <div
      class="
        w-2/3
        bg-white
        rounded-lg
        p-5
        h-48
        flex
        justify-center
        items-center
      "
    >
      <p>Здесь еще нет публикаций</p>
    </div>
    <div class="w-1/3">
      <div class="bg-white rounded-lg p-5">
        <p class="font-medium">Подписчики</p>
        <p class="text-sm opacity-50 mt-3">У блога еще нет подписчиков</p>
      </div>
      <div class="bg-white rounded-lg p-5 mt-5">
        <p class="font-medium">Подписки</p>
      </div>
      <div class="bg-white rounded-lg p-5 mt-5">
        <p class="font-medium">Ссылки</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
};
</script>

<style scoped></style>