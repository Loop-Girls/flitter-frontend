<template>
    <div class="header">
        <p class="username">Username</p>
        <p class="date">Date</p>
        <button class="follow_btn">Follow/Unfollow</button>
    </div>
    <div class="message">
        <p>Hola, esto es un mensaje de prueba</p>
    </div>
    <div class="img">
        <img src=""/>
    </div>
    <div class="footer">
        <img class="kudo_img"/>
        <p class="kudo_int"></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FlitComponent',
});
</script>