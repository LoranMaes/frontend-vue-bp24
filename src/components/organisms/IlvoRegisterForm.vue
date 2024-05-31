<script setup lang="ts">
import { computed, ref } from "vue";
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

const register_form = ref({
  email: "",
  password: "",
  repeat_password: "",
  firstName: "",
  lastName: "",
});

const error_form = ref({
  email: false,
  password: false,
  repeat_password: false,
  firstName: false,
  lastName: false,
});

const registerError = ref(false);

const passwordsMatch = computed(() => {
  return register_form.value.password === register_form.value.repeat_password;
});

const register = async () => {
  registerError.value = false;
  if (!isValidEmail(register_form.value.email)) {
    error_form.value.email = true;
  } else {
    error_form.value.email = false;
  }
  if (!isValidPassword(register_form.value.password)) {
    error_form.value.password = true;
  } else {
    error_form.value.password = false;
  }
  if (!passwordsMatch.value) {
    error_form.value.repeat_password = true;
  } else {
    error_form.value.repeat_password = false;
  }
  if (
    !register_form.value.firstName ||
    register_form.value.firstName.length < 2
  ) {
    error_form.value.firstName = true;
  } else {
    error_form.value.firstName = false;
  }
  if (
    !register_form.value.lastName ||
    register_form.value.lastName.length < 2
  ) {
    error_form.value.lastName = true;
  } else {
    error_form.value.lastName = false;
  }
  if (
    error_form.value.email ||
    error_form.value.password ||
    error_form.value.repeat_password ||
    error_form.value.firstName ||
    error_form.value.lastName
  ) {
    return;
  }

  //TODO: Put it in local storage for different form
  try {
    await authStore.register(register_form.value);
    return router.push({ name: "dashboard" });
  } catch (error) {
    registerError.value = true;
    console.error(error);
  }
};
</script>

<template>
  <form action="#" method="post" autocomplete="on" @submit.prevent="register">
    <div class="input-fields">
      <!-- First Name -->
      <IlvoInputField
        type="text"
        :label="$t('authentication.registerCompletion.firstName')"
        id="first_name"
        placeholder="Jan"
        v-model:input="register_form.firstName"
        :error="error_form.firstName"
        :error-helper="$t('authentication.registerCompletion.firstNameError')"
      />

      <!-- Last Name -->
      <IlvoInputField
        type="text"
        :label="$t('authentication.registerCompletion.lastName')"
        id="last_name"
        placeholder="Janssens"
        v-model:input="register_form.lastName"
        :error="error_form.lastName"
        :error-helper="$t('authentication.registerCompletion.lastNameError')"
      />

      <!-- Email -->
      <IlvoInputField
        type="email"
        :label="$t('authentication.register.email')"
        id="email"
        placeholder="jan.janssens@gmail.com"
        v-model:input="register_form.email"
        :error="error_form.email"
        :error-helper="$t('authentication.register.emailError')"
      />

      <!-- Password -->
      <IlvoInputField
        type="password"
        :label="$t('authentication.register.password')"
        id="password"
        placeholder="Azerty123"
        :helper="$t('authentication.register.passwordHint')"
        :mdi-icon="'mdiEye'"
        :icon-side="'right'"
        v-model:input="register_form.password"
        :error="error_form.password"
        :error-helper="$t('authentication.register.passwordError')"
      />
      <!-- Repeat Password -->
      <IlvoInputField
        type="password"
        :label="$t('authentication.register.passwordConfirmation')"
        id="repeat_password"
        placeholder="Azerty123"
        :mdi-icon="'mdiEye'"
        :icon-side="'right'"
        v-model:input="register_form.repeat_password"
        :error="error_form.repeat_password"
        :error-helper="$t('authentication.register.repeatPasswordError')"
      />
      <p v-if="registerError" class="error">
        {{ $t("authentication.invalidCredentials") }}
      </p>
    </div>

    <div class="buttons-group">
      <IlvoButton
        :type="buttonTypes.TEXT"
        :style="buttonStyleValues.PRIMARY"
        :submit="true"
        :disabled="!passwordsMatch"
        >{{ $t("authentication.register.registerButton") }}</IlvoButton
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
</template>

<style scoped langs="scss">
h2 {
  font-size: var(--mobile-header-1);
  margin: 0;
}
.buttons-group {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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
</style>
