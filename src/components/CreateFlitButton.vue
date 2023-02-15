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
	position:fixed;
	width:100px;
	height: 100px;
	bottom:60px;
	right:40px;
	background-color:rgb(61, 36, 255);
	font-size: 50px;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
	margin-bottom: 3%;
	font-weight: bold;

}
</style>