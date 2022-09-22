<template>
  <div class="input-group mb-3 pt-3">
    <input
      v-model="task"
      type="text"
      class="form-control"
      placeholder="Add a new task"
      @keyup.enter="addTask"
    />
    <button
      class="btn btn-primary"
      type="button"
      id="button-addon2"
      @click="addTask"
    >
      Submit
    </button>
  </div>
  <ul class="list-group">
    <li
      v-for="(item, index) in todos.list"
      class="list-group-item d-flex justify-content-between align-items-start"
    >
      <div style="">{{ item.task }}</div>
      <button
        type="button"
        class="btn btn-outline-danger btn-sm"
        @click="deleteTask(index)"
      >
        X
      </button>
    </li>
  </ul>
</template>

<script setup>
import { ref, reactive } from "vue";

const task = ref("");
const todos = reactive({
  list: [],
});

const addTask = () => {
  todos.list.unshift({
    task: task.value,
    isDone: false,
  });
  task.value = "";
};

const deleteTask = (taskIndex) => {
  todos.list = todos.list.filter((item, index) => {
    if (index != taskIndex) {
      return item;
    }
  });
};
</script>

<style scoped>
.btn {
  --bs-btn-line-height: 1;
}
</style>
