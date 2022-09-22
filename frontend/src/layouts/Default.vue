<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <div class="container-fluid">
    <Header />

    <div class="mobile-view content pl-3 px-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.content {
  background-color: #f5efe6;
}
</style>
