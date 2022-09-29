<template>
  <nav
    class="navbar navbar-expand-sm navbar-light"
    style="background-color: #aebdca"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">SIMPLE TODO</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
        <button type="button" class="navbar-text btn btn-link" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!response.ok) console.log(response);
  else router.push({ name: "Login" });
};
</script>
