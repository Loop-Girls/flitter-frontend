<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <button class="btn btn-primary btn-block">UserData</button>
                        <button @click="deleteUser(loggedUser._id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script lang="ts">
import useAuth from "@/composables/useAuth";
import useUsers from "@/composables/useUsers"
import { User } from "@/models/user";
import { defineComponent, resolveComponent } from "vue";
import router from '@/router';
export default defineComponent({
    name: 'ProfileView',
    setup() {
        const { getProfile, loggedUser, deleteUserFromDB } = useAuth();
        getProfile();
        return {
            loggedUser,
            deleteUser: (username: string) => {
                if (confirm('Are you sure?')) {
                    // Save it! 
                    try {
                        deleteUserFromDB(username);
                    } catch (error) {
                        alert(error);
                    }
                    
                } else {
                    // Do nothing!
                }
            },
        }
    }
});
</script>
