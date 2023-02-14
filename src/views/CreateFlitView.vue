<template>
    <div class="card">

        <div>
            <label for="message">What are you thinking?</label>
            <input class="message" v-model="message" maxlength="150" />
        </div>
        <div class="buttons">
            <div>
                <input id="file" type="file" @change="selectImage" />
                <!-- TODO: improve -->
                <!-- <button @click="removeSelectedFile">X</button> -->
                <label class="button">Schedule</label>
                <input type="date" v-model="date" :min="today_date" />
            </div>
            <div>
                <button @click="sendFlit(message, date)">Post Flit</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">import { defineComponent, ref, watch } from 'vue';
import useFlits from '@/composables/useFlits'
import useAuth from '@/composables/useAuth';
import flits from '@/store/flits';
export default defineComponent({
    name: 'CreateFlitView',
    setup() {
        let current = new Date();
        let cDate = current.getFullYear() + '-0' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate;
        console.log(dateTime);
        let today_date = dateTime;
        console.log(today_date);
        const { loggedUser } = useAuth();
        let message = ref<string>('');
        let date = ref<string>(today_date);
        let image = "";
        let selectedImage: File | null;
        const { createFlit } = useFlits();
        watch(date, () => {
            if (date.value < today_date) {
                console.log(date.value);
                console.log(today_date);
                alert("Can't post in the past");
            }
        });
        return {
            message,
            today_date,
            date,
            image,
            // TODO
            // removeSelectedFile: () => {
            // },
            selectImage: (event: Event) => {
                console.log(event);
                let target: HTMLInputElement | undefined;
                target = (event.target as HTMLInputElement) ?? null;
                try {
                    selectedImage = target.files[0];
                    console.log(selectedImage);
                    console.log(selectedImage.name);
                } catch (error) {
                    console.log(error);
                }
            },
            sendFlit: (message: string, date: string) => {
                if (message == '' && selectedImage == undefined) {
                    alert("You can't post if there is no message and no image.")

                } else {
                    let formData = new FormData();
                    formData.append("imagen", selectedImage);
                    formData.append("author", loggedUser.value.username);
                    if (date == null) {
                        let date_now = new Date();
                        console.log('date_now', date_now);
                        formData.append("date", today_date);
                    } else {
                        //check if introduced date is past
                   
                            formData.append("date", date);
                    
                    }
                    formData.append("message", message);
                    console.log(formData);
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

div {
    margin: 1rem;
}

button {
    border-radius: 3px;
    background-color:#ffb000;
    margin-right: auto;
    margin-left: auto;
}

.message {
    height: 100px;
}

label {
    display: block;
}

input {
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