<template>
    <form novalidate @submit.prevent="submit" style="border:1px solid #ccc">
        <div class="container" style="border:1px solid #ccc">
       
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required v-model="email">

            <!-- TODO: select avatar image -->
            <div class="clearfix">
                <button type="button" class="cancelbtn">Cancel</button>
                <button type="submit" class="loginbtn">Send</button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import useAuth from '@/composables/useAuth';
import router from '@/router';
import { ComputedRef, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'loginView',
    setup() {
        const { login, loggedUser, forgotPassword} = useAuth();
        console.log(loggedUser);
        if(localStorage.getItem("user_id")){
            router.push('/private');
        }
        let email = ref<string>('');
        let password = ref<string>('');
        return {
            email,
            password,
            submit: (event: Event) => {
                if (email.value == '' ) {
                    alert('Missing info')
                } else {
                    let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    if (!email.value.match(regex)) {
                        alert('Not valid email.')
                    } else {
                        let body = new URLSearchParams();
                        body.append('email', email.value)
                        forgotPassword(body);
                    }

                }

            },
        }
    }
}

);
</script>