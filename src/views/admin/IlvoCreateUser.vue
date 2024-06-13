<script setup lang="ts">
import { computed, ref } from "vue";
import IlvoInputField from "../../components/molecules/IlvoInputField.vue";
import IlvoButton from "../../components/atoms/IlvoButton.vue";
import { buttonStyleValues, buttonTypes } from "../../models/property.enum";
import { isValidEmail, isValidPassword } from "../../composables/validators";
import { useAdminStore } from "../../stores/admin";
import { useRouter } from "vue-router";

const admin_store = useAdminStore();

const register_form = ref<{
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: Blob;
  password: string;
  repeatPassword: string;
  //   role: "admin" | "user";
}>({
  email: "",
  password: "",
  repeatPassword: "",
  firstName: "",
  lastName: "",
  //   role: "user",
});

const error_form = ref<{
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  profilePicture: boolean;
  repeatPassword: boolean;
  //   role: boolean;
}>({
  firstName: false,
  lastName: false,
  email: false,
  profilePicture: false,
  password: false,
  repeatPassword: false,
  //   role: false,
});

const registerError = ref(false);

const passwordsMatch = computed(() => {
  return register_form.value.password === register_form.value.repeatPassword;
});

const router = useRouter();
const handleForm = async () => {
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
    error_form.value.repeatPassword = true;
  } else {
    error_form.value.repeatPassword = false;
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
  if (register_form.value.profilePicture) {
    if (
      !register_form.value.profilePicture.type.includes("image") ||
      register_form.value.profilePicture.size > 2000000
    ) {
      error_form.value.profilePicture = true;
    } else {
      error_form.value.profilePicture = false;
    }
  }
  if (
    error_form.value.email ||
    error_form.value.password ||
    error_form.value.repeatPassword ||
    error_form.value.firstName ||
    error_form.value.lastName ||
    error_form.value.profilePicture
  ) {
    return;
  }
  try {
    const register = await admin_store.createUser(register_form.value);
    if (register) {
      return router.push({ name: "allUsers" });
    }
  } catch (error) {
    registerError.value = true;
    console.error(error);
  }
};

const uploadFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    register_form.value.profilePicture = target.files[0];
  }
};
</script>

<template>
  <div class="container">
    <form action="#" @submit.prevent="handleForm">
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

      <!-- Profile Picture -->
      <div :class="['input-field', { error: error_form.profilePicture }]">
        <label for="profile_picture">{{
          $t("authentication.register.profilePicture")
        }}</label>
        <input
          type="file"
          name="profile_picture"
          id="profile_picture"
          accept="image/*"
          @change="uploadFile"
        />
        <p class="small error" v-if="error_form.profilePicture">
          {{
            $t("authentication.register.profilePictureError", {
              size: register_form.profilePicture?.size
                ? (register_form.profilePicture.size / 1000000).toFixed(2) +
                  "MB"
                : "/",
            })
          }}
        </p>
      </div>

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
        v-model:input="register_form.repeatPassword"
        :error="error_form.repeatPassword"
        :error-helper="$t('authentication.register.repeatPasswordError')"
      />

      <!-- Role Selector -->
      <!-- <IlvoInputField
        type="select"
        id="role-user"
        :values="['admin', 'user']"
        v-model:input="register_form.role"
        :selected="register_form.role === 'admin' ? 0 : 1"
        :label="$t('dashboard.admin.allUsers.roleUserCard')"
        placeholder="Select a role"
      /> -->

      <p v-if="registerError" class="error">
        {{ $t("authentication.invalidCredentials") }}
      </p>

      <IlvoButton
        :submit="true"
        :type="buttonTypes.TEXT"
        :style="buttonStyleValues.PRIMARY"
        :label="$t('authentication.register.submit')"
        >{{ $t("authentication.register.registerButton") }}</IlvoButton
      >
    </form>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2.4rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    .input-field {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      width: 100%;
      &.error {
        input {
          border-color: var(--state-error);
        }
      }
    }
  }
}
</style>
