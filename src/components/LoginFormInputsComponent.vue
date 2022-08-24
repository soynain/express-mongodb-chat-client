<script setup>
import { ref} from 'vue';
import router from '../router';
let usuarioRef = ref(undefined);
let contraRef = ref(undefined);

async function enviarCredencialesFetch(usuario, contrasena) {
    let credentialsToBeSended = await fetch('http://localhost:3000/usuario/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: usuario,
            contrasena: contrasena
        })
    });
    let jwtHeadersReceived = await credentialsToBeSended.json();
    return jwtHeadersReceived;
}

async function iniciarSesionFn() {
    let usuario = usuarioRef.value; let contra = contraRef.value;
    console.log(usuario, contra)
    if (usuario != undefined && contra != undefined) {
        let jwtHeaders = await enviarCredencialesFetch(usuario, contra);
        console.log(jwtHeaders);
        if (jwtHeaders.Status === 'Invalid credentials') {
            console.log('Credenciales incorrectas');
        } else {
            localStorage.setItem('access-token', JSON.stringify(jwtHeaders));
            router.push('/dashboard');
        }      
    } else {
        console.log('Complete los campos')
    } 
}
</script>
<template>
    <div class="card-body mb-3 d-flex flex-column w-100">
        <label for="exampleFormControlInput1" class="form-label">Nombre de usuario:</label>
        <input v-model="usuarioRef" type="text" class="form-control" id="exampleFormControlInput1"
            placeholder="Usuario">
        <label for="exampleFormControlInput1" class="form-label">Contraseña:</label>
        <input v-model="contraRef" type="password" class="form-control" id="exampleFormControlInput2"
            placeholder="Contraseña">
        <button @click="iniciarSesionFn" class="mt-5 btn btn-primary">Iniciar sesión</button>
    </div>
</template>