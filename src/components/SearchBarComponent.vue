<style scoped>
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
    <div class="search-main-container w-50">
        <div class="search-users-container d-flex flex-row w-100">
            <input type="text" class="form-control w-100" placeholder="Introduce el nombre de usuario...">
            <input type="button" class="btn btn-primary" value="Buscar usuario">
        </div>
    </div>
</template>