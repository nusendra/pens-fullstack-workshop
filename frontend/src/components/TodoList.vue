<template>
  <ul class="list-group">
    <li
      v-for="(item, index) in todos"
      class="list-group-item d-flex justify-content-between align-items-start"
    >
      <del v-if="item.isDone">{{ item.task }}</del>
      <span v-else>{{ item.task }}</span>
      <div>
        <button
          type="button"
          class="btn btn-outline-success btn-sm mx-1"
          @click="doneTask(item)"
        >
          ✓
        </button>
        <button
          type="button"
          class="btn btn-outline-danger btn-sm"
          @click="deleteTask(item)"
        >
          X
        </button>
      </div>
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

const deleteTask = (item) => {
  emit("deleteTask", item);
};

const doneTask = (item) => {
  emit("doneTask", item);
};
</script>

<style scoped>
.btn {
  --bs-btn-line-height: 1;
}
</style>
