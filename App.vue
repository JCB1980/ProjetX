<template>

<Navbar/>
<Button/>
<Formulaire/>
<ChargesExterne/>

  <main class="container" style="margin-top: 70px">
    <h1>X2 Software</h1>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import Button from './components/Button.vue';
import Formulaire from './components/Formulaire.vue';
import ChargesExterne from './components/ChargesExterne.vue';





export default defineComponent({
    name: "App",
    components: { Navbar, Button, Formulaire, ChargesExterne }
});
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'font-awesome/css/font-awesome.min.css';
h1 {color: red;}
</style>
