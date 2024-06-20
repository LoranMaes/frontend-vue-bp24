<script setup lang="ts">
import IlvoInput from "../atoms/IlvoInput.vue";
import { defineModel } from "vue";

defineProps<{
  type:
    | "text"
    | "password"
    | "email"
    | "file"
    | "date"
    | "color"
    | "textarea"
    | "select"
    | "file";
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
  values?: Array<string>;
  selected?: number;
  accept?: string;
  required?: boolean;
}>();
const model = defineModel("input", { required: true });
</script>

<template>
  <div class="input-field">
    <label :for="id" :class="[required ? 'required' : '']">{{ label }}</label>
    <IlvoInput
      :type
      :id
      :placeholder
      :disabled
      :readonly
      :selected
      :mdi-icon="mdiIcon"
      :icon-side="iconSide"
      v-model:input="model"
      :error
      :values
      :accept
      :on-update:input="($event) => $emit('update:input', $event)"
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
  width: 100%;
  p {
    margin: 0;
    &.error {
      font-weight: 700;
      color: var(--state-error);
    }
  }
  label {
    cursor: pointer;
    width: fit-content;
    position: relative;
    &.required::after {
      content: "*";
      color: var(--state-error);
      position: absolute;
      right: -0.5rem;
    }
  }
}
</style>
