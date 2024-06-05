<script setup lang="ts">
// This is a JavaScript module so in TypeScript config I added "allowJs": true
// Documentation:
// https://antoniandre.github.io/vue-cal/
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { Helpers } from "../composables/helpers";

const user_store = useUserStore();

const tasks = computed(() => {
  if (!user_store.tasks) return [];
  return user_store.tasks.map((task) => {
    const start = new Date(task.start);
    const end = new Date(task.end);
    const durationInMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
    // Less than 30 minutes tasks are not displayed
    if (durationInMinutes < 30);

    return {
      start: Helpers.dateStringToCalendarDate(task.start),
      end: Helpers.dateStringToCalendarDate(task.end),
      title: task.title,
      content: task.description?.substring(0, 25),
      contentFull: task.description,
    };
  });
});
</script>

<template>
  <div class="calendar">
    <VueCal
      active-view="day"
      :disable-views="['years', 'year', 'month']"
      :events="tasks"
    />
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
