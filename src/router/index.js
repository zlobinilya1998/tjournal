import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    redirect: "/home/posts",
    component: () => import("@/views/Home"),
    children: [
      {
        path: "posts",
        name: "posts",
        component: () => import("@/components/Posts/Index.vue"),
      },
      {
        path: "comments",
        name: "news/comments",
        component: () => import("@/components/Comments/Index.vue"),
      },
      {
        path: "profile/:id",
        name: "profile",
        redirect: "profile/:id/entries",
        component: () => import("@/components/Profile/Index.vue"),
        children: [
          {
            path: "entries",
            name: "entries",
            component: () => import("@/components/Profile/Entries.vue"),
            meta: { profileRoute: true },
          },
          {
            path: "comments",
            name: "comments",
            component: () => import("@/components/Profile/Comments.vue"),
            meta: { profileRoute: true },
          },
          {
            path: "details",
            name: "details",
            component: () => import("@/components/Profile/Details.vue"),
            meta: { profileRoute: true },
          },
        ],
      },
      {
        path: "post/:id",
        name: "post",
        component: () => import("@/components/PostPage/Index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
