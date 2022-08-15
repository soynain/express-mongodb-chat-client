<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
  setup () {
    const { result } = useQuery(gql`
      query encontrarUsuario ($id:ID="62f14a314e227155d752dd27"){
        findUsuario(_id:$id) {
          nombres
          apellido_paterno
          apellido_materno
          fecha_nac
        }
}
    `)

    return {
      result,
    }
  },
}

</script>

<template>
<ul>
  <h1>HOLAAAA AQUI SERAN LAS QUERYS</h1>
    <li>
      {{ result}}
    </li>
  </ul>
</template>
