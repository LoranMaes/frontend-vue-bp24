<script setup lang="ts">
import IlvoButton from "../atoms/IlvoButton.vue";
import { useTimerStore } from "../../stores/timer";
import { buttonStyleValues, buttonTypes } from "../../models/property.enum";

const timer_store = useTimerStore();
</script>

<template>
  <div class="timer">
    <h2>{{ timer_store.formattedTimer }}</h2>
    <IlvoButton
      :style="
        timer_store.isRunning
          ? buttonStyleValues.RED
          : buttonStyleValues.SECONDARY
      "
      :type="buttonTypes.TEXT"
      @button-clicked="() => timer_store.toggleTimer()"
      >{{
        timer_store.isRunning
          ? $t("timer.input.button.stop")
          : $t("timer.input.button.start")
      }}</IlvoButton
    >
  </div>
</template>

<style lang="scss" scoped>
.timer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
