<style scoped>
/*.contact-list-container {
  border: 1px solid black;
}*/

.contact-list-scroller{
    border: 1px solid black;
    overflow-y: auto;
}

.contact-box{
    height: 3.8rem;
}
</style>
<template>
    <div class="chat-container-main w-100 h-100 d-flex flex-row">
        <div class="contact-list-container h-100 w-25">
            <div class="contact-list-scroller w-100 h-auto">
                <div class="contact-box w-100">
                    
                </div>
            </div>
        </div>
        <div class="chat-area d-flex flex-column justify-content-center align-items-center p-3 h-100 w-75">
            <h3 class="text-break mb-3">Aquí podrás visualizar los contactos que tienes
                agregados como amigos, así como tus amistades
            </h3>
            <quote>Empieza a chatear, disfruta esta experiencia :D</quote>
        </div>
    </div>
</template>