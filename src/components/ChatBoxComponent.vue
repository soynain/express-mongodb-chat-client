<script setup>
import ChatBoxIntroductionComponent from './ChatBoxIntroductionComponent.vue';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useQuery, useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { useApolloClient } from '@vue/apollo-composable';
import NoMessagesYetComponent from './NoMessagesYetComponent.vue';

let introductionComponentState = ref(true),
    removeIntroductionWindow = ref(0),
    resultMessagesForFinalRender = ref([]),
    listenForNewMessagesState = ref({}),
    pushReceivingMessagesForRenderingState = ref([]),
    renderNewBubbleState = ref(false),
    salaFkState = ref(""),
    destinatarioFkState = ref(""),
    messageBody=ref(""),
    emptyMessageHandlerState=ref(false),
    deleteGeneratedSalaFKIdState=ref(false);

const { resolveClient } = useApolloClient()
let { usuario_id } = JSON.parse(localStorage.getItem('access-token'));
let { result, loading } = useQuery(gql`
  query encontrarAmigos($emisor_usuario_fk:String,$status:String){
  findAmigosUsuario(emisor_usuario_fk:$emisor_usuario_fk status:$status){
  	_id
    emisor_usuario_fk
    destinatario_usuario_fk
    status
    nombres_usuario(id_usuario_cliente:$emisor_usuario_fk){usuario}}}`,
    { emisor_usuario_fk: usuario_id, status: 'ACEPTADO' });

function getIntroductionComponentState() {
    return new Boolean(introductionComponentState.value);
}

function getRenderNewBubbleState() {
    return new Boolean(renderNewBubbleState.value);
}

function getEmptyMessageHandlerState(){
    return new Boolean(emptyMessageHandlerState.value);
}

function getDeleteGeneratedSalaFKIdState(){
    return new Boolean(deleteGeneratedSalaFKIdState.value);
}

function setDestinatarioFkStateValue(destinatario_usuario_fk){
    console.log(destinatario_usuario_fk)
    destinatarioFkState.value=destinatario_usuario_fk;
}

async function borrarSalaChat(){
    return await client.mutate({
        mutation:gql`
        mutation deleteSalaChat($amigos_fk:String){
            borrarSalaChatId(){
                _id
                amigos_fk
            }
        }`,
        variables:{
            amigos_fk:salaFkState.value
        }
    });
}

async function encontrarUnaAmistadEnParticular(){
    return await client.query({
        query:gql`
        query encontrarUnaAmistadParticular($emisor_usuario_fk:String,$destinatario_usuario_fk:String){
            findAmistadParticular(emisor_usuario_fk:$emisor_usuario_fk destinatario_usuario_fk:$destinatario_usuario_fk){
                _id
            }
        }`,
        variables:{
            emisor_usuario_fk:emisor_usuario_fk,
            destinatario_usuario_fk:destinatario_usuario_fk
        }
    });
}

async function crearNuevaSalaDeChat(){
    return await client.mutate({
        mutation:gql`
        mutation crearNuevaSalaDeChat($id:String){
            crearNuevaSalaDeChat(_id:$id){
                amigos_fk
                    _id
            }
        }`,
        variables:{
            id:idAmistadAEncontrar.data.findAmistadParticular._id
        }
    });
}

async function removeIntroductionWindowFnAndFetchMessages(userOwnId, fkIdOfFriend, callback) {
    if(getDeleteGeneratedSalaFKIdState()==true) {
        deleteGeneratedSalaFKIdState.value=false
        let client=resolveClient();
        await borrarSalaChat();
    }
    emptyMessageHandlerState.value=false;
    resultMessagesForFinalRender.value=[];
    introductionComponentState.value = false;
    renderNewBubbleState.value = false;
    pushReceivingMessagesForRenderingState.value = [];
    await callback(userOwnId, fkIdOfFriend, subscribeToMessageChatRoom);
    removeIntroductionWindow.value++;
}

async function subscribeToMessageChatRoom(sala_fk) {
    let client = resolveClient();
    let subscriptionObserver = await client.subscribe({
        query: gql`
        subscription recibirMensajes($sala_fk:String){
            recibirMensajes(sala_fk:$sala_fk){
                _id
                sala_fk
                mensaje
                fecha_envio
                fecha_visto
                emisor_usuario_fk
                destinatario_usuario_fk
            }
        }`,
        variables: {
            sala_fk: sala_fk
        }
    }).subscribe({
        next(data) {
            listenForNewMessagesState.value = data.data;
        },
        error(err) {
            console.log(err)
        }
    });
}

/*https://www.apollographql.com/docs/react/data/queries/#refetching
    This is useful for when you want to make querys from a callback
    and wherever you make another call to the callback, doesn´t bring any data
    updated, so network-only always makes a new query
    */

async function getMensajesBetweenAFriend(emisor_usuario_fk, destinatario_usuario_fk, callback) {
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
        },
        fetchPolicy:'network-only'
    });
    
    if(messagesToBeRecovered.data.findPrivateMensajes.length!==0){
        resultMessagesForFinalRender.value = messagesToBeRecovered.data.findPrivateMensajes;
        salaFkState.value = resultMessagesForFinalRender.value[0].sala_fk;
        await callback(salaFkState.value);
    }else{
        /*in this condition I must apply with another query the id chat room */
        let idAmistadAEncontrar=await encontrarUnaAmistadEnParticular();
    //    console.log(idAmistadAEncontrar.data.findAmistadParticular._id);
        let nuevaSalaChatIdAGenerar=await crearNuevaSalaDeChat();
        console.log(nuevaSalaChatIdAGenerar);

        salaFkState.value=nuevaSalaChatIdAGenerar.data.crearNuevaSalaDeChat.amigos_fk;
        deleteGeneratedSalaFKIdState.value=true;
        emptyMessageHandlerState.value=true;
    }
}



async function sendMessageMutation() {
    let client = resolveClient();
    console.log(salaFkState.value,' fjfjfjf')
    console.log(messageBody.value)
    let mutationAnswer = await client.mutate({
        mutation: gql`
        mutation enviarMensaje($sala_fk:String! $mensaje:String! $emisor_usuario_fk:String! $destinatario_usuario_fk:String!){
            enviarMensajes(sala_fk:$sala_fk, mensaje:$mensaje, emisor_usuario_fk:$emisor_usuario_fk, destinatario_usuario_fk:$destinatario_usuario_fk){
                 _id
                sala_fk
                mensaje
                emisor_usuario_fk
                destinatario_usuario_fk
                fecha_envio
            }
        }`,
        variables: {
            sala_fk: salaFkState.value,
            mensaje:messageBody.value,
            emisor_usuario_fk: usuario_id,
            destinatario_usuario_fk: destinatarioFkState.value
        }
    });
//    console.log(mutationAnswer,' andale ya retorno el objeto');
    messageBody.value="";
}

onMounted(()=>{
    console.log(result);
})

watch(listenForNewMessagesState, data => {
    pushReceivingMessagesForRenderingState.value.push(data.recibirMensajes);
    renderNewBubbleState.value = true;
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
    height: 85%;
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
                <div v-else class="contacts-wrapper w-100 h-auto" >
                  <div class="contact-box d-flex flex-row w-100" v-for="friend in result.findAmigosUsuario">
                        <div class="contact-name-and-options text-center w-75">
                            <span @click="removeIntroductionWindowFnAndFetchMessages(friend.emisor_usuario_fk, friend.destinatario_usuario_fk, getMensajesBetweenAFriend)"  class="username-link">
                                <b @click="setDestinatarioFkStateValue(friend.destinatario_usuario_fk)">{{ friend.nombres_usuario.usuario }}</b>
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
                    <!--<div class="contact-box d-flex flex-row w-100">
                        <div class="contact-name-and-options text-center w-75">
                            <span @click="removeIntroductionWindowFnAndFetchMessages(result.findAmigosUsuario[index].emisor_usuario_fk, result.findAmigosUsuario[index].destinatario_usuario_fk, getMensajesBetweenAFriend)"  class="username-link">
                                <b @click="setDestinatarioFkStateValue(result.findAmigosUsuario[index].destinatario_usuario_fk)">{{ result.findAmigosUsuario[index].nombres_usuario.usuario }}</b>
                            </span>
                            <div class="action-icons-container w-100">
                                <img class="icon-group" src="../assets/icons8-male-user-24.png" alt="add_friend">
                                <em class="option-txt">Ver perfil</em>
                            </div>
                        </div>
                        <div class="status d-flex flex-column justify-content-center align-items-center w-25">
                            <div class="status-circle"></div>
                        </div>
                    </div>-->
                </div>
                <div class="aux-white-space"></div>
            </div>
            <div class="chat-area d-flex flex-column justify-content-center align-items-center h-100 w-75" :key="removeIntroductionWindow">
                <ChatBoxIntroductionComponent v-if="getIntroductionComponentState() == true && Object.entries(resultMessagesForFinalRender).length === 0" />
                <div class="w-100 h-100" v-else >
                    <div class="chat-zone w-100 d-flex flex-column p-3" v-if="getEmptyMessageHandlerState()==false">
                        <div class="w-100 h-auto d-flex flex-column chat-scroll-zone" v-for="item in resultMessagesForFinalRender">
                            <span class="left-bubble h-auto mb-4 p-2 w-50 text-break align-self-start" v-if="item.emisor_usuario_fk !== usuario_id">
                                {{ item.mensaje }}
                            </span>
                            <span class="right-bubble h-auto mb-4 p-2 w-50 text-break align-self-end" v-else>
                                {{ item.mensaje }}
                            </span>
                        </div>
                        <div class="w-100 h-auto d-flex flex-column chat-scroll-zone" v-if="getRenderNewBubbleState() == true" :key="item._id" v-for="item of pushReceivingMessagesForRenderingState">
                            <span class="left-bubble h-auto mb-4 p-2 w-50 text-break align-self-start" v-if="item.emisor_usuario_fk !== usuario_id">
                                {{ item.mensaje }}
                            </span>
                            <span class="right-bubble h-auto mb-4 p-2 w-50 text-break align-self-end" v-else>
                                {{ item.mensaje }}
                            </span>
                        </div>
                    </div>
                    <NoMessagesYetComponent v-else/>
                    <div class="message-creator-zone d-flex flex-row p-1 w-100">
                        <div class="button-block pe-1 h-100 w-25">
                            <button @click="sendMessageMutation()"
                                class="btn btn-primary w-100 h-100">Enviar mensaje</button>
                        </div>
                        <div class="text-area-wrapper h-100 w-75">
                            <textarea @keyup.enter="sendMessageMutation()" v-model="messageBody" name="message-string-body" placeholder="Escribe tu mensaje..."
                                class="form-control w-100 h-100" style="resize: none;"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>