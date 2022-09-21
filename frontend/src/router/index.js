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
    },
    {
      path: "/",
      name: "Auth",
      component: () => import("../layouts/Auth.vue"),
      children: [
        {
          path: "/login",
          name: "Login",
          component: () => import("../views/auth/Login.vue"),
        },
        {
          path: "/register",
          name: "Register",
          component: () => import("../views/auth/Register.vue"),
        },
      ],
    },
  ],
});

export default router;
