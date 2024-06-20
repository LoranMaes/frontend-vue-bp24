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
import { Line } from "vue-chartjs";
import { computed } from "vue";
import { useUserStore } from "../../stores/user";
import { useAdminStore } from "../../stores/admin";

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
</script>

<template>
  <div class="cards">
    <div class="stat-card">
      <div class="header">
        <h2>{{ $t("statistics.hoursWorked") }}</h2>
        <p class="subtitle bold">{{ $t("statistics.daily") }}</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="header">
        <h2>{{ $t("statistics.tasksFinished") }}</h2>
        <p class="subtitle bold">{{ $t("statistics.daily") }}</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="header">
        <h2>
          {{ $t("statistics.mostSpentTime") }} - {{ $t("statistics.daily") }}
        </h2>
        <p class="subtitle bold">{{}}</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="header">
        <h2>
          {{ $t("statistics.mostSpentTime") }} - {{ $t("statistics.monthly") }}
        </h2>
        <p class="subtitle bold">{{}}</p>
      </div>
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
