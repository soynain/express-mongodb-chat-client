<style scoped>

.suggestions-block-helper {
    position: absolute;
    z-index: 90000;
    top: 2.85rem;
    right: 0;
    width: 50%;
    overflow-y: auto;
    height: 15rem;
}

.suggestion-name {
    border: 1px solid black;
    padding: 2px;
    width: 100%;
    height: 15%;
}

@media (max-width:800px) {
    
    .search-main-container {
        width: 100% !important;
    }

    .suggestions-block-helper {
        position: absolute;
        z-index: 90000;
        top: 5.45rem !important;
        right: 0;
        left: 0;
        width: 100% !important;
        overflow-y: auto;
        height: 15rem;
    }

    .suggestion-name {
        padding: 2px;
        width: 100%;
        height: 15%;
    }
}

</style>
<template>
    <div class="search-main-container d-flex flex-column w-50">
        <div class="search-users-container d-flex flex-row w-100">
            <div class="suggestions-container w-100 d-flex flex-column">
                <input type="text" class="form-control w-100" placeholder="Introduce el nombre de usuario...">
                <div class="suggestions-block-helper d-flex flex-column">
                    <div class="suggestion-name">asdasda</div>
                </div>
            </div>
            <input type="button" class="btn btn-primary" value="Buscar usuario">
        </div>
    </div>
</template>