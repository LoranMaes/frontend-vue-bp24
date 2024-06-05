<script setup lang="ts">
import IlvoHeader from "./components/organisms/IlvoHeader.vue";
import IlvoTimerBanner from "./components/atoms/IlvoTimerBanner.vue";
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";
import { useTimerStore } from "./stores/timer";
import { useUserStore } from "./stores/user";

const auth_store = useAuthStore();
const timer_store = useTimerStore();
const user_store = useUserStore();
const router = useRouter();

// Don't know if this is the best way but I'm populating the user data when the application first loads
onMounted(async () => {
  timer_store.checkLocalValues();

  try {
    await auth_store.initUser();
    await user_store.initializeCategories();
  } catch (error) {
    console.error(error);
  }

  if (auth_store.isAuthenticated) {
    return router.push({ name: "dashboard" });
  }
  return router.push({ name: "landingPage" });
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
      <RouterView name="default" />
      <RouterView name="modal" />
    </template>
    <IlvoTimerBanner v-if="timer_store.isRunning" />
  </main>
</template>

<style scoped lang="scss"></style>
