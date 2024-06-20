<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import { buttonStyleValues, buttonTypes } from "../../models/property.enum";
import { useTimerStore } from "../../stores/timer";
import IlvoButton from "../atoms/IlvoButton.vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import IlvoInputField from "../molecules/IlvoInputField.vue";

const timer_store = useTimerStore();
const user_store = useUserStore();

const local_category_id = computed(() => {
  if (timer_store.localCategory?.sub_cat_id) {
    if (!user_store.categories) return "No category selected";

    let sub_cat_id = "";
    user_store.categories.forEach((category) => {
      if (category.sub_categories) {
        category.sub_categories.forEach((sub_category) =>
          sub_category.id === timer_store.localCategory?.sub_cat_id
            ? (sub_cat_id = sub_category.id)
            : null
        );
      }
    });
    return sub_cat_id ? sub_cat_id : "No category selected";
  }

  return user_store.categories
    ? user_store.categories.find((category) => {
        return category.id === timer_store.localCategory?.id;
      })?.id
    : "No category selected";
});

const select_titles = computed(() => {
  if (!user_store.categories) return [];

  return user_store.categories.flatMap((category) => {
    const subCategories = category.sub_categories.map((sub_category) => {
      return {
        title: sub_category.title,
        main_title: category.title,
        id: category.id,
        sub_cat_id: sub_category.id,
      };
    });

    return [{ title: category.title, id: category.id }, ...subCategories];
  });
});

const timerForm = ref<{
  title: string;
  description: string;
  color: string;
  category: number;
}>({
  title: "",
  description: "",
  color: "#a285d0",
  category: -1,
});

const selected_sub_category_id = computed(() => {
  return select_titles.value[timerForm.value.category]?.sub_cat_id;
});

const error_form = ref<string>("");

const router = useRouter();

// Validform for the button
const isValidForm = computed(() => {
  return (
    timer_store.startTime &&
    timer_store.endTime &&
    timerForm.value.title.length >= 3 &&
    timerForm.value.title.length <= 25 &&
    timerForm.value.description.length >= 10 &&
    timerForm.value.description.length <= 100 &&
    timer_store.startTime < timer_store.endTime &&
    timerForm.value.category >= 0 &&
    timerForm.value.category <= select_titles.value.length
  );
});

const handleForm = async (data: Event) => {
  if (!window.navigator.onLine) {
    error_form.value = "You are offline, please connect to the internet";
    return;
  }

  // Double validation for right error codes
  if (!timer_store.startTime || !timer_store.endTime) {
    error_form.value = "Please select a start and end time";
    return;
  }
  if (timerForm.value.title.length < 3 || timerForm.value.title.length > 25) {
    error_form.value = "Please enter a title with between 3 and 25 characters";
    return;
  }
  if (
    timerForm.value.description.length < 3 ||
    timerForm.value.description.length > 100
  ) {
    error_form.value =
      "Please enter a description with between 3 and 100 characters";
    return;
  }

  // Get the data in formData
  const formData = new FormData(data.target as HTMLFormElement);

  // Change the start and end time to the correct format
  formData.set("start", timer_store.startTime.toISOString().slice(0, -5) + "Z");
  formData.set("end", timer_store.endTime.toISOString().slice(0, -5) + "Z");

  // Set category id's in formData
  formData.delete("categories");
  try {
    const resp = await timer_store.sendTimer(formData);

    if (!resp) return;
    return router.push({ name: "dashboard" });
  } catch (error: any) {
    error_form.value = error?.message;
  }
};

// TODO Check if online realtime
// const isOnline = ref(window.navigator.onLine);
// const updateOnlineStatus = (e: any) => {
//   console.log(e);
// };
// onMounted(() => {
//   window.addEventListener("offline", updateOnlineStatus);
//   window.addEventListener("online", updateOnlineStatus);
// });
// onUnmounted(() => {
//   window.removeEventListener("offline", updateOnlineStatus);
//   window.removeEventListener("online", updateOnlineStatus);
// });
</script>

<template>
  <!-- TODO: Put this in another component -->
  <div class="timer_cards" v-if="!timer_store.isRunning && timer_store.timer">
    <div class="timer_card">
      <h2>{{ $t("timer.second_step.start_time") }}</h2>
      <div class="group">
        <h2>{{ timer_store.startTime.toLocaleTimeString("nl") }}</h2>
        <!-- <IlvoButton
          :type="buttonTypes.TEXT"
          :style="buttonStyleValues.PRIMARY"
          @button-clicked="() => console.log('change')"
          :disabled="true"
          >{{ $t("timer.input.button.change") }}</IlvoButton
        > -->
      </div>
    </div>
    <div class="bottom-card">
      <div class="timer_card">
        <h2>{{ $t("timer.second_step.end_time") }}</h2>
        <div class="group">
          <h2>{{ timer_store.endTime.toLocaleTimeString("nl") }}</h2>
          <!-- <IlvoButton
            :type="buttonTypes.TEXT"
            :style="buttonStyleValues.PRIMARY"
            @button-clicked="() => console.log('change')"
            :disabled="true"
            >{{ $t("timer.input.button.change") }}</IlvoButton
          > -->
        </div>
      </div>
      <p v-if="!timer_store.isRunning && timer_store.timer">
        {{ $t("timer.input.total", { total: timer_store.formattedTimer }) }}
      </p>
    </div>
  </div>

  <form action="#" method="post" autocomplete="on" @submit.prevent="handleForm">
    <!-- Hidden inputs for extra information -->
    <input
      type="hidden"
      name="start"
      :value="timer_store.startTime.getTime()"
    />
    <input type="hidden" name="end" :value="timer_store.endTime.getTime()" />
    <input
      type="hidden"
      name="categoryId"
      v-if="timerForm.category >= 0"
      :value="select_titles[timerForm.category].id"
    />
    <input
      type="hidden"
      name="subCategoryId"
      v-if="selected_sub_category_id"
      :value="selected_sub_category_id"
    />

    <IlvoInputField
      type="text"
      id="title"
      :placeholder="$t('timer.input.form.placeholderTitle')"
      :label="$t('timer.input.form.title')"
      v-model:input="timerForm.title"
      :error="
        timerForm.title
          ? timerForm.title.length < 3 || timerForm.title.length > 25
          : false
      "
      :error-helper="$t('timer.input.form.titleError')"
      :required="true"
    />

    <IlvoInputField
      type="textarea"
      id="description"
      :placeholder="$t('timer.input.form.descriptionPlaceholder')"
      :label="$t('timer.input.form.description')"
      v-model:input="timerForm.description"
      :error="
        timerForm.description
          ? timerForm.description.length < 10 ||
            timerForm.description.length > 100
          : false
      "
      :error-helper="$t('timer.input.form.descriptionError')"
      :required="true"
    />

    <IlvoInputField
      type="select"
      id="categories"
      :placeholder="$t('timer.input.form.categoryPlaceholder')"
      :label="$t('timer.input.form.category')"
      v-model:input="timerForm.category"
      :selected="select_titles.findIndex((title: any) => 
        title?.sub_cat_id
        ? title.sub_cat_id === local_category_id
        : title.id === local_category_id
      )"
      :values="select_titles.map((title: any) => title?.sub_cat_id ? title.title + ' - ' + title.main_title : title.title)"
      :required="true"
    />

    <IlvoInputField
      type="color"
      id="color"
      :placeholder="$t('timer.input.form.colorPlaceholder')"
      :label="$t('timer.input.form.color')"
      v-model:input="timerForm.color"
      :required="true"
    />

    <p v-if="error_form" class="error">{{ error_form }}</p>

    <IlvoButton
      :type="buttonTypes.TEXT"
      :style="buttonStyleValues.PRIMARY"
      :submit="true"
      :disabled="!isValidForm"
    >
      {{ $t("timer.input.form.submit") }}
    </IlvoButton>
  </form>
</template>

<style lang="scss" scoped>
.timer_cards {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  .timer_card {
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    gap: 0.8rem;
    background-color: var(--off-white);
    border-radius: 1.6rem;
    box-shadow: var(--shadow-md-bottom);
    .group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    h2 {
      margin: 0;
    }
  }
  .bottom_card {
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    gap: 0.8rem;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
