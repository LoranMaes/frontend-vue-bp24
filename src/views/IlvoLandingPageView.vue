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
  <IlvoButton @button-clicked="register">{{
    $t("landingPage.registerButton")
  }}</IlvoButton>
  <IlvoButton @button-clicked="login">{{
    $t("landingPage.loginButton")
  }}</IlvoButton>
</template>

<style lang="scss"></style>
