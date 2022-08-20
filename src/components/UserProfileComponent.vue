
<style scoped>
.profile-basic-data {
  border-bottom: 1px solid gray;
  height: 30%;
}

.profile-picture-container {
  border-bottom: 1px solid gray;
  width: 20%;
  border-radius: 50%;
  padding: 5px;
  background-color: #84A98C;
}

.circle-cont-aux {
  border: 1px solid black;
  border-radius: 50%;
  background-color: black;
}

.profile-img {
  object-fit: scale-down;
  border-radius: 50%;
}

.profile-name {
  width: 80%
}

#nombre-txt {
  font-size: 20px;
}

.friends-container {
  height: 70%;
}

.friends-list {
  height: 80%;
  overflow-y: auto;
}

.friends-count {
  border-bottom: 1px solid gray;
}
#aux-margin{
  margin-left: 5px;
}

.buttons-actions {
  height: 20%;
}

.friend-block{
  border-bottom: 1px solid gray;
}
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