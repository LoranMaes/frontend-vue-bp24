<script setup lang="ts">
import { computed, ref } from "vue";
import { isValidMdiIcon } from "../../composables/validators";
import * as mdiIcons from "@mdi/js";

const props = defineProps<{
  type: "text" | "password" | "email" | "file" | "date" | "color" | "textarea";
  placeholder: string;
  id: string;
  mdiIcon?: string;
  iconSide?: "left" | "right";
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
}>();
const model = defineModel("input", { required: true });

const iconPath = computed(() => {
  if (props.mdiIcon && isValidMdiIcon(props.mdiIcon)) {
    return (mdiIcons as { [key: string]: string })[props.mdiIcon];
  }
  return null;
});
const showPassword = ref(false);
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
  <div
    v-else
    :class="['input-field', { 'icon-left': iconSide === 'left' && iconPath }]"
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
  border: 1px solid var(--gray-3);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-sm);
  padding: 1.2rem 1.8rem;
  font-size: 1.6rem;
  &.error {
    border-color: var(--state-error);
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
}
</style>
