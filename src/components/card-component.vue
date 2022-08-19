<script setup>
import LoginFormInputsComponent from './LoginFormInputsComponent.vue';
import { ref, inject, onMounted, onBeforeMount } from 'vue';
import ChatBoxComponent from './ChatBoxComponent.vue';
const loginInputsComponentState = inject('loginInputsComponentStateParent');
//console.log(loginInputsComponentState.value)
</script>
<template>
  <div class="card">
    <LoginFormInputsComponent v-if="loginInputsComponentState.value" />
    <ChatBoxComponent/>
  </div>
</template>