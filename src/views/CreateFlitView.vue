<template>
    <div>
        <button @click="sendFlit(message)">Flit</button>
    </div>
    <div>
        <input v-model="message"/>
    </div>
    <div>
        <input type="file" @change="selectImage"/>
        <label>Schedule</label>
        <input type="date" v-model="date"/>
    </div>
</template>

<script lang="ts">import { defineComponent, ref } from 'vue';
//TODO: import user

import useFlits from '@/composables/useFlits'
import FlitForm from '@/components/FlitComponent.vue';
import flitterApi from '@/api/flitterApi';
export default defineComponent({
    name: 'CreateFlitView',
    setup() {
        
        let message = ref<string>('');
        let date =new Date();
        let image = "";
        let selectedImage: File | null;
        let user ={
            "_id": "fakeif01",
            "email": "firstUser2@fakemail.com",
            "password": "123456",
            "username": "FlitterFan",
            "role": "user",
            "avatar":""
        };
        const {createFlit} = useFlits();
        return {
            user,
            message,
            date,
            image,
            selectImage: (event:Event) => {
                console.log(event);
                let target: HTMLInputElement;
                target = (event.target as HTMLInputElement)??null;
                try {
                    selectedImage=target.files[0];
                    console.log(selectedImage);
                    console.log(selectedImage.name);
                } catch (error) {
                    console.log(error);
                }
            },
            uploadImage:async (selectedImage)=>{
                const url = '../flipper-backend/src/public/images';
                //TODO
                console.log('Not implemented yet')
            },
            sendFlit: (message: string) => {
                alert('msg : '+message);
                let formData = new FormData();
                formData.append("imagen",selectedImage);
                formData.append("author", user._id);
                formData.append("date", date.toString());
                formData.append("message", message);
                
                createFlit(formData);
            }
        }

    }
});
</script>