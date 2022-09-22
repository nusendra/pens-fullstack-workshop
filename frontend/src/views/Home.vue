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
  <TodoList :todos="todos.list" @deleteTask="deleteTask" @doneTask="doneTask" />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import TodoList from "../components/TodoList.vue";

const task = ref("");
const todos = reactive({
  list: [],
});

onMounted(() => {
  const items = localStorage.getItem("todos");
  todos.list = items ? JSON.parse(items) : [];
});

const addTask = () => {
  if (!task.value) {
    return;
  }
  todos.list.unshift({
    task: task.value,
    isDone: false,
  });
  task.value = "";

  saveToLocalStorage();
};

const deleteTask = (taskIndex) => {
  todos.list = todos.list.filter((item, index) => {
    if (index != taskIndex) {
      return item;
    }
  });

  saveToLocalStorage();
};

const doneTask = (taskIndex) => {
  todos.list = todos.list.filter((item, index) => {
    if (index == taskIndex) {
      item.isDone = true;
    }
    return item;
  });
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos.list));
};
</script>
