<template>
  <form @submit="onSubmit">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <div id="emailHelp" class="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="password"
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
    <span> or <router-link to="/register">Register</router-link></span>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      }
    );
    if (!response.ok) error.value = "Email atau password salah";
    else router.push({ name: "Home" });
  } catch (err) {
    console.log(err);
  }
};
</script>
