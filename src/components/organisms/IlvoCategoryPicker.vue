<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import IlvoCategoryPicker from "../atoms/IlvoCategoryPickerButton.vue";
import { useTimerStore } from "../../stores/timer";

const user_store = useUserStore();
const timer_store = useTimerStore();

defineProps<{
  type: "top" | "other";
}>();

const handleCategorySelected = (category: {
  id: string;
  sub_cat_id?: string;
}) => {
  localStorage.setItem("newTimerCategory", JSON.stringify(category));
  timer_store.localCategory = category;
};
</script>

<template>
  <template v-if="type === 'top'">
    <!-- Top categories -->
    <p v-if="!user_store.topCategories?.length">
      {{ $t("timer.first_step.no_categories") }}
    </p>
    <div v-else class="categories">
      <IlvoCategoryPicker
        v-for="(category, index) in user_store.topCategories"
        :key="index"
        :top_category="category"
        @category-selected="handleCategorySelected"
      />
    </div>
  </template>
  <template v-else>
    <!-- Categories -->
    <div class="categories">
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
</template>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;
}
</style>
