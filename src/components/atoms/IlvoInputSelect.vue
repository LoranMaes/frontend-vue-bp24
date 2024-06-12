<script setup lang="ts">
const props = defineProps<{
  id: string;
  values: Array<string>;
  placeholder: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  selected?: number;
}>();
const model = defineModel("input", { required: true });
model.value = props.selected;
</script>

<template>
  <select
    :name="id"
    :id
    v-model="model"
    :disabled
    :readonly
    :class="[error ? 'error' : '']"
    :placeholder="placeholder"
  >
    <option
      v-for="(value, index) in values"
      :key="index"
      :value="index"
      :selected="selected === index"
    >
      {{ value }}
    </option>
  </select>
</template>

<style scoped lang="scss">
select {
  position: relative;
  font-family: "Raleway", sans-serif;
  border: 1px solid var(--gray-3);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-sm);
  background-color: var(--primary-white);
  padding: 1.2rem 1.8rem;
  font-size: 1.6rem;
  &.error {
    border-color: var(--state-error);
  }
}
</style>
