<script setup>
import LoginFormInputsComponent from './LoginFormInputsComponent.vue';
</script>
<style scoped>
#cardLogin {
  width: 45rem;
  height: 17rem;
  border: 1px solid gray;
  box-shadow: 5px 5px 15px 2px #888888;
}
</style>
<template>
  <div class="card" id="cardLogin">
    <LoginFormInputsComponent/>
  </div>
</template>