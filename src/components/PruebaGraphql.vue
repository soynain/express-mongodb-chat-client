<script setup>
import { watch, ref } from "vue"
import { useSubscription } from "@vue/apollo-composable"
import gql from 'graphql-tag'

const numeros = ref([])

const { result } = useSubscription(gql`
    subscription aloha{
        countdown{
            nombres
        }
    }
`)

watch(result,data => {
    console.log(data,result)
    numeros.value.push(data)
},{lazy: true })
</script>

<template>
    <div>
        <ul>
            <li>
                {{ numeros }}
            </li>
        </ul>
    </div>
</template>
