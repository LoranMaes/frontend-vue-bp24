<script setup lang="ts">
// This is a JavaScript module so in TypeScript config I added "allowJs": true
// Documentation:
// https://antoniandre.github.io/vue-cal/
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useAdminStore } from "../stores/admin";
import { Task } from "../models/task.model";

const user_store = useUserStore();
const auth_store = useAuthStore();
const admin_store = useAdminStore();

const tasks = computed(() => {
  const task_array: Task[] = [];
  switch (auth_store.user?.role) {
    case "user":
      if (!user_store.tasks) return [];
      task_array.push(...user_store.tasks);
      break;
    case "admin":
      if (!admin_store.tasks) return [];
      task_array.push(...admin_store.tasks);
      break;
  }

  return task_array
    .filter((task) => {
      const start = new Date(task.start);
      const end = new Date(task.end);
      const durationInMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
      // console.log(durationInMinutes >= 30 ? task : null);
      return durationInMinutes >= 30;
    })
    .map((task) => {
      // console.log(task);
      return {
        start: new Date(task.start),
        end: new Date(task.end),
        title: task.title,
        content: task.description ? task.description.substring(0, 20) : "",
        contentFull: task.description || "",
        class: "task-background",
      };
    });
});
</script>

<template>
  <div class="calendar">
    <p>{{ $t("calendar.message") }}</p>
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
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem 2.4rem 2.4rem 2.4rem;
  font-size: 1.6rem;
  color: var(--primary-white);
  .vuecal {
    border-radius: 0.8rem;
    overflow: hidden;
  }
}

.task-background {
  background-color: var(--tint-purple);
}
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: var(--secondary-color);
}
.vuecal__title-bar {
  background-color: var(--tint-green);
  color: var(--primary-black);
}
.vuecal__cell--today,
.vuecal__cell--current {
  background-color: var(--gray-2);
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: var(--gray-3);
}
.vuecal__cell--selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(136, 236, 191, 0.25);
}
.vuecal__no-event,
.vuecal__weekdays-headings {
  color: var(--gray-1);
}
</style>
