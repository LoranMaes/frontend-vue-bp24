<script setup lang="ts">
import IlvoUserStats from "../components/organisms/IlvoUserStats.vue";
import IlvoAdminStats from "../components/organisms/IlvoAdminStats.vue";
import { useAuthStore } from "../stores/auth";

const auth_store = useAuthStore();
</script>

<template>
  <IlvoUserStats v-if="auth_store.user?.role === 'user'" />
  <IlvoAdminStats v-else-if="auth_store.user?.role === 'admin'" />
  <p v-else>{{ $t("notFound") }}</p>
</template>

<style lang="scss"></style>
