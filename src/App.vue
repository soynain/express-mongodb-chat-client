<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watch } from 'vue';
import PruebaGraphql from './components/PruebaGraphql.vue';
const { result, loading } = useQuery(gql`
  query encontrarUsuario ($id:ID="62f14a314e227155d752dd27"){
    findUsuario(_id:$id) {
      nombres
      apellido_paterno
      apellido_materno
      fecha_nac
}}`);
</script>

<template>
  <PruebaGraphql/>
  <h1 v-if="loading">CARGANDO</h1>
  <ul v-else-if="result">
    <h1>HOLAAAA AQUI SERAN LAS QUERYS</h1>
    <li>
      {{ result.findUsuario?.nombres }}
    </li>
    <li>
      {{ result.findUsuario?.apellido_paterno }}
    </li>
    <li>
      {{ result.findUsuario?.apellido_materno}}
    </li>
    <li>
      {{ result.findUsuario?.fecha_nac }}
    </li>
  </ul>
</template>
