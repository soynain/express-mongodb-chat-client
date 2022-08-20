<script setup>
import CardComponent from './components/card-component.vue';
import { ref, provide, onMounted } from 'vue';
import Dashboard from './views/Dashboard.vue';
import Profile from './views/Profile.vue';
const loginModuleState = ref(false);
const dashboardModuleState = ref(false);
const profileModuleState = ref(true);
const loginInputsComponentStateParent = ref(false);

provide('loginInputsComponentStateParent', loginInputsComponentStateParent);

function getProfileModuleStateValue() {
  return new Boolean(profileModuleState.value);
}

function getDashBoardModuleState() {
  return new Boolean(dashboardModuleState.value);
}

function getLoginModuleState() {
  return new Boolean(loginModuleState.value);
}
//import { useQuery } from '@vue/apollo-composable'
//import gql from 'graphql-tag'
//import { watch } from 'vue';
/*import PruebaGraphql from './components/PruebaGraphql.vue';
const { result, loading } = useQuery(gql`
  query encontrarUsuario ($id:ID="62f14a314e227155d752dd27"){
    findUsuario(_id:$id) {
      nombres
      apellido_paterno
      apellido_materno
      fecha_nac
}}`);*/
const cambiarVisibilidadModuloLogin = () => {
  return loginModuleState.value === true ? loginModuleState.value = false : loginModuleState.value;
}
</script>
<style scoped>
main {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#cardLogin {
  width: 45rem;
  height: 17rem;
  border: 1px solid gray;
  box-shadow: 5px 5px 15px 2px #888888;
}
</style>
<template>
  <main>
    <CardComponent v-if="getLoginModuleState() == true" id="cardLogin" />
    <Dashboard v-else-if="getDashBoardModuleState() == true" />
    <Profile v-else/>
  </main>
</template>
