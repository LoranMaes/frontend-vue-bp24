<script setup lang="ts">
import IlvoLoginForm from "../components/organisms/IlvoLoginForm.vue";
</script>

<template>
  <div id="login-form">
    <h2>{{ $t("authentication.login.title") }}</h2>
    <IlvoLoginForm />
  </div>
</template>

<style scoped lang="scss">
#login-form {
  background-color: var(--primary-white);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: fixed;
  gap: 3.2rem;
  width: 100%;
  bottom: 0;
  max-width: 64rem;
  padding: 6.4rem 2.4rem;
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
  box-shadow: var(--shadow-lg-top);
  animation: slideUp 0.5s ease-in-out;
  &.slide-down {
    animation: slideDown 0.5s ease-in-out;
  }
}
</style>
