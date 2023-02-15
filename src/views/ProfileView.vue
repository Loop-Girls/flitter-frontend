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
=======
    <div class="container">
      <div class="card" v-if="loggedUser">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="loggedUser.avatar"
              class="img-fluid rounded-start"
              :alt="loggedUser.username"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ loggedUser.username }}</h5>
              <p class="card-text">
                {{ loggedUser.email }}
              </p>
              <p class="card-text">
                <small class="text-muted">{{ loggedUser.role }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import useAuth from "@/composables/useAuth";
  export default {
    setup() {
      const { getProfile, loggedUser } = useAuth();
      
      getProfile();
      return {
        loggedUser,
      };
    },
  };
  </script>
  
  <style>
  </style>
>>>>>>> ec8174f6e0254f78b21e67b6a77697a355b6dd73
