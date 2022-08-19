<script setup>
import { ref } from 'vue';
const linksForLoginContainer = ref(true);
</script>
<style scoped>
.nav-item {
    margin-right: 15px;
}

.navbar-brand {
    margin-left: 15px;
}

@media (max-width:800px){
    .navbar{
        display: flex !important;
        flex-direction: column !important;
    }

    .search-main-container{
        width: 100% !important;
    }
}
</style>
<template>
    <nav class="navbar navbar-light bg-light w-100 d-flex flex-row justify-content-between">
        <a class="navbar-brand" href="#">CHAT MONGO DB</a>
        <div class="links-login-container" v-if="linksForLoginContainer.value === true">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
                <li class="nav-item"><a href="" class="nav-link">Acerca de</a></li>
                <li class="nav-item"><a href="" class="nav-link">Github</a></li>
                <li class="nav-item"><a href="" class="nav-link">Linkedin</a></li>
            </ul>
        </div>
        <div class="search-main-container w-50">
            <div class="search-users-container d-flex flex-row w-100">
                <input type="text" class="form-control w-100" placeholder="Introduce el nombre de usuario...">
                <input type="button" class="btn btn-primary" value="Buscar usuario">
            </div>
        </div>
    </nav>
</template>