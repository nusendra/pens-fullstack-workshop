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
      beforeEnter: requireAuth,
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
    {
      path: "/",
      name: "Auth",
      component: () => import("../layouts/Auth.vue"),
      beforeEnter: preventAuthPage,
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

function requireAuth(to, from, next) {
  if ($cookies.get("token")) next();
  else next({ name: "Login" });
}

function preventAuthPage(to, from, next) {
  if (!$cookies.get("token")) next();
  else next({ name: "Home" });
}

export default router;
