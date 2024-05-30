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

const route = useRoute();
watch(
  () => route.path,
  () => {
    hamburgerOpen.value = false;
  }
);
</script>

<template>
  <header>
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
    <h1 v-else>
      {{ $t(`menu.${route.path.substring(1, route.path.length)}`) }}
    </h1>
    <IlvoButton
      :style="buttonStyleValues.PRIMARY"
      :type="buttonTypes.ICON"
      :mdi-icon="'mdiBellOutline'"
      :size="buttonSizes.SMALL"
    />
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem 2.4rem 0 2.4rem;
}
</style>
