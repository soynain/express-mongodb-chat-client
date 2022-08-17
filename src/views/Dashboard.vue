<script setup>
import CardComponent from '../components/card-component.vue';
</script>
<style scoped>
#chats-card {
    width: 52rem;
    height: 37rem;
    border: 1px solid gray;
}
</style>
<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
        <h3>Aquí puedes buscar a un usuario en particular y ver su perfil</h3>
        <div class="search-container mb-3 d-flex flex-row align-items-center w-50">
            <input type="text" class="form-control" placeholder="Introduce el nombre de usuario">
            <input type="button" class="btn btn-primary" value="Buscar usuario">
        </div>
        <CardComponent id="chats-card"/>
    </div>
</template>