<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { defineProps } from "vue";
import IlvoCategoryPicker from "../atoms/IlvoCategoryPicker.vue";
import { useTimerStore } from "../../stores/timer";

const loading = ref(true);
const user_store = useUserStore();
const timer_store = useTimerStore();

defineProps<{
  type: "top" | "other";
}>();

onMounted(async () => {
  await user_store
    .initializeCategories()
    .finally(() => (loading.value = false));
});

const handleCategorySelected = (category: {
  id: string;
  sub_cat_id?: string;
}) => {
  localStorage.setItem("newTimerCategory", JSON.stringify(category));
  timer_store.localCategory = category;
};
</script>

<template>
  <div class="loading" v-if="loading">
    <span class="loader"></span>
  </div>
  <div class="categories" v-else>
    <p v-if="!user_store.categories?.length">
      {{ $t("timer.first_step.no_categories") }}
    </p>
    <div v-else class="categories">
      <IlvoCategoryPicker
        v-for="(category, index) in user_store.categories"
        :key="index"
        :category="category"
        @category-selected="handleCategorySelected"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;
}
</style>
