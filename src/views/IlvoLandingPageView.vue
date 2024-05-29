<script setup lang="ts">
import IlvoButton from "../components/atoms/IlvoButton.vue";

const register = () => {
  console.log("Register button clicked");
};

const login = () => {
  console.log("Login button clicked");
};
</script>

<template>
  <section id="landing-page">
    <div class="upper">
      <h1>{{ $t("landingPage.title") }}</h1>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/">Login</RouterLink>
    </div>
    <div class="landing-actions">
      <IlvoButton @button-clicked="register">{{
        $t("landingPage.registerButton")
      }}</IlvoButton>
      <IlvoButton @button-clicked="login">{{
        $t("landingPage.loginButton")
      }}</IlvoButton>
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
  padding: 2rem;

  .upper,
  .landing-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
