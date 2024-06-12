<script setup lang="ts">
import { Category } from "../../models/category.model";
import { mdiChevronRight } from "@mdi/js";
import { useUserStore } from "../../stores/user";

defineEmits(["categorySelected"]);
defineProps<{
  category?: {
    id: string;
    title: string;
    sub_categories: Category[];
  };
  top_category?: {
    id: string;
    title: string;
    main_category_title?: string;
    total_amount: number;
  };
}>();

const user_store = useUserStore();
</script>

<template>
  <button
    v-if="top_category"
    class="category_picker"
    @click="
      $emit(
        'categorySelected',
        top_category.main_category_title
          ? {
              sub_cat_id: top_category.id,
              id: user_store.categories?.find((cat) =>
                cat.sub_categories.some(
                  (sub_cat) => sub_cat.id === top_category?.id
                )
              )?.id,
            }
          : {
              id: top_category.id,
            }
      )
    "
  >
    <p class="bold">{{ top_category?.title }}</p>
    <p class="small bold sub_cat_title" v-if="top_category.main_category_title">
      {{ top_category.main_category_title }}
    </p>
    <svg viewBox="0 0 24 24" height="24" width="24">
      <path :d="mdiChevronRight"></path>
    </svg>
  </button>
  <template v-if="category">
    <button
      class="category_picker"
      @click="$emit('categorySelected', { id: category.id })"
    >
      <!-- TODO: add icons to the left like in the design (could be from the database) -->
      <!-- <img src="" alt=""> -->
      <p class="bold">{{ category.title }}</p>
      <svg viewBox="0 0 24 24" height="24" width="24">
        <path :d="mdiChevronRight"></path>
      </svg>
    </button>
    <button
      class="category_picker sub"
      @click="
        $emit('categorySelected', { sub_cat_id: sub_cat.id, id: category.id })
      "
      v-if="category.sub_categories && category.sub_categories.length"
      v-for="sub_cat in category.sub_categories"
      :key="sub_cat.id"
    >
      <p class="bold">{{ sub_cat.title }}</p>
      <p class="small bold sub_cat_title">{{ category.title }}</p>
      <svg viewBox="0 0 24 24" height="24" width="24">
        <path :d="mdiChevronRight"></path>
      </svg>
    </button>
  </template>
</template>

<style lang="scss" scoped>
button {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: flex-start;
  width: 100%;
  border: 1px solid var(--gray-3);
  border-radius: 0.8rem;
  padding: 1.6rem 2.4rem;
  gap: 0.4rem;
  box-shadow: var(--shadow-sm);
  background-color: var(--primary-white);
  p {
    margin: 0;
  }
  &.category_picker {
    &.sub {
    }
  }
  svg {
    fill: var(--gray-3);
    position: absolute;
    right: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .sub_cat_title {
    color: var(--state-warning);
  }
}
</style>
