<template>
    <button class="btn" @click="showFlitForm">New Flit</button> 
</template> 

<script lang="ts">


import { defineComponent } from 'vue';

import router from '@/router';
export default defineComponent({
    name: 'CreateFlitButton',
    setup() {
        return {
             showFlitForm: ()=>{
                router.push({ name: "create" })
            },
        };
    }
});
</script>
<style scoped>
.btn{
    margin: 15px;
    position: fixed;
    bottom: 0;
    right: 0;
}
</style>