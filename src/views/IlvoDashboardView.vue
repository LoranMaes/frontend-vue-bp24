<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import IlvoCard from "../components/molecules/IlvoCard.vue";
import IlvoTaskCard from "../components/molecules/IlvoTaskCard.vue";
import { useAuthStore } from "../stores/auth";
import { useUserStore } from "../stores/user";
import IlvoButton from "../components/atoms/IlvoButton.vue";
import {
  buttonSizes,
  buttonStyleValues,
  buttonTypes,
} from "../models/property.enum";
import { useRouter } from "vue-router";
import { useTimerStore } from "../stores/timer";

const auth_store = useAuthStore();
const user_store = useUserStore();
const timer_store = useTimerStore();
const user = auth_store.user;
const cards_loading = ref({
  tasks: true,
  statistics: false,
});

const router = useRouter();
const createNewTask = () => {
  return router.push({ name: "timer" });
};

const limitedTasks = computed(() => {
  if (!user_store.tasks || user_store.tasks.length <= 3)
    return user_store.tasks;
  return user_store.tasks.slice(0, 3);
});

onMounted(async () => {
  await user_store.initializeTasks();
  cards_loading.value.tasks = false;
});
</script>

<template>
  <section id="dashboard" :class="[{ 'timer-running': timer_store.isRunning }]">
    <h1>{{ $t("dashboard.title", { name: user?.firstName }) }}</h1>
    <IlvoCard :title="$t('dashboard.tasks.title')" router-link="calendar">
      <!-- Add tasks here -->
      <div class="loading" v-if="cards_loading.tasks">
        <span class="loader"></span>
      </div>
      <p class="empty" v-if="!user_store.tasks || !user_store.tasks.length">
        {{ $t("dashboard.tasks.nothing") }}
      </p>
      <div class="cards" v-else>
        <IlvoTaskCard
          v-for="(task, index) in limitedTasks"
          :key="index"
          :task="task"
        />
      </div>
    </IlvoCard>
    <IlvoCard
      :title="$t('dashboard.statistics.title')"
      router-link="statistics"
    >
      <!-- Add tasks here -->
      <div class="loading" v-if="cards_loading.statistics">
        <span class="loader"></span>
      </div>
      <p class="empty" v-if="!user_store.statistics">
        {{ $t("dashboard.statistics.nothing") }}
      </p>
    </IlvoCard>

    <IlvoButton
      :type="buttonTypes.ICON"
      :style="buttonStyleValues.PRIMARY"
      mdi-icon="mdiPlus"
      :size="buttonSizes.LARGE"
      id="add-task"
      v-if="auth_store.user?.role === 'user' && !timer_store.isRunning"
      @click="createNewTask"
    />
  </section>
</template>

<style lang="scss">
#dashboard {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2.4rem;
  padding-bottom: 12rem;
  gap: 3.2rem;
  &.timer-running {
    padding-bottom: 6.4rem;
  }
  p.empty {
    text-align: center;
  }
  #add-task {
    position: fixed;
    bottom: 1.6rem;
    right: 1.6rem;
  }
}
</style>
