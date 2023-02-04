<template>
    <div class="header">
        <p class="username" v-model="author">Username</p>
        <p class="date" v-model="date">Date</p>
        <button class="follow_btn">Follow/Unfollow</button>
    </div>
    <div class="message">
        <p>Hola, esto es un mensaje de prueba</p>
    </div>
    <div class="img">
        <img src="@/assets/logo.png"/>
    </div>
    <div class="footer">
        <button class="kudo_img" @click="giveKudo">Kudo</button> <p class="kudo_int">0</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useFlits from '@/composables/useFlits';

export default defineComponent({
  name: 'FlitComponent',
  setup(){
    const {selectedFlit} = useFlits();
    return{
        giveKudo: ()=>{

        }
    }
  }
});
</script>