import { defineStore } from "pinia";

type Task = {
  id: number;
  title: string;
  isFav: boolean;
};

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [{ id: 0, title: "", isFav: false }],
    isLoading: false,
    title: "Pinia Tasks",
  }),
  getters: {
    favs(): Task[] {
      return this.tasks.filter((t: Task) => t.isFav);
    },
    favCount(): number {
      return this.tasks.reduce((p: number, c: Task) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount(state): number {
      return state.tasks.length;
    },
  },
  actions: {
    async getTask() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      this.tasks = data;
      this.isLoading = false;
    },
    async addTask(task: Task) {
      this.tasks.push(task);
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      }).catch((error) => console.log(error));
    },
    async deleteTask(id: number) {
      this.tasks = this.tasks.filter((t: Task) => {
        return t.id != id;
      });
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      }).catch((error) => console.log(error));
    },
    async toggleFav(id: number) {
      const task: Task | undefined = this.tasks.find((t: Task) => t.id === id);
      task!.isFav = !task?.isFav;
      const res = await fetch("http://localhost:3000/tasks" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task?.isFav }),
        headers: { "Content-Type": "application/json" },
      }).catch((error) => console.log(error));
    },
  },
});
