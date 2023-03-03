<template>
    <form novalidate @submit.prevent="submit" style="border:1px solid #ccc">
        <div class="container" style="border:1px solid #ccc">
            <h1>Reset Password</h1>
            <p>Please fill in this form to reset your password.</p>
            <label for="psw"><b>New Password</b></label>
            <input type="password" placeholder="Enter New Password" name="psw" required v-model="password">

            <label for="psw-repeat"><b>Repeat New Password</b></label>
            <input type="password" placeholder="Repeat New Password" name="psw-repeat" required v-model="repassword">

            <div class="clearfix">
                <button type="button" class="btn-k">Cancel</button>
                <button type="submit" class="btn-k">Reset</button>
            </div>
        </div>
    </form>
</template>
<script lang="ts">
import useAuth from '@/composables/useAuth';
import router from '@/router';
import { ComputedRef, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SignupView',
    setup(props) {
        const { reset } = useAuth();
        let password = ref<string>('');
        let repassword = ref<string>('');
        return {
            password,
            repassword,
            submit: () => {
         
                if (password.value == '' || repassword.value == '') {
                    alert('Missing info')
                } else {
                    if (password.value.length >= 6) {
                        console.log(password.value + '=' + repassword.value)
                        if (password.value === repassword.value) {
                            const params = new URLSearchParams();
                            const uri = window.location.href.split('/');
                            console.log(uri.toString())
                                const parameters = uri[uri.length - 1].split('&');
                                console.log(parameters);
                                const userId = parameters[0];
                                const token = parameters[1];
                                console.log('userId ' + userId + " token " + token);
                                params.append('password', password.value);
                                params.append('userId', userId);
                                params.append('token', token);
                                reset(params);
                        } else {
                            alert("Passwords don't match");
                        }
                    } else {
                        alert("Password must be 6 character or more.");
                    }

                }

            },
        }
    }
}

);
</script>
<style scoped>

.container{
    margin: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 30px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
 }
 h1{
    color: white;
 }
 .btn-cancel{
    background-color: white;
    color: rgb(61, 36, 255);
    border-radius: 10px;
 }
 .btn-cancel:hover{
    color: white;
    background-color: rgb(47, 47, 50);
    border-radius: 10px;
 }
 .clearfix{
    margin: 5px;
 }
</style>
