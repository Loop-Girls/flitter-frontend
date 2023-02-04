<template>
    <div>
        <button @click="sendFlit()">Flit</button>
    </div>
    <div>
        <textarea v-model="message">

        </textarea>
    </div>
    <div>
        <button @click="selectImage">Image</button>
        <button @click="scheduleFlit">Schedule</button>
    </div>
</template>

<script lang="ts">import { defineComponent, ref } from 'vue';
//TODO: import user

import useFlits from '@/composables/useFlits'
import FlitForm from '@/components/FlitForm.vue';
export default defineComponent({
    name: 'CreateFlitView',
    setup() {
        let message = ref<string>("");
        let date =<Date>{};
        let image = "";
        const {createFlit} = useFlits();
        return {
            message,
            date,
            image,
            selectImage: () => {

            },
            scheduleFlit: () => {

            },
            sendFlit: () => {
                let flit =  {
                    id: 0,
                    author: 'theBest',
                    image: image,
                    message: message.value,
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