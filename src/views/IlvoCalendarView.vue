<script setup lang="ts">
// This is a JavaScript module so in TypeScript config I added "allowJs": true
// Documentation:
// https://antoniandre.github.io/vue-cal/

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

const specialHours = {
  1: {
    from: 8 * 60,
    to: 17 * 60,
    label: "Doctor 1<br>Full day shift",
    class: "task-background",
  },
};
</script>

<template>
  <div class="calendar">
    <VueCal
      active-view="day"
      :disable-views="['years', 'year', 'month', 'week']"
      :special-hours="specialHours"
    ></VueCal>
  </div>
</template>

<style lang="scss">
.calendar {
  display: flex;
  padding: 3.2rem 2.4rem 2.4rem 2.4rem;
  .vuecal {
    border-radius: 0.8rem;
    overflow: hidden;
  }
}

.vuecal__flex.vuecal__menu {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}

.vuecal__title-bar {
  background-color: var(--tint-green);
}

.vuecal__special-hours {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;

  em {
    font-size: var(--mobile-p);
    color: var(--gray-2);
  }
}

.task-background {
  background-color: var(--tint-green);
}
</style>
