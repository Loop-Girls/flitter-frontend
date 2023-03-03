<template>
    <form novalidate @submit.prevent="submit" style="border:1px solid #ccc">
        <div class="container" style="border:1px solid #ccc">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required v-model="username">

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required v-model="email">

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required v-model="password">

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" required v-model="repassword">

            <!-- TODO: implement terms&Privacy href -->
            <p>By creating an account you agree to our <a style="color:dodgerblue">Terms & Privacy</a>.</p>
            <!-- TODO: select avatar image -->
            <div class="clearfix">
                <button type="button" class="btn-k">Cancel</button>
                <button type="submit" class="btn-k">Sign Up</button>
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
    setup() {
        const { signup, loggedUser } = useAuth();
        console.log(loggedUser);
        if (localStorage.getItem("user_id")) {
            router.push('/');
        }
        let email = ref<string>('');
        let password = ref<string>('');
        let repassword = ref<string>('');
        let username = ref<string>('');
        return {
            email,
            password,
            username,
            repassword,
            submit: (event: Event) => {
                // const form = event.target as HTMLFormElement;
                // if (form.checkValidity()) {
                //     const params = new URLSearchParams();
                //     params.append('email', email.value);
                //     params.append('username', username.value);
                //     params.append('password', password.value);
                //     signup(params);

                // } else {
                //     event.stopPropagation();
                // }
                if (username.value == '' || password.value == '' || email.value == '' || repassword.value == '') {
                    alert('Missing info')
                } else {
                    let username_regex = /^[A-Za-z]+$/;
                    let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    if (!username.value.match(username_regex)) {
                        alert('Not valid username.')
                    } else {
                        if (!email.value.match(regex)) {
                            alert('Not valid email.')
                        } else {
                            if (password.value.length >= 6) {
                                console.log(password.value + '=' + repassword.value)
                                if (password.value === repassword.value) {
                                    const params = new URLSearchParams();
                                    params.append('email', email.value);
                                    params.append('username', username.value);
                                    params.append('password', password.value);
                                    signup(params);
                                } else {
                                    alert("Passwords don't match");
                                }

                            } else {
                                alert("Password must be 6 character or more.");
                            }
                        }
                    }
                }

            },
        }
    }
}

);
</script>


<style scoped>
* {
    box-sizing: border-box
}

/* Full-width input fields */
input[type=text],
input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

input[type=text]:focus,
input[type=password]:focus {
    background-color: #ddd;
    outline: none;
}

hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}

/* Add padding to container elements */
.container {
    padding: 16px;
}



/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {

    .cancelbtn,
    .signupbtn {
        width: 100%;
    }
}
</style>