<template>
    <div class="flip-container">
     <div class="product-details">
         <div class="flip-header">
                <h2 class="author" @click="goDetail(flit.author)">
                &#128044; {{ flit.author }} 
                </h2>
                <div class="follow" v-if="loggedUser&&flit.author!=loggedUser.username">
                    <button class="btn-follow" @click="unfollowUser(flit.author, loggedUser)"
                    v-if="loggedUser.following.includes(flit.author)">
                    Unfollow
                    </button>
                    <button class="btn-follow" v-else @click=followUser(flit.author,loggedUser)>
                    Follow
                    </button>
                </div>
            </div>
         <p class="date">
             <!-- //TODO: change to nice date format -->
             {{ new Date(flit.date).toLocaleString() }}
         </p>
         <div class="message">
             <p>{{ flit.message }}</p>
         </div>

         <div class="product-image" v-if="flit.image">
             <img :src="flit.image" />
         </div>
         <!-- //TODO: implement bottons, change v-if in case following[] type changed to User -->
         <div class="footer-list">
             <div class="likes">
                 <p  class="lenght-kudos" style="filter: grayscale(100%)"   v-if="!loggedUser||flit.author==loggedUser.username"> {{ flit.kudos.length }}&#128525;</p>
                 <p  class="lenght-kudos"  v-else> {{ flit.kudos.length }}</p>
                 <div v-if="loggedUser && flit.author != loggedUser.username">
                 <button class="nogive" @click="removeKudoFromFlit(flit, loggedUser)"
                     v-if="flit.kudos.includes(loggedUser.username)"> &#128525;</button>
                 <button style="filter: grayscale(100%)" class="give" @click="giveKudoFromFlit(flit, loggedUser)" v-else>&#128525; </button> 
             </div>
             </div>
         </div>
</div>
</div>

</template>

<script lang="ts">
// import useUsers from '@/composables/useUsers';
import { User } from '@/models/user';
import { defineComponent, PropType } from 'vue';
import { Flit } from '../models/flit';
import useUsers from '../composables/useUsers'
import useAuth from '@/composables/useAuth';
import useFlits from '@/composables/useFlits';
import router from '@/router';


export default defineComponent({
    name: "FlitComponent",
    props: {
        flit: {
            type: Object as PropType<Flit>,
            required: true,
        },
        loggedUser: {
            type: Object as PropType<User>,
        }
    },
    setup(props) {
        const { getUserById, follow, unfollow } = useUsers();
        const { giveKudo, removeKudo, getPrivateZoneFlits } = useFlits();
        const { getProfile } = useAuth();
        return {
            followUser: async (username: string, loggedUser: any) => {
                console.log('follow' + username);
                let body = new URLSearchParams();
                body.append("following", username)
                console.log(body);
                let data = {
                    "id": loggedUser._id,
                    "body": body
                }
                await follow(data).then(
                    (resp) => {
                        // window.location.reload();
                        getProfile();
                    },
                    (error) => alert('Oops, error.')
                );
            },
            unfollowUser: async (username: string, loggedUser: any) => {
                console.log('unfollow' + username);
                let body = new URLSearchParams();
                body.append("following", username)
                console.log(body);
                let data = {
                    "id": loggedUser._id, //TODO:change to id at some point
                    "body": body
                }
                await unfollow(data).then(
                    (resp) => {
                        // window.location.reload();
                        // getPrivateZoneFlits(loggedUser.following),
                        getProfile();
                    },
                    (error) => alert('Oops, error.')
                );

                // alert("Not implemented yet. You want to unfollow " + username);
            },
            removeKudoFromFlit: async (flit: Flit, loggedUser: any) => {
                let body = new URLSearchParams();
                body.append("kudos", loggedUser.username)//TODO:change to id at some point
                let info = {
                    "_id": flit._id,
                    "body": body
                }
                await removeKudo(info).then(
                    (resp) => getPrivateZoneFlits(loggedUser.following),
                    // (resp)=> alert('unliked'),
                    (error) => alert('Oops, error.')
                );
            },
            giveKudoFromFlit: async (flit: Flit, loggedUser: any) => {
                let body = new URLSearchParams();
                body.append("kudos", loggedUser.username)//TODO:change to id at some point
                let info = {
                    "_id": flit._id,
                    "body": body
                }
                await giveKudo(info).then(
                    (resp) => getPrivateZoneFlits(loggedUser.following),
                    (error) => alert('Oops, error.')
                );
            },
            goDetail: (username:string) =>{
                router.push({ name: "detail", params: { username: username } })
            }
            
        };
    },
});
</script>
<style scoped>


</style>