<script setup lang="ts">
import { computed, ref } from "vue";
import { useAdminStore } from "../../stores/admin";
import IlvoInputField from "../../components/molecules/IlvoInputField.vue";
import { useUserStore } from "../../stores/user";
import IlvoButton from "../../components/atoms/IlvoButton.vue";
import { buttonStyleValues, buttonTypes } from "../../models/property.enum";
import { useRouter } from "vue-router";

const admin_store = useAdminStore();
const user_store = useUserStore();

const category_form = ref<{ title: string }>({ title: "" });
const sub_category_form = ref<{ title: string; category_index: number }>({
  title: "",
  category_index: 0,
});

const router = useRouter();
const createCategory = async () => {
  if (category_form.value.title.length) {
    await admin_store.createCategory(category_form.value.title);
    category_form.value.title = "";
  } else if (sub_category_form.value.title.length) {
    await admin_store.createSubCategory(
      sub_category_form.value.title,
      user_store.categories
        ? user_store.categories[sub_category_form.value.category_index].id
        : ""
    );
    sub_category_form.value.title = "";
  }
  return router.push({ name: "allCategories" });
};

const main_category_lookalikes = computed(() => {
  if (category_form.value.title.length <= 2) return [];
  return user_store.categories?.filter((cat) =>
    cat.title.toLowerCase().includes(category_form.value.title.toLowerCase())
  );
});

const sub_category_lookalikes = computed(() => {
  if (!user_store.categories) return [];
  if (sub_category_form.value.title.length <= 2) return [];
  return user_store.categories[
    sub_category_form.value.category_index
  ].sub_categories?.filter((sub_cat) =>
    sub_cat.title
      .toLowerCase()
      .includes(sub_category_form.value.title.toLowerCase())
  );
});
</script>

<template>
  <div class="container">
    <form
      action="#"
      @submit.prevent="createCategory"
      v-if="!sub_category_form.title.length"
    >
      <IlvoInputField
        type="text"
        id="main_cat_title"
        :placeholder="$t('createCategory.mainPlaceholder')"
        :label="$t('createCategory.main')"
        v-model:input="category_form.title"
      />
      <template v-if="main_category_lookalikes?.length">
        <p>{{ $t("createCategory.alreadyExists") }}</p>
        <ul>
          <li
            v-for="(lookalike, index) in main_category_lookalikes"
            :key="index"
          >
            {{ lookalike.title }}
          </li>
        </ul>
      </template>

      <IlvoButton
        :submit="true"
        :type="buttonTypes.TEXT"
        :style="buttonStyleValues.PRIMARY"
        v-if="
          category_form.title.length > 2 &&
          user_store.categories?.filter((cat) =>
            cat.title.toLowerCase().includes(category_form.title.toLowerCase())
          ).length === 0
        "
        >{{ $t("createCategory.mainCreate") }}</IlvoButton
      >
    </form>

    <form
      action="#"
      @submit.prevent="createCategory"
      v-if="!category_form.title.length"
    >
      <IlvoInputField
        type="select"
        id="sub_cat_main"
        placeholder="Select a main category"
        :values="user_store.categories?.map((cat) => cat.title) || []"
        :label="$t('createCategory.subMain')"
        v-model:input="sub_category_form.category_index"
        :selected="0"
      />
      <IlvoInputField
        type="text"
        id="sub_cat_title"
        :placeholder="$t('createCategory.subPlaceholder')"
        :label="$t('createCategory.sub')"
        v-model:input="sub_category_form.title"
      />
      <template v-if="sub_category_lookalikes?.length">
        <p>{{ $t("createCategory.alreadyExists") }}</p>
        <ul>
          <li
            v-for="(lookalike, index) in sub_category_lookalikes"
            :key="index"
          >
            {{ lookalike.title }}
          </li>
        </ul>
      </template>
      <IlvoButton
        :submit="true"
        :type="buttonTypes.TEXT"
        :style="buttonStyleValues.PRIMARY"
        v-if="
          sub_category_form.title.length > 2 &&
          user_store.categories &&
          !user_store.categories[
            sub_category_form.category_index
          ].sub_categories?.filter((sub_cat) =>
            sub_cat.title
              .toLowerCase()
              .includes(sub_category_form.title.toLowerCase())
          ).length
        "
        >{{ $t("createCategory.subCreate") }}</IlvoButton
      >
    </form>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2.4rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    ul {
      list-style: circle;
      padding-left: 1.6rem;
      li {
        color: var(--primary-black);
      }
    }
  }
}
</style>
