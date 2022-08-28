<script setup>
import ChatBoxIntroductionComponent from './ChatBoxIntroductionComponent.vue';
import { ref, watch, watchEffect } from 'vue';
import { useQuery, useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { useApolloClient } from '@vue/apollo-composable';

let introductionComponentState = ref(true);
let removeIntroductionWindow = ref(0);
let resultMessagesForFinalRender = ref([]);
let listenForNewMessagesState=ref({});
let pushReceivingMessagesForRenderingState=ref([]);
let renderNewBubbleState=ref(false);

const { resolveClient } = useApolloClient()
let { usuario_id } = JSON.parse(localStorage.getItem('access-token'));
let { result, loading } = useQuery(gql`
  query encontrarAmigos($emisor_usuario_fk:String,$status:String){
  findAmigosUsuario(emisor_usuario_fk:$emisor_usuario_fk status:$status){
  	_id
    emisor_usuario_fk
    destinatario_usuario_fk
    status
    nombres_usuario{
      usuario
    }
  }
}`, {
    emisor_usuario_fk: usuario_id,
    status: 'ACEPTADO'
});

function getIntroductionComponentState() {
    return new Boolean(introductionComponentState.value);
}

function getRenderNewBubbleState(){
    return new Boolean(renderNewBubbleState.value);
}

async function removeIntroductionWindowFnAndFetchMessages(userOwnId, fkIdOfFriend, callback) {
    introductionComponentState.value = false;
    renderNewBubbleState.value=false;
    pushReceivingMessagesForRenderingState.value=[];
    await callback(userOwnId, fkIdOfFriend,subscribeToMessageChatRoom);
    removeIntroductionWindow.value++;
}

async function subscribeToMessageChatRoom(sala_fk){
    let client = resolveClient();
    let subscriptionObserver=await client.subscribe({
        query:gql`
        subscription recibirMensajes($sala_fk:String){
            recibirMensajes(sala_fk:$sala_fk){
                _id
                sala_fk
                mensaje
                fecha_envio
                fecha_visto
                emisor_usuario_fk
                destinatario_usuario_fk
        }}`,
        variables:{
            sala_fk:sala_fk
        }
    }).subscribe({next(data){
        listenForNewMessagesState.value=data.data;
    },
    error(err){
        console.log(err,' error de subscripción')
    }});
}

async function getMensajesBetweenAFriend(emisor_usuario_fk, destinatario_usuario_fk,callback) {
    let client = resolveClient();
    let messagesToBeRecovered = await client.query({
        query: gql`
        query listarMensajesChat($emisor_usuario_fk:String $destinatario_usuario_fk:String){
        findPrivateMensajes(emisor_usuario_fk:$emisor_usuario_fk,destinatario_usuario_fk:$destinatario_usuario_fk){
            mensaje
            emisor_usuario_fk
            destinatario_usuario_fk
            fecha_envio
            fecha_visto
            sala_fk
        }}`,
        variables:
        {
            emisor_usuario_fk: emisor_usuario_fk,
            destinatario_usuario_fk: destinatario_usuario_fk
        }
    });
    resultMessagesForFinalRender.value=messagesToBeRecovered.data.findPrivateMensajes;
    await callback(resultMessagesForFinalRender.value[0].sala_fk);
}

watch(listenForNewMessagesState,data=>{
    console.log(data.recibirMensajes,' si reacciona ahora');
    pushReceivingMessagesForRenderingState.value.push(data.recibirMensajes);
    renderNewBubbleState.value=true;
});


</script>
<style scoped>
#chats-card {
    width: 52rem;
    height: 37rem;
    border: 1px solid gray;
}

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

.chat-zone {
    height:  85%;
    overflow-y: auto;
}


.left-bubble,
.right-bubble {
    border: 1px solid gray;
    border-radius: 5px;
    font-weight: 500;
}

.right-bubble {
    background-image: linear-gradient(360deg, #CAD2C5, #84A98C, #52796F);
}

.message-creator-zone {
    border-top: 1px solid gray;
    height: 15%;
}
</style>
<template>
    <div class="card" id="chats-card">
        <div class="chat-container-main w-100 h-100 d-flex flex-row">
            <div class="contact-list-container d-flex flex-column-reverse justify-content-between h-100 w-25">
                <div class="contacts-wrapper w-100 h-auto text-center" v-if="loading">
                    ..LOADING
                </div>
                <div v-else class="contacts-wrapper w-100 h-auto" v-for="(value, key, index) in result"
                    :key="result.findAmigosUsuario[index]._id">
                    <div class="contact-box d-flex flex-row w-100">
                        <div class="contact-name-and-options text-center w-75">
                            <span @click="removeIntroductionWindowFnAndFetchMessages(result.findAmigosUsuario[index].emisor_usuario_fk, result.findAmigosUsuario[index].destinatario_usuario_fk, getMensajesBetweenAFriend)" class="username-link">
                                <b>{{ result.findAmigosUsuario[index].nombres_usuario.usuario }}</b>
                            </span>
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
            <div class="chat-area d-flex flex-column justify-content-center align-items-center h-100 w-75"
                :key="removeIntroductionWindow">
                <ChatBoxIntroductionComponent v-if="getIntroductionComponentState() == true && Object.entries(resultMessagesForFinalRender).length === 0" />
                <div class="w-100 h-100" v-else>
                    <div class="chat-zone w-100 d-flex flex-column p-3" >
                        <div class="w-100 h-auto d-flex flex-column chat-scroll-zone"  v-for="item in resultMessagesForFinalRender">
                            <span class="left-bubble h-auto mb-4 p-2 w-50 text-break align-self-start" v-if="item.emisor_usuario_fk!==usuario_id" >
                                {{ item.mensaje }}
                            </span>
                            <span class="right-bubble h-auto mb-4 p-2 w-50 text-break align-self-end" v-else>
                                {{ item.mensaje }}
                            </span>
                        </div>
                        <div class="w-100 h-auto d-flex flex-column chat-scroll-zone" v-if="getRenderNewBubbleState()==true" :key="item._id" v-for="item of pushReceivingMessagesForRenderingState">
                            <span class="left-bubble h-auto mb-4 p-2 w-50 text-break align-self-start" v-if="item.emisor_usuario_fk!==usuario_id" >
                                {{ item.mensaje }}
                            </span>
                            <span class="right-bubble h-auto mb-4 p-2 w-50 text-break align-self-end" v-else>
                                {{ item.mensaje }}
                            </span>
                        </div>
                    </div>
                    <div class="message-creator-zone d-flex flex-row p-1 w-100">
                        <div class="button-block pe-1 h-100 w-25">
                            <button class="btn btn-primary w-100 h-100">Enviar mensaje</button>
                        </div>
                        <div class="text-area-wrapper h-100 w-75">
                            <textarea name="message-string-body" placeholder="Escribe tu mensaje..."
                                class="form-control w-100 h-100" style="resize: none;"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>