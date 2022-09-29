<template>
  <form @submit="onSubmit">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="name" />
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
        v-model="password1"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Repeat Password</label
      >
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="password2"
      />
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
const error = ref("");

const onSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password1.value,
          }),
        }
      );

      if (!response.ok) error.value = "Something wrong";
      else router.push({ name: "Home" });
    } catch (err) {
      console.log(err);
    }
  }
};

const validate = () => {
  if (!name.value || !email.value || !password1.value || !password2.value) {
    error.value = "Field idak boleh kosong";
    return false;
  }

  if (password1.value !== password2.value) {
    error.value = "Password tidk sama";
    return false;
  }

  return true;
};
</script>
