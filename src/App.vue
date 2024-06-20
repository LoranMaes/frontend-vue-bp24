<script setup lang="ts">
import IlvoHeader from "./components/organisms/IlvoHeader.vue";
import IlvoTimerBanner from "./components/atoms/IlvoTimerBanner.vue";
import { onMounted, onUnmounted } from "vue";
import { useAuthStore } from "./stores/auth";
import { useTimerStore } from "./stores/timer";
import { useUserStore } from "./stores/user";
import { useAdminStore } from "./stores/admin";

const auth_store = useAuthStore();
const timer_store = useTimerStore();
const user_store = useUserStore();
const admin_store = useAdminStore();

// Don't know if this is the best way but I'm populating the user data when the application first loads
onMounted(async () => {
  timer_store.checkLocalValues();
  try {
    await auth_store.initUser();
    if (auth_store.isAuthenticated) {
      await user_store.initializeCategories();
      switch (auth_store.user?.role) {
        case "user":
          await user_store.initializeTasks();
          break;
        case "admin":
          await admin_store.initializeUsers();
          await admin_store.initializeTasks();
          break;
      }
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <IlvoHeader v-if="auth_store.isAuthenticated" />

  <!-- Make routing possible -->
  <main>
    <div id="loading" v-if="auth_store.loading">
      <span class="loader"></span>
    </div>
    <template v-else>
      <div
        id="admin_banner"
        v-if="auth_store.isAuthenticated && auth_store.user?.role === 'admin'"
      >
        <p class="bold">{{ $t("dashboard.admin.banner") }}</p>
      </div>
      <RouterView name="default" />
      <RouterView name="modal" />
    </template>
    <IlvoTimerBanner v-if="timer_store.isRunning" />
  </main>
</template>

<style scoped lang="scss"></style>
