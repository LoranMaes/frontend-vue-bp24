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
  BarElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Line, Bar, PolarArea } from "vue-chartjs";
import { computed } from "vue";
import { Helpers } from "../../composables/helpers";
import { useUserStore } from "../../stores/user";
import { Task } from "../../models/task.model";
import IlvoButton from "../atoms/IlvoButton.vue";
import { buttonStyleValues, buttonTypes } from "../../models/property.enum";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  RadialLinearScale,
  ArcElement
);

const user_store = useUserStore();

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
      beginAtZero: true,
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

const hoursCount = computed(() => {
  const counts: number[] = Array(7).fill(0);
  const today = Helpers.normalizeDate(new Date());
  if (!user_store.tasks) return counts;
  user_store.tasks.forEach((task: Task) => {
    const start = Helpers.normalizeDate(new Date(task.start));
    const end = Helpers.normalizeDate(new Date(task.end));
    const daysAgo = Math.floor(
      (today.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysAgo < 7) {
      counts[daysAgo] += start.getHours() - end.getHours();
    }
  });

  return counts.reverse();
});

const hoursWorkedData = computed(() => {
  return {
    labels: Helpers.statsLabelsPastWeek(),
    datasets: [
      {
        data: hoursCount.value,
        label: "Total hours",
        backgroundColor: "#5356db",
        borderColor: "#a285d0",
        tension: 0.3,
      },
    ],
  };
});

const taskCounts = computed(() => {
  const counts: number[] = Array(7).fill(0);
  const today = Helpers.normalizeDate(new Date());
  let count_days_array: any = [];
  if (!user_store.tasks) return counts;
  count_days_array = user_store.tasks;
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

const tasksFinishedData = computed(() => {
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

const polarLabels = computed(() => {
  if (!user_store.categories) return [];
  return user_store.categories.map((category) => category.title);
});
const mostSpentTimeWeekly = computed(() => {
  const tasks = user_store.tasks;
  if (!tasks)
    return {
      labels: polarLabels.value,
      datasets: [],
    };
  const today = Helpers.normalizeDate(new Date());
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  const weekTasks = tasks.filter((task: Task) => {
    const end = Helpers.normalizeDate(new Date(task.end));
    return end >= weekAgo && end <= today;
  });
  const categories = user_store.categories;
  if (!categories)
    return {
      labels: polarLabels.value,
      datasets: [],
    };
  const categoryTimes = categories.map((category) => {
    const categoryTasks = weekTasks.filter(
      (task: Task) => task.categoryId === category.id
    );
    const categoryTime = categoryTasks.reduce((acc, task) => {
      const start = new Date(task.start);
      const end = new Date(task.end);
      const startMinutes = start.getHours() * 60 + start.getMinutes();
      const endMinutes = end.getHours() * 60 + end.getMinutes();
      const diffMinutes = endMinutes - startMinutes;
      const diffHours = diffMinutes / 60;
      return acc + diffHours;
    }, 0);
    return {
      category: category.title,
      time: categoryTime,
    };
  });
  return {
    labels: categoryTimes.map((ct) => ct.category),
    datasets: [
      {
        label: "Hours Spent",
        data: categoryTimes.map((ct) => ct.time),
        backgroundColor: categoryTimes.map((ct, index) =>
          index % 2 === 0 ? "#5356db" : "#a285d0"
        ),
      },
    ],
  };
});

const mostSpentTimeMonthly = computed(() => {
  const tasks = user_store.tasks;
  if (!tasks)
    return {
      labels: polarLabels.value,
      datasets: [],
    };
  const today = Helpers.normalizeDate(new Date());
  const monthAgo = new Date(today);
  monthAgo.setDate(today.getDate() - 30);
  const monthTasks = tasks.filter((task: Task) => {
    const end = Helpers.normalizeDate(new Date(task.end));
    return end >= monthAgo && end <= today;
  });
  const categories = user_store.categories;
  if (!categories)
    return {
      labels: polarLabels.value,
      datasets: [],
    };
  const categoryTimes = categories.map((category) => {
    const categoryTasks = monthTasks.filter(
      (task: Task) => task.categoryId === category.id
    );
    const categoryTime = categoryTasks.reduce((acc, task) => {
      const start = new Date(task.start);
      const end = new Date(task.end);
      const startMinutes = start.getHours() * 60 + start.getMinutes();
      const endMinutes = end.getHours() * 60 + end.getMinutes();
      const diffMinutes = endMinutes - startMinutes;
      const diffHours = diffMinutes / 60;
      return acc + diffHours;
    }, 0);
    return {
      category: category.title,
      time: categoryTime,
    };
  });
  return {
    labels: categoryTimes.map((ct) => ct.category),
    datasets: [
      {
        label: "Hours Spent",
        data: categoryTimes.map((ct) => ct.time),
        backgroundColor: categoryTimes.map((ct, index) =>
          index % 2 === 0 ? "#5356db" : "#a285d0"
        ),
      },
    ],
  };
});
</script>

<template>
  <div class="cards">
    <IlvoButton
      :type="buttonTypes.TEXT"
      :style="buttonStyleValues.PRIMARY"
      @button-clicked="async () => user_store.downloadStatisticsAsCsv()"
      >{{ $t("statistics.download") }}</IlvoButton
    >
    <div class="stat-card">
      <div class="header">
        <h2>{{ $t("statistics.hoursWorked") }}</h2>
        <p class="subtitle bold">{{ $t("statistics.daily") }}</p>
      </div>
      <Line id="hoursWorked" :data="hoursWorkedData" :options />
    </div>
    <div class="stat-card">
      <div class="header">
        <h2>{{ $t("statistics.tasksFinished") }}</h2>
        <p class="subtitle bold">{{ $t("statistics.daily") }}</p>
      </div>
      <Bar id="tasksFinished" :data="tasksFinishedData" :options="options" />
    </div>
    <div class="stat-card">
      <div class="header">
        <h2>
          {{ $t("statistics.mostSpentTime") }} - {{ $t("statistics.weekly") }}
        </h2>
      </div>
      <PolarArea
        id="mostSpentTimeWeekly"
        :data="mostSpentTimeWeekly"
        :options
        v-if="
          mostSpentTimeWeekly.datasets.some((dataset) =>
            dataset.data.some((data) => data > 0)
          )
        "
      />
      <p v-else>No tasks longer than an hour this week</p>
    </div>
    <div class="stat-card">
      <div class="header">
        <h2>
          {{ $t("statistics.mostSpentTime") }} - {{ $t("statistics.monthly") }}
        </h2>
        <p class="subtitle bold">
          {{ new Date().toLocaleDateString("en", { month: "long" }) }}
        </p>
      </div>
      <PolarArea
        id="mostSpentTimeMonthly"
        :data="mostSpentTimeMonthly"
        :options
        v-if="
          mostSpentTimeMonthly.datasets.some((dataset) =>
            dataset.data.some((data) => data > 0)
          )
        "
      />
      <p v-else>No tasks longer than an hour this month</p>
    </div>
  </div>
</template>

<style lang="scss">
.cards {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
}
.stat-card {
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  border-radius: 0.8rem;
  background-color: var(--off-white);
  box-shadow: var(--shadow-md);
  gap: 1.6rem;
  .header {
    display: flex;
    flex-direction: column;
    p.subtitle {
      color: var(--state-warning);
    }
  }
}
</style>
