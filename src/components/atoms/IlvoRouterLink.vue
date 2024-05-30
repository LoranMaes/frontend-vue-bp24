<script setup lang="ts">
import type { RouteLocation } from "vue-router";
import { computed, defineProps } from "vue";
import {
  linkTypes,
  buttonSizes,
  buttonStyleValues,
} from "../../models/property.enum";
import { isValidMdiIcon } from "../../composables/validators";
import * as mdiIcons from "@mdi/js";

const props = defineProps<{
  to: { name: string };
  style?: buttonStyleValues;
  type?: linkTypes;
  size?: buttonSizes;
  rounded?: boolean;
  disabled?: boolean;
  mdiIcon?: string;
  hasIcon?: boolean;
}>();

const iconPath = computed(() => {
  if (props.mdiIcon && isValidMdiIcon(props.mdiIcon)) {
    return (mdiIcons as { [key: string]: string })[props.mdiIcon];
  }
  return null;
});
</script>

<template>
  <router-link
    router-link
    :to
    :class="[
      style,
      type,
      size ?? size,
      { rounded: rounded, 'has-icon': hasIcon },
    ]"
  >
    <slot>Enter a link</slot>
    <svg v-if="iconPath" :viewBox="'0 0 24 24'" :height="'20'" fill="#fafafa">
      <path :d="iconPath"></path>
    </svg>
  </router-link>
</template>

<style scoped lang="scss">
.link {
  color: var(--primary-color);
}

.button {
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.5rem;
  padding: 1.6rem 3.2rem;
  font-weight: 700;
  text-decoration: none;
  box-sizing: border-box;
  &.primary {
    background-color: var(--primary-color);
    color: var(--primary-white);
  }
  &.secondary {
    background-color: var(--secondary-color);
    color: var(--primary-white);
  }
  &.rounded {
    border-radius: 9999px;
  }
  &.full-width {
    width: 100%;
  }
  &.center {
    justify-content: center;
  }
  &.has-icon {
    justify-content: space-between;
  }
}
</style>
