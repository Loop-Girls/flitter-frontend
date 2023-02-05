<template>
    <div>
        <button @click="sendFlit()">Flit</button>
    </div>
    <div>
        <textarea v-model="message">

        </textarea>
    </div>
    <div>
        <input type="file" @change="selectImage"/>
        <button @click="scheduleFlit">Schedule</button>
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
        let message = "";
        let date =<Date>{};
        let image = "";
        let selectedImage: File | null;
        const {createFlit} = useFlits();
        return {
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
            scheduleFlit: () => {

            },
            uploadImage:async (selectedImage)=>{
                const url = '../flipper-backend/src/public/images';
                //TODO
                console.log('Not implemented yet')
            },
            sendFlit: () => {
                let flit =  {
                    id: "0",
                    author: 'theBest',
                    image: selectedImage.name,
                    message: message,
                    date: date,
                    kudos: [], //list of users that gave a kudo to this flit
                    comments: []
                }
                createFlit(flit);
            }
        }

    }
});
</script>