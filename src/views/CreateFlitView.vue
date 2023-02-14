<template>
    <body>
        <div class="responsive"></div>
    <div class="container">

        <div class="margin">
            <label class="enunciado" for="message">¿Qué está pasando?</label>
            
            <input class="message" v-model="message" maxlength="150" />
        </div>
        <div class="buttons">
            <div>
                <input id="file" type="file" @change="selectImage" />
                <!-- TODO: improve -->
                <!-- <button @click="removeSelectedFile">X</button> -->
                <label class="button"></label>
                <input class="date"  type="date" v-model="date" :min="today_date" />
            </div>
            <div class="post">
                <button class="btn" @click="sendFlit(message, date)">Post Flit</button>
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
.container{
    background-color:white;
    width:100%;
    height: 600px;
    float:left;
    margin: 10% 35%;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 50px 50px  rgb(251, 216, 238);
    border-color: inherit;
}
.margin{
    margin-right: 500px;
}
.enunciado{
    font-family:Georgia, 'Times New Roman', Times, serif;
   color: rgb(31, 30, 31);;
    font-size: 40px;
    position:relative;
    display:block;
    margin-left: 250px;
    border-color: inherit;
    font-style:oblique;

}
.message:hover{
    border-color:rgb(248, 198, 230);
}
.message{
    background-color: rgb(249, 249, 249);
    width: 600px;
    height: 200px;
    border-radius: 20px;
    margin-top: 20px;
    margin-bottom:20px;
margin-right: 100px;
    position:absolute;
    display:block;
    display:inline-block ;

    border-color: transparent;
 
   
}

.date{
    border-radius: 20px;
    padding: 10px;
    box-shadow: 10px 10px rgb(251, 216, 238);
    border-color: transparent;
}

.btn{
    width: 70px;
    height: 50px;
    border-radius: 50px;
 
color:rgb(27, 26, 26);
font-size: 10px;
text-align: center;
background-color: rgb(252, 252, 252);
box-shadow: 10px 10px rgb(251, 216, 238);
border-color: transparent;
}

.buttons{
 margin-top: 250px;
display: flex;
justify-content: center;
position:relative;
display:block;
margin-left:200px;

}

.post{
    position:absolute;
    display:block;
    display:inline-block ;
    margin-left:200px;
    margin-top: 30px;

}
</style>