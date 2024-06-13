<script setup lang="ts"></script>

<template>
  <div id="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <RouterLink :to="{ name: 'dashboard' }"
      >Go back to the dashboard</RouterLink
    >
  </div>
</template>

<style scoped lang="scss">
#not-found {
  flex: 1;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-black);
  h1,
  p,
  a {
    color: var(--primary-white);
  }
}
</style>
