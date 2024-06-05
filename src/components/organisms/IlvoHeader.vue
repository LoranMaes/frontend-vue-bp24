<script setup lang="ts">
import { ref, watch } from "vue";
import {
  buttonSizes,
  buttonStyleValues,
  buttonTypes,
} from "../../models/property.enum";
import IlvoButton from "../atoms/IlvoButton.vue";
import IlvoHamburgerMenu from "../molecules/IlvoHamburgerMenu.vue";
import { useRoute } from "vue-router";
const hamburgerOpen = ref(false);
const timerCategory = ref("");

const route = useRoute();
watch(
  () => route.path,
  () => {
    hamburgerOpen.value = false;
    timerCategory.value = localStorage.getItem("newTimerCategory") || "";
  }
);

watch(hamburgerOpen, () => {
  if (hamburgerOpen.value) {
    document.body.style.overflow = "hidden";
    document.body.ariaExpanded = "true";
  } else {
    document.body.style.overflow = "auto";
    document.body.ariaExpanded = "false";
  }
});
</script>

<template>
  <header :class="[{ space: route.path === '/dashboard' }]">
    <IlvoButton
      :style="buttonStyleValues.PRIMARY"
      :type="buttonTypes.ICON"
      :mdi-icon="'mdiMenu'"
      :size="buttonSizes.SMALL"
      @button-clicked="hamburgerOpen = true"
      :aria-expanded="hamburgerOpen"
    />
    <IlvoHamburgerMenu
      :hamburgerOpen="hamburgerOpen"
      @close-hamburger-menu="hamburgerOpen = false"
    />
    <p class="bold" v-if="route.path === '/dashboard'">
      {{
        new Date().toLocaleDateString("nl", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      }}
    </p>
    <h1 v-else-if="route.path === '/timer'">
      {{
        timerCategory
          ? $t("timer.second_step.title")
          : $t("timer.first_step.title")
      }}
    </h1>
    <h1 v-else>
      {{ $t(`menu.${route.path.substring(1, route.path.length)}`) }}
    </h1>
    <IlvoButton
      :style="buttonStyleValues.PRIMARY"
      :type="buttonTypes.ICON"
      :mdi-icon="'mdiBellOutline'"
      :size="buttonSizes.SMALL"
      v-if="route.path === '/dashboard'"
    />
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 2.4rem 2.4rem 0 2.4rem;
  gap: 1.6rem;
  &.space {
    justify-content: space-between;
  }
}
</style>
