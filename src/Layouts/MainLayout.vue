<template>
    <div class="min-h-screen flex flex-col">
        <Header/>
        <slot></slot>
    </div>
</template>

<script>
 export default {
     components:{
         Header: () => import("@/components/Header/Index")
     }
 }
</script>

<style scoped>

</style>