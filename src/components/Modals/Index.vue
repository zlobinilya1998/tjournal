<template>
    <div>
        <CreatePostModal v-if="modals.createPost.show"/>
        <RegistrationModal v-if="modals.registration.show"/>
        <ConfigureNewsModal v-if="modals.configureNews.show"/>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        components:{
            CreatePostModal: () => import("@/components/Modals/CreatePost/Index"),
            RegistrationModal: () => import("@/components/Modals/Registration/Index"),
            ConfigureNewsModal: () => import("@/components/Modals/ConfigureNews/Index"),
        },
        computed: mapGetters(['modals'])
    }
</script>

<style scoped>

</style>