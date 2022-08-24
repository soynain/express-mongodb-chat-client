<script setup>
import CardComponent from './components/card-component.vue';
import { ref, provide, onMounted } from 'vue';
import Dashboard from './views/Dashboard.vue';
import Profile from './views/Profile.vue';
const updateMainModules=ref(0);
const loginModuleState = ref(true);
const dashboardModuleState = ref(false);
//const profileModuleState = ref(false);


provide('dashboardModuleState',dashboardModuleState);
provide('loginModuleState',loginModuleState);
provide('updateMainModules',updateMainModules);



function getDashBoardModuleState() {
  return new Boolean(dashboardModuleState.value);
}

function getLoginModuleState() {
  return new Boolean(loginModuleState.value);
}

</script>
<style scoped>
main {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
<template>
  <main :key="updateMainModules">
    <RouterView></RouterView>
  </main>
</template>
