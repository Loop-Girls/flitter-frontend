<template>
<<<<<<< HEAD
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <button class="btn btn-primary btn-block">UserData</button>
                        <button @click="delete(users)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</template>


<script lang="ts">
import useAuth from "@/composables/useAuth";
import {User} from "@/models/user";
import { defineComponent, resolveComponent } from "vue";
import router from'@/router';
export default defineComponent ({
    name:'ProfileView',
    setup () {
    const { getProfile, loggedUser } = useAuth();
    getProfile();
    return {
      loggedUser,
      delete:async (users:string, loggedUser:any) => {
        await delete(users).then(
            (resp) =>{
                delete();
            },
            (error) => confirm('¿Desea borrar la cuenta?')
            );
        },
    };
}
});
</script>
  
  
 
