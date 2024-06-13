<script setup lang="ts">
import { computed } from "vue";
import { useAdminStore } from "../../stores/admin";
import { useUserStore } from "../../stores/user";
import IlvoRouterLink from "../atoms/IlvoRouterLink.vue";
import {
  buttonStyleValues,
  buttonTypes,
  linkTypes,
} from "../../models/property.enum";
import IlvoButton from "../atoms/IlvoButton.vue";

defineProps<{
  card_type: "user" | "category";
}>();

const admin_store = useAdminStore();
const user_store = useUserStore();

const totalCategories = computed(() => {
  let count = 0;
  if (user_store.categories) {
    count += user_store.categories.length;
    user_store.categories.forEach((category) => {
      count += category.sub_categories.length;
    });
  }
  return count;
});

const totalSubCategories = computed(() => {
  let count = 0;
  if (user_store.categories) {
    user_store.categories.forEach((category) => {
      count += category.sub_categories.length;
    });
  }
  return count;
});

const usersToday = computed(() => {
  const total = admin_store.allUsers?.filter(
    (user) =>
      new Date(user.createdAt).getDate() === new Date().getDate() &&
      new Date(user.createdAt).getMonth() === new Date().getMonth() &&
      new Date(user.createdAt).getFullYear() === new Date().getFullYear()
  ).length;

  if (!total || total === 0) {
    return 0;
  } else if (total < 0) {
    return `-${total}`;
  } else {
    return `+${total}`;
  }
});

const getLengthForRole = (role: string) => {
  return admin_store.allUsers?.filter((user) => user.role === role).length;
};
</script>
<template>
  <template v-if="card_type === 'user'">
    <div class="wrapper" v-if="card_type === 'user'">
      <h3
        v-html="
          $t('dashboard.admin.users.current', {
            current: admin_store.allUsers?.length,
          })
        "
      ></h3>
      <div class="info-part">
        <p
          class="small bold"
          v-html="
            $t('dashboard.admin.users.default', {
              users: getLengthForRole('user'),
            })
          "
        ></p>
        <p
          class="small bold"
          v-html="
            $t('dashboard.admin.users.admin', {
              admins: getLengthForRole('admin'),
            })
          "
        ></p>
      </div>
      <h3
        v-html="$t('dashboard.admin.users.today', { today: usersToday })"
      ></h3>
    </div>
    <IlvoRouterLink
      :to="{ name: 'createUser' }"
      :type="linkTypes.BUTTON"
      :style="buttonStyleValues.PRIMARY"
      class="full-width center"
      >{{ $t("dashboard.admin.users.newUser") }}</IlvoRouterLink
    >
    <IlvoButton
      :type="buttonTypes.TEXT"
      :style="buttonStyleValues.SECONDARY"
      @button-clicked="async () => admin_store.downloadUsersAsCSV()"
      >{{ $t("dashboard.admin.users.download") }}</IlvoButton
    >
  </template>
  <template v-if="card_type === 'category'">
    <div class="wrapper">
      <h3
        v-html="
          $t('dashboard.admin.categories.total', { total: totalCategories })
        "
      ></h3>
      <div class="info-part">
        <p
          class="small bold"
          v-html="
            $t('dashboard.admin.categories.main', {
              main: user_store.categories?.length,
            })
          "
        ></p>
        <p
          class="small bold"
          v-html="
            $t('dashboard.admin.categories.sub', { sub: totalSubCategories })
          "
        ></p>
      </div>
    </div>
    <IlvoRouterLink
      :to="{ name: 'createCategory' }"
      :type="linkTypes.BUTTON"
      :style="buttonStyleValues.PRIMARY"
      class="full-width center"
      >{{ $t("dashboard.admin.categories.newCategory") }}</IlvoRouterLink
    >
  </template>
</template>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  .info-part {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-left: 2.4rem;
    padding-left: 0.8rem;
    border-left: 1px dotted var(--primary-black);
  }
}
</style>
