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
}>();
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
    />
    <p class="small" v-if="helper">{{ helper }}</p>
  </div>
</template>

<style scoped lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  p {
    margin: 0;
  }
}
</style>
