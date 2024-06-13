<script setup lang="ts">
import { computed, ref } from "vue";
import IlvoInputField from "../../components/molecules/IlvoInputField.vue";
import { useAdminStore } from "../../stores/admin";
import IlvoAdminUserCard from "../../components/molecules/IlvoAdminUserCard.vue";
import { useAuthStore } from "../../stores/auth";
import IlvoInputSelect from "../../components/atoms/IlvoInputSelect.vue";

const filter_options = [
  "most_recent",
  "oldest",
  "alphabetical",
  "reverse_alphabetical",
  "role",
];
const filter_form = ref<{
  search: string;
  filter: (typeof filter_options)[number];
}>({
  search: "",
  filter: "most_recent",
});

const admin_store = useAdminStore();
const auth_store = useAuthStore();
const all_users = computed(() => {
  if (!admin_store.allUsers) return [];
  return admin_store.allUsers
    .filter(
      (user) =>
        user.firstName
          .toLowerCase()
          .includes(filter_form.value.search.toLowerCase()) ||
        user.lastName
          .toLowerCase()
          .includes(filter_form.value.search.toLowerCase())
    )
    .sort((a: any, b: any) => {
      switch (filter_options[filter_form.value.filter]) {
        case "most_recent":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "alphabetical":
          return (
            a.firstName.localeCompare(b.firstName) ||
            a.lastName.localeCompare(b.lastName)
          );
        case "reverse_alphabetical":
          return (
            b.firstName.localeCompare(a.firstName) ||
            a.lastName.localeCompare(b.lastName)
          );
        case "role":
          return a.role === "admin" ? 1 : -1;
      }
    });
});
</script>

<template>
  <div class="container">
    <form action="#" @submit.prevent>
      <IlvoInputField
        type="text"
        id="search"
        :placeholder="$t('dashboard.admin.allUsers.searchPlaceholder')"
        :label="$t('dashboard.admin.allUsers.search')"
        v-model:input="filter_form.search"
      />
      <IlvoInputField
        type="select"
        id="filter-users"
        :values="
          filter_options.map((option) =>
            $t(`dashboard.admin.allUsers.filterOptions.${option}`)
          )
        "
        v-model:input="filter_form.filter"
        :selected="filter_options.indexOf(filter_form.filter)"
        :label="$t('dashboard.admin.allUsers.filter')"
        placeholder="Select a filter optionv"
      />
    </form>

    <div class="user-list">
      <p v-if="!all_users.length">
        {{ $t("dashboard.admin.allUsers.noUsers") }}
      </p>
      <IlvoAdminUserCard
        v-else
        v-for="user in all_users"
        :key="user.id"
        :user="user"
        :disabled="user.id === auth_store.user?.id"
      />
    </div>
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
  }
  .user-list {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
}
</style>
