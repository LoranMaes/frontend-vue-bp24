<script setup lang="ts">
import IlvoRouterLink from "../components/atoms/IlvoRouterLink.vue";
import logo_timeregistration from "../assets/images/logo_timeregistration.png";
import { buttonStyleValues, linkTypes } from "../models/property.enum";
</script>

<template>
  <section id="landing-page">
    <div class="upper">
      <img :src="logo_timeregistration" alt="Logo for time registration app" />
      <h1>{{ $t("landingPage.title") }}</h1>
    </div>
    <div class="landing-actions">
      <IlvoRouterLink
        :type="linkTypes.BUTTON"
        :style="buttonStyleValues.PRIMARY"
        :rounded="true"
        :mdi-icon="'mdiChevronRight'"
        :to="{ name: 'register' }"
        :has-icon="true"
        class="full-width"
        >{{ $t("landingPage.registerButton") }}</IlvoRouterLink
      >
      <IlvoRouterLink
        :type="linkTypes.BUTTON"
        :style="buttonStyleValues.SECONDARY"
        :rounded="true"
        :mdi-icon="'mdiChevronRight'"
        :to="{ name: 'login' }"
        :has-icon="true"
        class="full-width"
        >{{ $t("landingPage.loginButton") }}</IlvoRouterLink
      >
    </div>
  </section>
</template>

<style lang="scss">
section#landing-page {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: url("../assets/images/cow-unsplash.jpg") no-repeat center center;
  background-size: cover;
  padding: 4rem 2rem;
  h1 {
    color: var(--off-white);
    margin: 0;
  }
  .upper,
  .landing-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    text-align: center;
    width: 100%;
  }
  .upper {
    gap: 3.2rem;
  }
}
</style>
