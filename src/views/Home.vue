<template>
  <div class="px-6 flex-1 flex bg-gray-100 py-5">
    <LeftSidebar />
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    LeftSidebar: () => import("@/components/LeftSidebar/Index"),
  },
};
</script>
