<template>
  <ul class="list-group">
    <li
      v-for="(item, index) in todos"
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
const props = defineProps({
  todos: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["deleteTask"]);

const deleteTask = (index) => {
  emit("deleteTask", index);
};
</script>
