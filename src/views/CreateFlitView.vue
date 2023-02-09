<template>
    <div class="card">
   
        <div>
            <label for="message">What are you thinking?</label>
            <input class="message" v-model="message"  maxlength="150"/>
        </div>
        <div class="buttons">
            <div>
            <input type="file" @change="selectImage" />
            <label class="button">Schedule</label>
            <input type="date" v-model="date" />
        </div>
        <div>
            <button @click="sendFlit(message, date)">Post Flit</button>
        </div>
        </div>
     
    </div>
</template>

<script lang="ts">import { defineComponent, ref } from 'vue';
//TODO: import user

import useFlits from '@/composables/useFlits'
export default defineComponent({
    name: 'CreateFlitView',
    setup() {

        let message = ref<string>('');
        let date = new Date(Date.now());
        let image = "";
        let selectedImage: File | null;
        let user = {
            "_id": "fakeif01",
            "email": "firstUser2@fakemail.com",
            "password": "123456",
            "username": "FlitterFan",
            "role": "user",
            "avatar": ""
        };
        const { createFlit } = useFlits();
        return {
            user,
            message,
            date,
            image,
            selectImage: (event: Event) => {
                console.log(event);
                let target: HTMLInputElement;
                target = (event.target as HTMLInputElement) ?? null;
                try {
                    selectedImage = target.files[0];
                    console.log(selectedImage);
                    console.log(selectedImage.name);
                } catch (error) {
                    console.log(error);
                }
            },
            sendFlit: (message: string, date: Date) => {
                if (message == '' && selectedImage == undefined) {
                    alert("You can't post if there is no message and no image.")

                } else {
                    let formData = new FormData();
                    formData.append("imagen", selectedImage);
                    formData.append("author", user._id);
                    formData.append("date", date);
                    formData.append("message", message);

                    createFlit(formData);
                }

            }
        }

    }
});
</script>
<style scoped>
.card {
    margin-left: auto;
    margin-right: auto;
    border-style: groove;
    border-width: 3px;
    padding: 2rem;
}
div{
    margin: 1rem;
}
button{
    border-radius: 3px;
    background-color:thistle;
    margin-right: auto;
    margin-left: auto;
}
.message{
    height: 100px;
}
label{
    display: block;
}
input{
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
}


/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .card {
        margin-left: auto;
        margin-right: auto;
        border-style: groove;
        border-width: 3px;
        width: 50%;

    }
}
</style>