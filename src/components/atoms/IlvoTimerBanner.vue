<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTimerStore } from "../../stores/timer";
import { mdiChevronRight } from "@mdi/js";

const timer_store = useTimerStore();
const route = useRoute();
</script>

<template>
  <div id="timer_banner" v-if="route.path === '/timer'">
    <h2>Currently at:</h2>
    <p>{{ timer_store.formattedTimer }}</p>
  </div>
  <RouterLink id="timer_banner" :to="{ name: 'timer' }" v-else>
    <div class="left-group">
      <h2>Currently at:</h2>
      <p>
        {{ timer_store.formattedTimer ? timer_store.formattedTimer : "00:00" }}
      </p>
    </div>
    <svg viewBox="0 0 24 24" fill="#FAFAFA" width="36" height="36">
      <path :d="mdiChevronRight"></path>
    </svg>
  </RouterLink>
</template>

<style lang="scss" scoped>
a {
  all: unset;
  cursor: pointer;
}
#timer_banner {
  display: flex;
  z-index: 1000;
  flex-direction: row;
  position: fixed;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2.4rem 3.2rem;
  gap: 0.8rem;
  background-color: var(--state-error);
  box-shadow: 0 -4px 8px 0 rgba(244, 67, 54, 0.5);
  box-sizing: border-box;
  h2,
  p {
    color: var(--primary-white);
    margin: 0;
  }
  .left-group {
    display: flex;
    flex-direction: row;
    gap: 0.8rem;
    + svg {
      position: absolute;
      right: 1.6rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
