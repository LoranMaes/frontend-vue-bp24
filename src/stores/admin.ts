import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { User, UserCreation } from "../models/user.model";
import { apiAxios } from "../axios/apiAxios";
import { Task } from "../models/task.model";

export const useAdminStore = defineStore("admin", () => {
  const loading = ref(true);
  const getLoading = computed(() => loading.value);

  const allUsers = ref<User[] | null>();
  const tasks = ref();

  const initializeUsers = async (): Promise<User[] | void> => {
    try {
      loading.value = true;
      const resp = await apiAxios.get("/admin/users");
      if (resp.status !== 200) return;
      console.log(resp.data);
      return (allUsers.value = resp.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    } finally {
      loading.value = false;
    }
  };

  const initializeTasks = async (): Promise<Task[] | void> => {
    try {
      loading.value = true;
      const resp = await apiAxios.get("/admin/tasks");
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

  const downloadUsersAsCSV = async () => {
    await initializeUsers();
    if (!allUsers.value) return;
    // Convert users data to CSV format
    const replacer = (key, value) => (value === null ? "" : value);
    const header = Object.keys(allUsers.value[0]);
    let csvArray = allUsers.value.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csvArray.unshift(header.join(","));
    let csvString = csvArray.join("\r\n");

    // Create a Blob from the CSV data
    const blob = new Blob([csvString], { type: "text/csv" });

    // Create a link element and trigger a click event on it
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteUser = async (id: string) => {
    try {
      loading.value = true;
      const resp = await apiAxios.delete(`/admin/users/${id}`);
      if (resp.status !== 200) return;
      return await initializeUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (user: UserCreation) => {
    try {
      loading.value = true;
      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      if (user.profilePicture) {
        formData.append("profilePicture", user.profilePicture);
      }

      const resp = await apiAxios.post("/admin/users", formData);
      if (resp.status !== 200) return;
      await initializeUsers();
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    } finally {
      loading.value = false;
    }
  };

  return {
    getLoading,
    initializeUsers,
    initializeTasks,
    tasks,
    allUsers,
    downloadUsersAsCSV,
    deleteUser,
    createUser,
  };
});
