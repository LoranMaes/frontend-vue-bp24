<script setup lang="ts"></script>

<template>
  <section id="dashboard">
    <h1>{{ $t("dashboard.title", { name: "Loran" }) }}</h1>
    <router-link :to="{ name: 'landingPage' }">Login</router-link>
  </section>
</template>

<style lang="scss"></style>
