<script setup>
import { ref } from 'vue';
import NavBarLinksContComponent from './NavBarLinksContComponent.vue';
import SearchBarComponent from './SearchBarComponent.vue';
const linksForLoginContainer = ref(true);

function getLinksForLoginContainer(){
    return new Boolean(linksForLoginContainer.value);
}
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
        <NavBarLinksContComponent v-if="getLinksForLoginContainer()==true"/>
        <SearchBarComponent v-else/>
    </nav>
</template>