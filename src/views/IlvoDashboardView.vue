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
import IlvoDashboardStatistic from "../components/atoms/IlvoDashboardStatistic.vue";
import { useAdminStore } from "../stores/admin";
import IlvoLoader from "../components/atoms/IlvoLoader.vue";
import IlvoAdminDashboardCard from "../components/molecules/IlvoAdminDashboardCard.vue";

const auth_store = useAuthStore();
const user_store = useUserStore();
const timer_store = useTimerStore();
const admin_store = useAdminStore();

const user = auth_store.user;

const router = useRouter();
const createNewTask = () => {
  return router.push({ name: "timer" });
};

const limitedTasks = computed(() => {
  switch (auth_store.user?.role) {
    case "user":
      return user_store.tasks?.slice(0, 3);
    case "admin":
      return admin_store.tasks?.slice(0, 3);
  }
});

onMounted(async () => {
  try {
    if (auth_store.isAuthenticated) {
      await user_store.initializeCategories();
      switch (auth_store.user?.role) {
        case "user":
          await user_store.initializeTasks();
          break;
        case "admin":
          await admin_store.initializeUsers();
          await admin_store.initializeTasks();
          break;
      }
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <section id="dashboard" :class="[{ 'timer-running': timer_store.isRunning }]">
    <h1>{{ $t("dashboard.title", { name: user?.firstName }) }}</h1>

    <template v-if="auth_store.user?.role === 'admin'">
      <div id="admin_banner">
        <p class="bold">{{ $t("dashboard.admin.banner") }}</p>
      </div>
      <IlvoCard
        :title="$t('dashboard.admin.tasks.title')"
        router-link="calendar"
      >
        <p
          class="empty"
          v-if="
            (!admin_store.tasks || !admin_store.tasks.length) &&
            !admin_store.getLoading
          "
        >
          {{ $t("dashboard.tasks.nothing") }}
        </p>
        <div class="cards" v-else>
          <IlvoTaskCard
            v-for="(task, index) in limitedTasks"
            :key="index"
            :task="task"
            :name="task.user ? task.user : undefined"
          />
        </div>
      </IlvoCard>
      <IlvoCard
        :title="$t('dashboard.admin.users.title')"
        router-link="allUsers"
      >
        <IlvoAdminDashboardCard card_type="user" />
      </IlvoCard>
      <IlvoCard
        :title="$t('dashboard.admin.categories.title')"
        router-link="allCategories"
      >
        <IlvoAdminDashboardCard card_type="category" />
      </IlvoCard>
      <IlvoCard
        :title="$t('dashboard.admin.statistics.title')"
        router-link="statistics"
      ></IlvoCard>
    </template>
    <template v-else>
      <IlvoCard :title="$t('dashboard.tasks.title')" router-link="calendar">
        <!-- Add tasks here -->
        <IlvoLoader v-if="user_store.getLoading" />
        <p
          class="empty"
          v-if="
            (!user_store.tasks || !user_store.tasks.length) &&
            !user_store.getLoading
          "
        >
          {{ $t("dashboard.tasks.nothing") }}
        </p>
        <div class="cards" v-else>
          <IlvoTaskCard
            v-for="(task, index) in limitedTasks"
            :key="index"
            :task="task"
            :name="undefined"
          />
        </div>
      </IlvoCard>
      <IlvoCard
        :title="$t('dashboard.statistics.title')"
        router-link="statistics"
      >
        <IlvoLoader v-if="user_store.getLoading" />

        <p
          class="empty"
          v-if="
            (!user_store.tasks || !user_store.tasks.length) &&
            !user_store.getLoading
          "
        >
          {{ $t("dashboard.statistics.nothing") }}
        </p>
        <IlvoDashboardStatistic v-else />
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
    </template>
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
  .cards {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  #admin_banner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-green);
    border-radius: 999px;
    padding: 0.8rem 1.6rem;
    box-sizing: border-box;
    box-shadow: 0 0 1.6rem 0 #1b9971;
    p {
      color: var(--primary-white);
    }
  }
}
</style>
