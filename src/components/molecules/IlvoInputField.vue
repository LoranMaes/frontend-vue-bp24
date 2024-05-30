<script setup lang="ts">
import IlvoInput from "../atoms/IlvoInput.vue";
import { defineProps } from "vue";

const props = defineProps<{
  type: "text" | "password" | "email" | "file" | "date" | "color" | "textarea";
  id: string;
  placeholder: string;
  label: string;
  helper?: string;
  mdiIcon?: string;
  iconSide?: "left" | "right";
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  errorHelper?: string;
}>();
const model = defineModel("input", { required: true });
</script>

<template>
  <div class="input-field">
    <label>{{ label }}</label>
    <IlvoInput
      :type
      :id
      :placeholder
      :disabled
      :readonly
      :mdi-icon="mdiIcon"
      :icon-side="iconSide"
      v-model:input="model"
      :error="error"
    />
    <p class="small" v-if="helper && !error">{{ helper }}</p>
    <p class="small error" v-if="error">{{ errorHelper }}</p>
  </div>
</template>

<style scoped lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  p {
    margin: 0;
    &.error {
      font-weight: 700;
      color: var(--state-error);
    }
  }
}
</style>
