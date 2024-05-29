<script setup lang="ts">
defineEmits(["button-clicked"]);
defineProps({ style: String, type: String, disabled: Boolean });
</script>

<template>
  <button class="ilvo-button" @click="$emit('button-clicked')">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss"></style>
