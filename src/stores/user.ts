import { defineStore } from "pinia";
import { ref } from "vue";
import { Task } from "../models/task.model";
import { apiAxios } from "../axios/apiAxios";
import { Category } from "../models/category.model";

export const useUserStore = defineStore("user", () => {
  const tasks = ref<Task[] | null>();
  const categories = ref<Category[] | null>();
  const statistics = false;

  const initializeTasks = async (): Promise<Task[] | void> => {
    try {
      // Get tasks
      const resp = await apiAxios.get("/tasks");
      if (resp.status !== 200) return;
      // Store tasks
      console.log(resp.data);
      return (tasks.value = resp.data.data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const initializeCategories = async (): Promise<Category[] | void> => {
    try {
      // Get categories
      const resp = await apiAxios.get("/categories");
      if (resp.status !== 200) return;
      // Store categories
      console.log(resp.data);
      return (categories.value = resp.data.data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  return { tasks, initializeTasks, statistics, initializeCategories };
});
