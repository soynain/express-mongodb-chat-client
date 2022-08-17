<script setup>
import NavBarComponent from './NavBarComponent.vue';
import CardComponent from './card-component.vue';
</script>
<style scoped>
main {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#cardLogin{
    width:45rem;
    height:17rem;
    border: 1px solid gray;
    box-shadow: 5px 5px 15px 2px #888888;
}
</style>
<template>
    <NavBarComponent />
    <main>
        <CardComponent id="cardLogin"/>
    </main>
</template>