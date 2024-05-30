<script setup lang="ts">
import IlvoHeader from "./components/organisms/IlvoHeader.vue";
</script>

<template>
  <IlvoHeader />

  <!-- Make routing possible -->
  <main>
    <RouterView name="default" />
    <RouterView name="modal" />
  </main>
</template>

<style scoped lang="scss"></style>
