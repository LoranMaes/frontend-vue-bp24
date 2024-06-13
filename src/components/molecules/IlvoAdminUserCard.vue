<script setup lang="ts">
import { mdiTrashCanOutline } from "@mdi/js";
import IlvoInputField from "./IlvoInputField.vue";

defineProps<{
  user: any;
  disabled?: boolean;
}>();
</script>
<template>
  <div class="user-card">
    <div class="top">
      <div class="left">
        <p class="bold">{{ user.firstName }} {{ user.lastName }}</p>
        <p class="small">{{ user.email }}</p>
      </div>
      <button>
        <svg viewBox="0 0 24 24" height="20" fill="#FAFAFA">
          <path :d="mdiTrashCanOutline"></path>
        </svg>
      </button>
    </div>
    <div class="bottom">
      <form action="#">
        <IlvoInputField
          type="select"
          :id="`role-user-${user.id}`"
          :values="['admin', 'user']"
          v-model:input="user.role"
          :selected="user.role === 'admin' ? 0 : 1"
          :label="$t('dashboard.admin.allUsers.roleUserCard')"
          placeholder="Select a role"
          :disabled
        />
      </form>
      <p
        class="bold"
        v-html="
          $t('dashboard.admin.allUsers.createdAt', {
            date: new Date(user.createdAt).toLocaleDateString('nl'),
          })
        "
      ></p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.user-card {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
  border-radius: 0.8rem;
  box-shadow: var(--shadow-md);
  background-color: var(--off-white);
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.6rem;
    .left {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    button {
      border: none;
      background-color: var(--state-error);
      cursor: pointer;
      border-radius: 0.8rem;
      padding: 0.8rem;
    }
  }
  .bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.6rem;
  }
}
</style>
