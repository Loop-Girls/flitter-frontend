<template>
    <button @click="showFlitForm">New Flit</button> 
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