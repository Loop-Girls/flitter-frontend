<template>
    <div class="card" >
        <div class="header">
            <a class="username" href="/http://localhost:8080/#/">
                {{ flit.author }}
            </a>
            <p class="date">
                <!-- //TODO: change to nice date format -->
                {{new Date(flit.date).toLocaleString()}}
            </p>
            <!-- //TODO: implement bottons, change v-if in case following[] type changed to User -->
            <div class="footer" v-if="loggedUser&&flit.author!=loggedUser.username">
                <button  class="follow_btn" @click="unfollowUser(flit.author,loggedUser)"
                    v-if="loggedUser.following.includes(flit.author)">
                    Unfollow
                </button>
                <button class="follow_btn" v-else @click=followUser(flit.author,loggedUser)>
                    Follow
                </button>
            </div>

        </div>
        <div class="message" v-if="flit.message">
            <p>{{ flit.message }}</p>
        </div>
        <div class="img" v-if="flit.image">
            <img :src="flit.image" />
        </div>
        <!-- //TODO:check if it works -->
        <div id="kudo_btn" class="footer" v-if="loggedUser&&flit.author!=loggedUser.username">
            <button class="kudo_img" @click="removeKudoFromFlit(flit,loggedUser)" v-if="flit.kudos.includes(loggedUser.username)">Remove
                Kudo</button>
            <button class="kudo_img" @click="giveKudoFromFlit(flit,loggedUser)" v-else>Give Kudo</button>
        </div>
        <p class="kudo_int">{{ flit.kudos.length }}</p>
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
        const {giveKudo, removeKudo, getPrivateZoneFlits,getFlits} = useFlits();
        const{getProfile} = useAuth();
        return {
            followUser: async (username: string, loggedUser:any) => {
                console.log('follow' +username);
                let body = new URLSearchParams();
                body.append("following", username)
                console.log(body);
                let data = {
                    "id": loggedUser._id,
                    "body": body
                }
                await follow(data).then(
                    (resp)=> {
                        // window.location.reload();
                        getProfile();
                    },
                    (error)=> alert('Oops, error.')
                );
            },
            unfollowUser: async (username: string,loggedUser:any) => {
                console.log('unfollow' +username);
                let body = new URLSearchParams();
                body.append("following", username)
                console.log(body);
                let data = {
                    "id": loggedUser._id, //TODO:change to id at some point
                    "body": body
                }
                 await unfollow(data).then(
                    (resp)=>  {
                        // window.location.reload();
                        // getPrivateZoneFlits(loggedUser.following),
                        getProfile();
                    },
                    (error)=> alert('Oops, error.')
                );

                // alert("Not implemented yet. You want to unfollow " + username);
            },
            removeKudoFromFlit: async (flit: Flit,loggedUser:any) => {
                let body = new URLSearchParams();
                body.append("kudos", loggedUser.username )//TODO:change to id at some point
                let info = {
                    "_id": flit._id,
                    "body": body
                }
                await removeKudo(info).then(
                     (resp)=> getFlits(),
                    // (resp)=> alert('unliked'),
                    (error)=> alert('Oops, error.')
                );
            },
            giveKudoFromFlit: async (flit: Flit,loggedUser:any) => {
                let body = new URLSearchParams();
                body.append("kudos", loggedUser.username )//TODO:change to id at some point
                let info = {
                    "_id": flit._id,
                    "body": body
                }
                await giveKudo(info).then(
                    (resp)=> getFlits(),
                    (error)=> alert('Oops, error.')
                );
            },
        };
    },
});
</script>
<style scoped>

    
.card {
    font-family: 'Courier New', Courier, monospace;
    border-style: solid;
    padding: 20px;
    border-color: rgb(37, 207, 215);
    border-radius: 0px;
    border-width: 2px;
    margin-left: auto;
    margin-right: auto;
}

.card:hover {
    border-color: #ffb000;


}

.header,
footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

img {
    max-width: 100%;
}

.username {
    font-style: oblique;
    font-weight: 700;
}
button{
    background-color: #ffb000;
    color:rgb(47, 55, 55);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    border-color: #ffb000;
    border-radius: 5px;
}
</style>