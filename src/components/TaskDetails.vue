<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import { toRefs } from "vue";

type Task = {
  id: number;
  title: string;
  isFav: boolean;
};

interface Props {
  task: Task;
}

const props = defineProps<Props>();
const { task } = toRefs(props);
const taskStore = useTaskStore();
</script>
<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="taskStore.deleteTask(task.id)" class="material-icons"
        >delete</i
      >
      <i
        @click="taskStore.toggleFav(task.id)"
        :class="['material-icons', { active: task.isFav }]"
        >favorite</i
      >
    </div>
  </div>
</template>
