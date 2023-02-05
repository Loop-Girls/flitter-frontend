<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CreateFlitButton></CreateFlitButton>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent from '@/components/FlitComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
    CreateFlitButton,
    FlitComponent
},
});
</script>
