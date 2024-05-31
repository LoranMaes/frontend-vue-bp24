<script setup lang="ts">
import { computed, ref } from "vue";
import { buttonStyleValues, buttonTypes } from "../../models/property.enum";
import { useTimerStore } from "../../stores/timer";
import IlvoButton from "../atoms/IlvoButton.vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";

const timer_store = useTimerStore();
const user_store = useUserStore();

const category_title = computed(() => {
  if (timer_store.localCategory?.sub_cat_id) {
    if (user_store.categories) {
      console.log(timer_store.localCategory?.sub_cat_id);
      return user_store.categories.find((category) => {
        if (category.sub_categories) {
          return category.sub_categories.find((sub_category) => {
            return sub_category.id === timer_store.localCategory?.sub_cat_id;
          })?.title;
        }
      })?.title;
    }
    return "No category selected";
  }

  return user_store.categories
    ? user_store.categories.find((category) => {
        return category.id === timer_store.localCategory?.id;
      })?.title
    : "No category selected";
});

const timerForm = ref<{
  title: string;
  description: string;
  color: string;
}>({
  title: "",
  description: "",
  color: "",
});

const error_form = ref<string>("");

const router = useRouter();

const isValidForm = computed(() => {
  return (
    timer_store.startTime &&
    timer_store.endTime &&
    timerForm.value.title.length >= 3 &&
    timerForm.value.title.length <= 25 &&
    timerForm.value.description.length >= 3 &&
    timerForm.value.description.length <= 100 &&
    timer_store.startTime < timer_store.endTime
  );
});

const handleForm = async (data: Event) => {
  // Validation
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
  try {
    const resp = await timer_store.sendTimer(formData);
    return router.push({ name: "dashboard" });
  } catch (error: any) {
    error_form.value = error?.message;
  }
};
</script>

<template>
  <!-- Put this in another component -->
  <div
    class="timer_cards"
    v-if="(!timer_store.isRunning && !timer_store.timer) || timer_store.timer"
  >
    <div class="timer_card">
      <h2>{{ $t("timer.second_step.start_time") }}</h2>
      <div class="group">
        <h2>{{ timer_store.startTime.toLocaleTimeString("nl") }}</h2>
        <IlvoButton
          :type="buttonTypes.TEXT"
          :style="buttonStyleValues.PRIMARY"
          @button-clicked="() => console.log('change')"
          :disabled="true"
          >{{ $t("timer.input.button.change") }}</IlvoButton
        >
      </div>
    </div>
    <div class="bottom-card">
      <div class="timer_card">
        <h2>{{ $t("timer.second_step.end_time") }}</h2>
        <div class="group">
          <h2>{{ timer_store.endTime.toLocaleTimeString("nl") }}</h2>
          <IlvoButton
            :type="buttonTypes.TEXT"
            :style="buttonStyleValues.PRIMARY"
            @button-clicked="() => console.log('change')"
            :disabled="true"
            >{{ $t("timer.input.button.change") }}</IlvoButton
          >
        </div>
      </div>
      <p v-if="!timer_store.isRunning && timer_store.timer">
        {{ $t("timer.input.total", { total: timer_store.formattedTimer }) }}
      </p>
    </div>
  </div>

  <form action="#" method="post" autocomplete="on" @submit.prevent="handleForm">
    <input
      type="hidden"
      name="start"
      :value="timer_store.startTime.getTime()"
    />
    <input type="hidden" name="end" :value="timer_store.endTime.getTime()" />
    <input
      type="hidden"
      name="categoryId"
      :value="timer_store.localCategory?.id"
    />
    <input
      type="hidden"
      name="subCategoryId"
      :value="timer_store.localCategory?.sub_cat_id"
    />

    <label for="title">Title</label>
    <input type="text" name="title" id="title" v-model="timerForm.title" />

    <label for="title">Description</label>
    <textarea
      name="description"
      id="description"
      v-model="timerForm.description"
    ></textarea>

    <p>
      {{ `Choosing a category in development ${category_title}` }}
    </p>

    <label for="color">Color</label>
    <input type="color" name="color" id="color" />
    <!-- <IlvoInputField
      type="text"
      id="title"
      :placeholder="$t('timer.input.form.placeholderTitle')"
      :label="$t('timer.input.form.title')"
      v-model:input="timerForm?.title"
    />
    <IlvoInputField
      type="textarea"
      id="description"
      :placeholder="$t('timer.input.form.descriptionTitle')"
      :label="$t('timer.input.form.description')"
      v-model:input="timerForm?.title"
    />
    <IlvoInputField
      type="color"
      id="color"
      :placeholder="$t('timer.input.form.descriptionTitle')"
      :label="$t('timer.input.form.color')"
      v-model:input="timerForm?.title"
    /> -->
    <p v-if="error_form">{{ error_form }}</p>

    <IlvoButton
      :type="buttonTypes.TEXT"
      :style="buttonStyleValues.PRIMARY"
      :submit="true"
      :disabled="!isValidForm"
    >
      {{ $t("timer.input.form.submit") }}
    </IlvoButton>
    <!-- Add the custom select (now just take it from localstorage) -->
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
