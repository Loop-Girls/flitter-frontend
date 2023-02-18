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
    bottom: 15px;
    right: 15px;
    background-color: rgb(61, 36, 255);
    font-size: 40px;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
    /* margin-bottom: 20px; */
    font-weight: bold;


}
.btn:hover{
	position:fixed;
	width:100px;
	height: 100px;
	bottom:60px;
	right:40px;
	background-color:white;
	font-size: 50px;
	color:rgb(61, 36, 255);
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
	margin-bottom: 3%;
	font-weight: bold;
	border-color: black;

}
</style>