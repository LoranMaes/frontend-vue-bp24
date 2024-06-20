import { defineStore } from "pinia";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Task } from "../models/task.model";
import { apiAxios } from "../axios/apiAxios";
import { Category } from "../models/category.model";
import { Helpers } from "../composables/helpers";

export const useUserStore = defineStore("user", () => {
  const loading = ref(true);
  const getLoading = computed(() => loading.value);
  const tasks = ref<Task[] | null>();
  const categories = ref<
    | {
        id: string;
        title: string;
        sub_categories: Category[];
      }[]
    | null
  >();
  const topCategories = ref<
    | {
        id: string;
        title: string;
        main_category_title?: string;
        total_amount: number;
      }[]
    | null
  >();
  const statistics = false;

  const initializeTasks = async (): Promise<Task[] | void> => {
    try {
      loading.value = true;
      const resp = await apiAxios.get("/tasks");
      if (resp.status !== 200) return;
      console.log(resp.data);
      return (tasks.value = resp.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    } finally {
      loading.value = false;
    }
  };

  const initializeCategories = async () => {
    loading.value = true;
    try {
      // Get categories
      const resp = await apiAxios.get("/categories");
      if (resp.status !== 200) return;
      // Store categories
      console.log(resp.data);
      return (
        (categories.value = resp.data.data.categories),
        (topCategories.value = resp.data.data.top_categories)
      );
    } catch (error) {
      throw new Error("Invalid credentials");
    } finally {
      loading.value = false;
    }
  };

  const downloadStatisticsAsCsv = async () => {
    await initializeCategories();
    await initializeTasks();
    if (!tasks.value || !categories.value) return;
    Helpers.downloadAsCsv(tasks.value, "tasks");
  };

  return {
    tasks,
    initializeTasks,
    statistics,
    initializeCategories,
    categories,
    topCategories,
    getLoading,
    downloadStatisticsAsCsv,
  };
});
