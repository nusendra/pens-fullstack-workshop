<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <div class="container-fluid">
    <Header />

    <router-view class="mobile-view content" />
  </div>
</template>

<style>
.content {
  background-color: #f5efe6;
}
</style>
