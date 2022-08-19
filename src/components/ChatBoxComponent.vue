<script setup>
import ChatBoxIntroductionComponent from './ChatBoxIntroductionComponent.vue';
import { ref,nextTick } from 'vue';
const introductionComponentState=ref(true);

</script>
<style scoped>
.contact-list-container {
    border-right: 1px solid gray;
    overflow-y: auto;
}

.contact-box {
    height: 3.8rem;
    border: 1px solid gray;
    border-right: none;
    border-left: none;
    border-bottom: none;
}

.username-link {
    cursor: pointer;
}

.username-link:hover {
    text-decoration: underline;
    color: aqua;
    cursor: pointer;
}

.status-circle {
    background-color: green;
    width: 10px;
    height: 10px;
    border-radius: 15px;
}

.option-txt {
    font-size: 13px;
    cursor: pointer;
}

.icon-group {
    cursor: pointer;
}

.chat-wrapper-zone{
    overflow-y: auto;
    height: 85%;
}

.left-bubble,.right-bubble{
    border: 1px solid gray;
    border-radius: 5px;
    font-weight: 500;
}

.right-bubble{
    background-image: linear-gradient(360deg, #CAD2C5,#84A98C,#52796F );
}

.message-creator-zone{
    border-top: 1px solid gray;
    height: 15%;
}

</style>
<template>
    <div class="chat-container-main w-100 h-100 d-flex flex-row">
        <div class="contact-list-container d-flex flex-column-reverse justify-content-between h-100 w-25">
            <div class="contacts-wrapper w-100 h-auto">
                <div class="contact-box d-flex flex-row w-100">
                    <div class="contact-name-and-options text-center w-75">
                        <span class="username-link"><b>mattchadows90</b></span>
                        <div class="action-icons-container w-100">
                            <img class="icon-group" src="../assets/icons8-male-user-24.png" alt="add_friend">
                            <em class="option-txt">Ver perfil</em>
                        </div>
                    </div>
                    <div class="status d-flex flex-column justify-content-center align-items-center w-25">
                        <div class="status-circle"></div>
                    </div>
                </div>
            </div>
            <div class="aux-white-space"></div>
        </div>
        <div class="chat-area d-flex flex-column justify-content-center align-items-center h-100 w-75">
            <ChatBoxIntroductionComponent v-if="introductionComponentState.value===true"/>
            <div class="chat-wrapper-zone w-100 d-flex flex-column p-3">
                <span class="left-bubble h-auto mb-4 p-2 w-50 text-break align-self-left">Hola we como has estado</span>
                <span class="right-bubble h-auto mb-4 p-2 w-50 text-break align-self-end">Bien muchas gracias</span>  
            </div>
            <div class="message-creator-zone d-flex flex-row p-1 w-100">
                <div class="button-block pe-1 h-100 w-25">
                    <button class="btn btn-primary w-100 h-100">Enviar mensaje</button>
                </div>
                <div class="text-area-wrapper h-100 w-75">
                    <textarea name="message-string-body" placeholder="Escribe tu mensaje..." class="form-control w-100 h-100" style="resize: none;"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>