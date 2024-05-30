<script setup lang="ts">
import * as mdiIcons from "@mdi/js";
import { computed } from "vue";
import {
  buttonSizes,
  buttonStyleValues,
  buttonTypes,
} from "../../models/property.enum";
import { isValidMdiIcon } from "../../composables/validators";

defineEmits(["button-clicked"]);
const props = defineProps<{
  style: buttonStyleValues;
  type: buttonTypes;
  size?: buttonSizes;
  rounded?: boolean;
  disabled?: boolean;
  mdiIcon?: string;
  submit?: boolean;
}>();

const iconPath = computed(() => {
  if (props.mdiIcon && isValidMdiIcon(props.mdiIcon)) {
    return (mdiIcons as { [key: string]: string })[props.mdiIcon];
  }
  return null;
});
</script>

<template>
  <button
    @click="$emit('button-clicked')"
    :class="[style, type, size ?? size, { rounded: rounded }]"
    :disabled
    :type="submit ? 'submit' : 'button'"
    v-if="type === buttonTypes.TEXT || type === buttonTypes.TEXT_AND_ICON"
  >
    <slot></slot>

    <svg v-if="iconPath" :viewBox="'0 0 24 24'" :height="'20'" fill="#fafafa">
      <path :d="iconPath"></path>
    </svg>
  </button>
  <button
    @click="$emit('button-clicked')"
    :disabled
    :type="submit ? 'submit' : 'button'"
    :class="['icon-btn', style, size ?? size]"
    v-else
  >
    <svg
      v-if="iconPath"
      :viewBox="'0 0 24 24'"
      :height="size === buttonSizes.SMALL ? '36' : '64'"
      fill="#fafafa"
    >
      <path :d="iconPath"></path>
    </svg>
  </button>
</template>

<style scoped lang="scss">
button {
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.5rem;
  padding: 1.6rem 3.2rem;
  font-weight: 700;
  &.icon-btn {
    padding: 1.6rem;
    border-radius: 50%;
    aspect-ratio: 1;
    width: fit-content;
  }
  &.text,
  .icon {
    justify-content: center;
  }
  &.text-and-icon {
    justify-content: space-between;
  }
  &.primary {
    background-color: var(--primary-color);
    color: var(--primary-white);
  }
  &.secondary {
    background-color: var(--secondary-color);
    color: var(--primary-white);
  }
  &.red {
    background-color: var(--state-error);
    color: var(--primary-white);
  }
  &.rounded {
    border-radius: 9999px;
  }
  &.full-width {
    width: 100%;
  }
}
</style>
