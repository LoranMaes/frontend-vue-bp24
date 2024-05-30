<script setup lang="ts">
import { ref, watchEffect } from "vue";
import IlvoHeader from "./components/organisms/IlvoHeader.vue";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";

const loading = ref(true);
const auth_store = useAuthStore();
const router = useRouter();
// Don't know if this is the best way but I'm populating the user data when the application first loads
watchEffect(async () => {
  await auth_store.initUser().finally(() => (loading.value = false));
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
  </main>
</template>

<style scoped lang="scss"></style>
