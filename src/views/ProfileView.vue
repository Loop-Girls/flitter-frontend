<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="button-container">
                        <button class="btn-k" @click="deleteUser(loggedUser._id)">Unsuscribe</button>
                    </div>
                </div>
                <CreateFlitButton></CreateFlitButton>
                <div v-if="isLoading">Cargando...</div>
                <div class="flit-list" v-else>
                    <SearchbarComponent :following=[]></SearchbarComponent>
                    <FlitComponent v-for="flit in flits" :key="flit._id" :flit="flit" :loggedUser="loggedUser" />
                </div>
            </div>
        </div>
    </div>

</template>


<script lang="ts">
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent from '@/components/FlitComponent.vue';
import SearchbarComponent from '@/components/SearchbarComponent.vue';
import useAuth from "@/composables/useAuth";
import useUsers from "@/composables/useUsers"
import { User } from "@/models/user";
import { defineComponent, resolveComponent, watch } from "vue";
import router from '@/router';
import useFlits from '@/composables/useFlits';
import flits from '@/store/flits';
export default defineComponent({
    name: 'ProfileView',
    components: {
        CreateFlitButton,
        FlitComponent,
        SearchbarComponent,
    },
    setup() {
        const { getProfile, loggedUser, deleteUserFromDB } = useAuth();
        const { getFlitsByUsername, flits, isLoading , getFlits} = useFlits();
        getProfile();
        watch(loggedUser, () => {
            if (loggedUser != null) {
                try {
                    console.log('getProfile ok' + loggedUser)
                    getFlitsByUsername(loggedUser.value.username);
                } catch (error) {
                    console.log('getProfile not ok');
                    console.log(error)
                }
            }
        });
        return {
            loggedUser,
            flits,
            isLoading,
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
<style>
.button-container{
    margin: 5px;
}
</style>