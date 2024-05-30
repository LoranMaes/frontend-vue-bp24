<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";

const loading = ref(true);
const user_store = useUserStore();

onMounted(async () => {
  await user_store
    .initializeCategories()
    .finally(() => (loading.value = false));
});
</script>

<template>
  <div class="loading">
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped></style>
