<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useUserStore } from "../../stores/user";
import { Line } from "vue-chartjs";
import { computed } from "vue";
import { useAdminStore } from "../../stores/admin";
import { Helpers } from "../../composables/helpers";
import { Task } from "../../models/task.model";

const props = defineProps<{
  role: "user" | "admin";
}>();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const user_store = useUserStore();
const admin_store = useAdminStore();

const taskCounts = computed(() => {
  const counts: number[] = Array(7).fill(0);
  const today = Helpers.normalizeDate(new Date());

  let count_days_array: any = [];
  switch (props.role) {
    case "admin":
      if (!admin_store.tasks) return counts;
      count_days_array = admin_store.tasks;
      break;
    case "user":
      if (!user_store.tasks) return counts;
      count_days_array = user_store.tasks;
      break;
  }
  count_days_array.forEach((task: Task) => {
    const end = Helpers.normalizeDate(new Date(task.end));
    const daysAgo = Math.floor(
      (today.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysAgo < 7) {
      counts[daysAgo]++;
    }
  });

  return counts.reverse();
});

const data = computed(() => {
  return {
    labels: Helpers.statsLabelsPastWeek(),
    datasets: [
      {
        data: taskCounts.value,
        label: "Total tasks",
        backgroundColor: "#5356db",
        borderColor: "#a285d0",
        tension: 0.3,
      },
    ],
  };
});

ChartJS.defaults.font.family = "Raleway";
ChartJS.defaults.font.size = 14;
const options = {
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    y: {
      grid: {
        drawTicks: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <p>{{ $t("dashboard.admin.statistics.week") }}</p>
  <Line id="weekly-overview" :data :options />
</template>

<style lang="scss" scoped></style>
