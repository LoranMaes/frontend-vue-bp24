<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import {
  buttonSizes,
  buttonStyleValues,
  buttonTypes,
} from "../../models/property.enum";
import IlvoButton from "../../components/atoms/IlvoButton.vue";
import { useRouter } from "vue-router";

const user_store = useUserStore();

const sub_categories = computed(() => {
  return (
    user_store.categories?.flatMap((cat) =>
      cat.sub_categories.map((sub_cat) => ({
        ...sub_cat,
        main_category_id: cat.id,
        main_category_title: cat.title,
      }))
    ) ?? []
  );
});

const router = useRouter();
const createNewCategory = () => {
  return router.push({ name: "createCategory" });
};

onMounted(async () => {
  await user_store.initializeCategories();
});
</script>

<template>
  <div class="container">
    <div class="categories">
      <h2>{{ $t("categories.main") }}</h2>
      <div class="category" v-for="category in user_store.categories">
        <p class="bold">{{ category.title }}</p>
      </div>
    </div>
    <div class="categories">
      <h2>{{ $t("categories.sub") }}</h2>
      <div class="category" v-for="sub_category in sub_categories">
        <p class="bold">{{ sub_category.title }}</p>
        <p class="small bold sub_cat_title">
          {{ sub_category.main_category_title }}
        </p>
      </div>
    </div>
    <IlvoButton
      :type="buttonTypes.ICON"
      :style="buttonStyleValues.PRIMARY"
      mdi-icon="mdiPlus"
      :size="buttonSizes.LARGE"
      id="create-category"
      @click="createNewCategory"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2.4rem;
  .categories {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    .category {
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      border: 1px solid var(--gray-3);
      border-radius: 0.8rem;
      padding: 1.6rem 2.4rem;
      gap: 0.4rem;
      box-shadow: var(--shadow-sm);
      background-color: var(--primary-white);
      .sub_cat_title {
        color: var(--state-warning);
      }
    }
  }
  button#create-category {
    position: fixed;
    bottom: 2.4rem;
    right: 2.4rem;
  }
}
</style>
