<script setup lang="ts">
import IlvoLoginForm from "../components/organisms/IlvoLoginForm.vue";
</script>

<template>
  <div id="login-form">
    <h1>{{ $t("authentication.login.title") }}</h1>
    <IlvoLoginForm />
  </div>
</template>

<style scoped lang="scss"></style>
