<script setup>
import LoginFormInputsComponent from './LoginFormInputsComponent.vue';
import { ref, inject, onMounted, onBeforeMount } from 'vue';
import ChatBoxComponent from './ChatBoxComponent.vue';
import UserProfileComponent from './UserProfileComponent.vue';
const loginInputsComponentState = inject('loginInputsComponentStateParent');
const chatBoxState = ref(false);

function getLoginInputsComponentState() {
  return new Boolean(loginInputsComponentState.value);
}

function getChatBoxState() {
  return new Boolean(chatBoxState.value);
}
</script>
<template>
  <div class="card">
    <LoginFormInputsComponent v-if="getLoginInputsComponentState() == true" />
    <ChatBoxComponent v-else-if="getChatBoxState() == true" />
    <UserProfileComponent v-else/>
  </div>
</template>