import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    {
      path: "/",
      name: "Default",
      component: () => import("../layouts/Default.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/about",
          name: "About",
          component: () => import("../views/About.vue"),
        },
      ],
    },
  ],
});

export default router;
