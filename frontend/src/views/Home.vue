<template>
  <div v-if="isLoading" class="pt-3">Loading ...</div>
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
const isLoading = ref(false);
const todos = reactive({
  list: [],
});

onMounted(async () => {
  isLoading.value = true;
  await getTodos();
  isLoading.value = false;
});

const getTodos = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    todos.list = data.todos;
  } catch (err) {
    console.log(err);
  }
};

const addTask = async () => {
  if (!task.value) {
    return;
  }

  try {
    isLoading.value = true;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          task: task.value,
          isDone: false,
        }),
      }
    );

    if (response.ok) {
      await getTodos();
      task.value = "";
      isLoading.value = false;
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (task) => {
  try {
    isLoading.value = true;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos/${task._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      await getTodos();
      isLoading.value = false;
    }
  } catch (err) {
    console.log(err);
  }
};

const doneTask = async (task) => {
  try {
    isLoading.value = true;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos/${task._id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (response.ok) {
      await getTodos();
      isLoading.value = false;
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
