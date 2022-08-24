
<style scoped>

</style>
<template>
    <div class="profile-box w-100 h-100 d-flex flex-column">
        <div class="profile-basic-data d-flex flex-row w-100">
            <div class="profile-picture-container h-100 d-flex justify-content-center align-items-center">
                <div class="circle-cont-aux h-100 w-100 d-flex justify-content-center align-items-center">
                    <img src="../assets/vfesasd.jfif" alt="profile-image" class="profile-img w-100 h-100">
                </div>
            </div>
            <div class="profile-name h-100 d-flex flex-column align-items-center justify-content-center">
                <header>Nombre completo</header>
                <b id="nombre-txt">Moisés Nain Soto Guzmán</b>
            </div>
        </div>
        <div class="friends-container d-flex flex-column">
            <header class="friends-count"><b id="aux-margin">Amigos: 24</b></header>
            <div class="friends-list d-flex flex-column">
                <div class="friend-block d-flex flex-row align-items-center justify-content-between p-1 w-100 h-auto">
                    <span>Lilia Vazquez Cusca</span>
                    <button class="btn btn-primary">Añadir</button>
                </div>
            </div>
            <div class="buttons-actions w-100 d-flex flex-row justify-content-between">
                <button class="btn btn-danger w-50">Enviar mensaje</button>
                <button class="btn btn-primary w-50">Enviar solicitud de amistad</button>
            </div>
        </div>
    </div>
</template>