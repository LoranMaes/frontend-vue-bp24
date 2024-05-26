<script setup lang="ts">
defineEmits(["button-clicked"]);
</script>

<template>
  <button class="ilvo-button" @click="$emit('button-clicked')">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss"></style>
