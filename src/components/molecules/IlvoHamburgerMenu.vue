<script setup lang="ts">
import { defineProps } from "vue";
import IlvoButton from "../atoms/IlvoButton.vue";
import {
  buttonSizes,
  buttonStyleValues,
  buttonTypes,
} from "../../models/property.enum";
import { useAuthStore } from "../../stores/auth";
import {
  mdiAccountMultiplePlusOutline,
  mdiCalendarOutline,
  mdiChartBar,
  mdiGroup,
  mdiShapeOutline,
  mdiShapePlusOutline,
  mdiTimerOutline,
  mdiViewDashboardOutline,
} from "@mdi/js";
import { useRouter } from "vue-router";

defineEmits(["closeHamburgerMenu"]);
const props = defineProps<{
  hamburgerOpen: boolean;
}>();

const router = useRouter();
const auth_store = useAuthStore();
const user = auth_store.user;

const handleLogout = async () => {
  await auth_store.logout();
  return router.push({ name: "landingPage" });
};
</script>

<template>
  <div :class="['hamburger-menu', { open: hamburgerOpen }]">
    <IlvoButton
      :mdi-icon="'mdiClose'"
      :type="buttonTypes.ICON"
      :style="buttonStyleValues.PRIMARY"
      :size="buttonSizes.SMALL"
      @button-clicked="$emit('closeHamburgerMenu')"
      class="close-button"
    ></IlvoButton>
    <div class="user-information">
      <!-- Add source of API here if user has profile picture -->
      <img
        :src="`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${user?.firstName}`"
        :alt="`Profile picture for ${user?.firstName}`"
      />
      <h2>{{ `${user?.firstName} ${user?.lastName}` }}</h2>
      <p>{{ user?.email }}</p>
    </div>
    <div class="links">
      <RouterLink :to="{ name: 'dashboard' }" class="link">
        <svg>
          <path :d="mdiViewDashboardOutline"></path>
        </svg>
        {{ $t("menu.dashboard") }}
      </RouterLink>
      <RouterLink :to="{ name: 'calendar' }" class="link">
        <svg>
          <path :d="mdiCalendarOutline"></path>
        </svg>
        {{ $t("menu.calendar") }}
      </RouterLink>

      <template v-if="user?.role === 'user'">
        <RouterLink :to="{ name: 'timer' }" class="link">
          <svg>
            <path :d="mdiTimerOutline"></path>
          </svg>
          {{ $t("menu.timer") }}
        </RouterLink>
      </template>

      <template v-if="user?.role === 'admin'">
        <RouterLink :to="{ name: 'allUsers' }" class="link">
          <svg>
            <path :d="mdiGroup"></path>
          </svg>
          {{ $t("menu.all-users") }}
        </RouterLink>
        <RouterLink :to="{ name: 'createUser' }" class="link">
          <svg>
            <path :d="mdiAccountMultiplePlusOutline"></path>
          </svg>
          {{ $t("menu.create-user") }}
        </RouterLink>
        <RouterLink :to="{ name: 'allCategories' }" class="link">
          <svg>
            <path :d="mdiShapeOutline"></path>
          </svg>
          {{ $t("menu.all-users") }}
        </RouterLink>
        <RouterLink :to="{ name: 'createCategory' }" class="link">
          <svg>
            <path :d="mdiShapePlusOutline"></path>
          </svg>
          {{ $t("menu.create-category") }}
        </RouterLink>
      </template>

      <RouterLink :to="{ name: 'statistics' }" class="link">
        <svg>
          <path :d="mdiChartBar"></path>
        </svg>
        {{ $t("menu.statistics") }}
      </RouterLink>
    </div>
    <IlvoButton
      :type="buttonTypes.TEXT"
      :style="buttonStyleValues.RED"
      @button-clicked="handleLogout"
    >
      {{ $t("authentication.logout") }}
    </IlvoButton>
  </div>
</template>

<style scoped lang="scss">
.hamburger-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  background-color: var(--primary-white);
  border-radius: 0 3.2rem 3.2rem 0;
  padding: 6.4rem 2.4rem 4.8rem 2.4rem;
  box-sizing: border-box;
  box-shadow: var(--shadow-lg);
  justify-content: space-between;
  transform: translateX(-100%);
  transition: transform 0.5s ease-in-out;
  &.open {
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }
  //   &::before {
  //     content: "";
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     background-color: rgba(0, 0, 0, 0.5);
  //     z-index: -1;
  //   }
  .close-button {
    position: absolute;
    right: 0.8rem;
    top: 0.8rem;
  }
  .user-information {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 0.8rem;
    h2,
    p {
      margin: 0;
    }
    img {
      width: 9.6rem;
      height: 9.6rem;
      border-radius: 50%;
      background-color: var(--gray-3);
    }
  }
  .links {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    .link {
      display: flex;
      flex-direction: row;
      gap: 1.6rem;
      width: fit-content;
      align-items: center;
      svg {
        width: 3.2rem;
        height: 2.4rem;
        color: var(--primary-black);
      }
      &.router-link-exact-active {
        background-color: var(--primary-color);
        padding: 0.8rem 1.6rem;
        border-radius: 999px;
        color: var(--primary-white);
        pointer-events: none;
        text-decoration: none;
        svg {
          fill: var(--primary-white);
        }
      }
    }
  }
}
</style>
