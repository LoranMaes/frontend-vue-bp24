<script setup lang="ts">
import IlvoHeader from "./components/organisms/IlvoHeader.vue";
import IlvoTimerBanner from "./components/atoms/IlvoTimerBanner.vue";
import { onMounted, ref } from "vue";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";
import { useTimerStore } from "./stores/timer";
const loading = ref(true);
const auth_store = useAuthStore();
const timer_store = useTimerStore();

const router = useRouter();
// Don't know if this is the best way but I'm populating the user data when the application first loads
onMounted(async () => {
  timer_store.checkLocalValues();
  try {
    await auth_store.initUser();
  } catch (error) {
  } finally {
    loading.value = false;
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
    <div id="loading" v-if="loading"><span class="loader"></span></div>
    <template v-else>
      <RouterView name="default" />
      <RouterView name="modal" />
    </template>
    <IlvoTimerBanner v-if="timer_store.isRunning" />
  </main>
</template>

<style scoped lang="scss"></style>
