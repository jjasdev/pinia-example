<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";

const taskStore = useTaskStore();
const { tasks, title, isLoading, favs, totalCount, favCount } =
  storeToRefs(taskStore);
taskStore.getTask();
const filter = ref("all");
</script>
<template>
  <main>
    <!-- heading -->
    <header>
      <h1>{{ title }}</h1>
    </header>
    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favourite tasks</button>
    </nav>
    <!-- loading -->
    <div class="loading" v-if="isLoading">Loading tasks...</div>
    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <h3>All tasks ({{ totalCount }})</h3>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-else>
      <h3>Favourite tasks ({{ favCount }})</h3>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset</button>
  </main>
</template>
