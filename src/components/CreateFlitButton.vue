<template>
    <button class="btn" @click="showFlitForm"> + </button> 
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
    position: fixed;
    width: 70px;
    height: 70px;
    bottom: 60px;
    right: 15px;
    background-color: black;
	border-color: white;
    font-size: 40px;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
    /* margin-bottom: 20px; */
    font-weight: bold;


}
.btn:hover{
	color:pink;
	border-color: pink;

}
</style>