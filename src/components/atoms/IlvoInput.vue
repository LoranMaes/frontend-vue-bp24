<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { isValidMdiIcon } from "../../composables/validators";
import * as mdiIcons from "@mdi/js";
import IlvoInputSelect from "./IlvoInputSelect.vue";
import { Helpers } from "../../composables/helpers";

const props = defineProps<{
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
  placeholder: string;
  id: string;
  mdiIcon?: string;
  iconSide?: "left" | "right";
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  values?: Array<string>;
  selected?: number;
  accept?: string;
}>();
const model = defineModel("input", { required: true });

const iconPath = computed(() => {
  if (props.mdiIcon && isValidMdiIcon(props.mdiIcon)) {
    return (mdiIcons as { [key: string]: string })[props.mdiIcon];
  }
  return null;
});
const showPassword = ref(false);

const color_mode = ref("dark");
watch(
  () => model.value,
  () => {
    if (props.type === "color") {
      const hex = model.value + "";
      const color = Helpers.getContrastingColor(hex ? hex : "#000000");
      color_mode.value = color;
    }
  }
);
</script>

<template>
  <textarea
    v-if="type === 'textarea'"
    :disabled
    :readonly
    :id
    :placeholder
    :class="[error ? 'error' : '']"
    v-model="model"
    :name="id"
  ></textarea>
  <IlvoInputSelect
    v-else-if="type === 'select'"
    :id
    :disabled
    :readonly
    :error
    :selected
    :values="values || []"
    :placeholder="placeholder"
    v-model:input="model"
  />
  <div
    v-else
    :class="[
      'input-field',
      {
        'icon-left': iconSide === 'left' && iconPath,
      },
    ]"
  >
    <!-- This is for the text over the input color field -->
    <span
      :class="['input-field-color bold', color_mode]"
      v-if="type === 'color'"
      >{{ model ? model : "#000000" }}</span
    >
    <svg
      v-if="iconPath && iconSide === 'left' && type !== 'password'"
      :viewBox="'0 0 24 24'"
      :height="'20'"
      fill="#9fa6b1"
      class="left"
    >
      <path :d="iconPath"></path>
    </svg>
    <input
      :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
      :disabled
      :readonly
      :id
      :placeholder
      :class="[error ? 'error' : '']"
      v-model="model"
      :name="id"
    />
    <svg
      v-if="iconPath && iconSide === 'right' && type !== 'password'"
      :viewBox="'0 0 24 24'"
      :height="'20'"
      fill="#9fa6b1"
      class="right"
    >
      <path :d="iconPath"></path>
    </svg>
    <button
      class="password right"
      v-if="type === 'password'"
      @click="() => (showPassword = !showPassword)"
      type="button"
    >
      <svg
        class="password"
        :viewBox="'0 0 24 24'"
        :height="'24'"
        fill="#9fa6b1"
      >
        <path v-if="showPassword" :d="mdiIcons.mdiEyeOff"></path>
        <path v-else :d="mdiIcons.mdiEye"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
input,
textarea {
  position: relative;
  font-family: "Raleway", sans-serif;
  border: 1px solid var(--gray-3);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-sm);
  padding: 1.2rem 1.8rem;
  font-size: 1.6rem;
  &.error {
    border-color: var(--state-error);
  }
  &[type="color"] {
    position: relative;
    padding: 0;
    border: none;
    width: 100%;
    height: 5.4rem;
    cursor: pointer;
  }
}
.input-field {
  display: flex;
  position: relative;
  &.icon-left {
    input {
      padding-left: 4.2rem;
    }
  }
  svg:not(.password),
  button.password {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    &.left {
      left: 1.6rem;
    }
    &.right {
      right: 1.6rem;
    }
  }
  button.password {
    background: none;
    display: flex;
    border: none;
    cursor: pointer;
    padding: 0;
    svg {
      position: relative;
    }
  }
  & span.input-field-color {
    color: var(--primary-white);
    z-index: 2;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    font-size: 1.6rem;
    pointer-events: none;
    &.dark {
      color: var(--primary-white);
    }
    &.light {
      color: var(--primary-black);
    }
  }
}
</style>
