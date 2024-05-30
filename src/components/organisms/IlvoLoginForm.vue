<script setup lang="ts">
import { ref, watch } from "vue";
import {
  buttonStyleValues,
  buttonTypes,
  linkTypes,
} from "../../models/property.enum";
import IlvoButton from "../atoms/IlvoButton.vue";
import IlvoRouterLink from "../atoms/IlvoRouterLink.vue";
import IlvoInputField from "../molecules/IlvoInputField.vue";
import { isValidEmail, isValidPassword } from "../../composables/validators";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const login_form = ref({
  email: "",
  password: "",
});

const error_form = ref({
  email: false,
  password: false,
});

const loginError = ref(false);

const login = async () => {
  loginError.value = false;
  if (!isValidEmail(login_form.value.email)) {
    error_form.value.email = true;
    if (!isValidPassword(login_form.value.password)) {
      error_form.value.password = true;
    } else {
      error_form.value.password = false;
    }
    return;
  } else {
    error_form.value.email = false;
  }
  try {
    const login = await authStore.login(login_form.value);
    if (login) {
      router.push({ name: "dashboard" });
    }
  } catch (error) {
    loginError.value = true;
    console.error(error);
  }
};
</script>

<template>
  <div id="login-form">
    <h2>{{ $t("authentication.login.title") }}</h2>

    <form
      action="#"
      @submit.prevent
      method="post"
      autocomplete="on"
      @submit="login"
    >
      <div class="input-fields">
        <!-- Email -->
        <IlvoInputField
          type="text"
          :label="$t('authentication.login.email')"
          id="email"
          placeholder="jan.janssens@gmail.com"
          v-model:input="login_form.email"
          :error="error_form.email"
          :error-helper="$t('authentication.login.emailError')"
        />

        <!-- Password -->
        <IlvoInputField
          type="password"
          :label="$t('authentication.login.password')"
          id="password"
          placeholder="Azerty123"
          :helper="$t('authentication.login.passwordHint')"
          :mdi-icon="'mdiEye'"
          :icon-side="'right'"
          v-model:input="login_form.password"
          :error="error_form.password"
          :error-helper="$t('authentication.login.emailError')"
        />
        <p v-if="loginError" class="error">
          {{ $t("authentication.invalidCredentials") }}
        </p>
      </div>

      <div class="buttons-group">
        <IlvoButton
          :type="buttonTypes.TEXT"
          :style="buttonStyleValues.PRIMARY"
          :submit="true"
          >{{ $t("authentication.login.loginButton") }}</IlvoButton
        >
        <IlvoRouterLink
          :type="linkTypes.BUTTON"
          :style="buttonStyleValues.SECONDARY"
          :to="{ name: 'landingPage' }"
          class="full-width center"
          >{{ $t("authentication.goBack") }}</IlvoRouterLink
        >
      </div>
    </form>
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
  left: 0;
  padding: 6.4rem 2.4rem;
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
  box-shadow: var(--shadow-lg-top);
  animation: slideUp 0.5s ease-in-out;
  h2 {
    font-size: var(--mobile-header-1);
    margin: 0;
  }
  .buttons-group {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  &.slide-down {
    animation: slideDown 0.5s ease-in-out;
  }
  form,
  .input-fields {
    display: flex;
    flex-direction: column;
  }
  .input-fields {
    gap: 1.6rem;
  }
  form {
    gap: 3.2rem;
  }
}
</style>
