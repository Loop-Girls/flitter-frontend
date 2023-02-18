<template>

    <body>
        <div class="responsive"></div>
        <div class="container">

            <div class="margin">
                <label class="enunciado" for="message">What are you thinking?</label>

                <input class="message" v-model="message" maxlength="150" />
            </div>
            <div class="buttons">
                <div>
                    <input id="file" type="file" @change="selectImage" />
                    <!-- TODO: improve -->
                    <!-- <button @click="removeSelectedFile">X</button> -->
                    <label class="button"></label>
                    <input class="date" type="date" v-model="date" :min="today_date" />
                </div>
                <div class="post">
                    <button class="btn" @click="sendFlit(message, date)"> &#x270D;</button>
                </div>
            </div>

        </div>
    </body>
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
                if (target && target.files) {
                    try {
                        selectedImage = target.files[0];
                        console.log(selectedImage);
                        console.log(selectedImage.name);
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            sendFlit: (message: string, date: string) => {
                if (message == '' && selectedImage == undefined) {
                    alert("You can't post if there is no message and no image.")

                } else {
                    let formData = new FormData();
                    if (selectedImage) {
                        formData.append("imagen", selectedImage);
                    }
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
.container {

    background-color: white;
    width: 100%;
    height: 50%;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 50px 50px rgb(251, 216, 238);
    border-color: inherit;
}

.margin {
    margin-left: auto;
    margin-right: auto;
}

.enunciado {
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: rgb(31, 30, 31);
    ;
    font-size: 40px;
    position: relative;
    display: block;
    border-color: inherit;
    font-style: oblique;
    margin-left: auto;
    margin-right: auto;

}

.message:hover {
    border-color: rgb(248, 198, 230);
}

.message {
    background-color: rgb(249, 249, 249);
    width: 100%;
    height: 150px;
    border-radius: 20px;
    margin-top: 20px;

    margin-left: auto;
    margin-right: auto;

    border-color: transparent;


}

.date {
    border-radius: 20px;
    padding: 10px;
    box-shadow: 10px 10px rgb(251, 216, 238);
    border-color: transparent;
}

.btn {
    width: 80px;
    height: px;
    border-radius: 50px;

    color: rgb(27, 26, 26);
    font-size: 30px;
    text-align: center;
    background-color: rgb(252, 252, 252);
    box-shadow: 10px 10px rgb(251, 216, 238);
    border-color: transparent;
}

.buttons {
    margin-top: 3%;
    display: flex;
    justify-content: center;
    position: relative;
    display: block;


}

.post {
    position: absolute;
    display: block;
    display: inline-block;
    padding: 10px;
    margin-top: 10px;

}
</style>