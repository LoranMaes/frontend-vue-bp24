import { defineStore } from "pinia";
import { User, UserCreation, UserLogin } from "../models/user.model";
import { computed, ref } from "vue";
import { apiAxios } from "../axios/apiAxios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  // This checks if the user is valid, if not the user gets a form with more details.
  const isValidUser = computed(() => {
    if (!user.value || user.value.firstName || user.value.lastName)
      return false;
  });

  const getUser = async (): Promise<User | void> => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const authSessionCookie = cookies.find((cookie) =>
      cookie.startsWith("auth_session=")
    );
    // console.log(cookies, authSessionCookie);
    // TODO This check needs to be fixed so that there is no error
    // if (!authSessionCookie) return;
    try {
      const resp = await apiAxios.get("/auth/user");
      if (resp.status !== 200) return;
      return (user.value = resp.data.data);
    } catch (error) {
      document.cookie =
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      throw new Error("Invalid credentials");
    }
  };

  const initUser = async (): Promise<void> => {
    if (isAuthenticated.value) return;
    try {
      await getUser();
    } catch (error) {
      console.error("Failed to initialize user:", error);
    }
  };

  const register = async (user_request: UserCreation): Promise<User | void> => {
    const formData = new FormData();
    formData.append("firstName", user_request.firstName);
    formData.append("lastName", user_request.lastName);
    formData.append("email", user_request.email);
    formData.append("password", user_request.password);
    try {
      // Register
      const resp = await apiAxios.post("/auth/register", formData);
      if (resp.status !== 200) return;
      // Get user data and store it
      return await initUser();
    } catch (error) {
      throw new Error("User already exists");
    }
  };

  const login = async (user_request: UserLogin): Promise<User | void> => {
    const formData = new FormData();
    formData.append("email", user_request.email);
    formData.append("password", user_request.password);
    try {
      // Login
      const resp = await apiAxios.post("/auth/login", formData);
      if (resp.status !== 200) return;
      // Get user data and store it
      return await getUser();
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    try {
      const resp = await apiAxios.post("/auth/logout");
      if (resp.status !== 200) return;
      user.value = null;
      // Remove user data, from the timers and other registration, from local storage
      localStorage.clear();
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    initUser,
    isValidUser,
  };
});
