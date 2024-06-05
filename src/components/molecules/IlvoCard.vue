<script setup lang="ts">
import IlvoRouterLink from "../atoms/IlvoRouterLink.vue";

defineProps<{
  title: string;
  routerLink: string;
}>();
</script>

<template>
  <div class="ilvo-card">
    <div class="upper-part">
      <h2>{{ title }}</h2>
      <IlvoRouterLink :to="{ name: routerLink }" class="link">{{
        $t("navigation.seeAll")
      }}</IlvoRouterLink>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.ilvo-card {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0.8rem;
  border-radius: 0.8rem;
  box-shadow: var(--shadow-md-bottom);
  background-color: var(--off-white);
  .upper-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      margin: 0;
    }
  }
}
</style>
