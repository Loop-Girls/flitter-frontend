<template>
    <div class="card">
        <div class="header">
            <p class="username">
                {{ flit.author }}
            </p>
            <p class="date">
                <!-- //TODO: change to nice date format -->
                {{ flit.date }}
            </p>
            <!-- //TODO: implement bottons, change v-if in case following[] type changed to User -->
            <div v-if="loggedUser&&flit.author!=loggedUser.username">
                <button class="follow_btn" @click="unfollowUser(flit.author,loggedUser)"
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
            required: true,
        },
    },
    setup(props) {
        const { getUserById, follow, unfollow } = useUsers();

        const {giveKudo, removeKudo} = useFlits();
        return {
            followUser: async (username: string, loggedUser:any) => {
                console.log('follow' +username);
                let body = new URLSearchParams();
                body.append("following", username)
                console.log(body);
                let data = {
                    "id": loggedUser.value._id,
                    "body": body
                }
                follow(data)
            },
            unfollowUser:  (username: string,loggedUser:any) => {
                console.log('unfollow' +username);
                let body = new URLSearchParams();
                body.append("following", username)
                console.log(body);
                let data = {
                    "id": loggedUser.value._id, //TODO:change to id at some point
                    "body": body
                }
                 unfollow(data);

                // alert("Not implemented yet. You want to unfollow " + username);
            },
            removeKudoFromFlit: (flit: Flit,loggedUser:any) => {
                let body = new URLSearchParams();
                body.append("kudos", loggedUser.value.username )//TODO:change to id at some point
                let info = {
                    "_id": flit._id,
                    "body": body
                }
                removeKudo(info);
            },
            giveKudoFromFlit: (flit: Flit,loggedUser:any) => {
                let body = new URLSearchParams();
                body.append("kudos", loggedUser.value.username )//TODO:change to id at some point
                let info = {
                    "_id": flit._id,
                    "body": body
                }
                giveKudo(info);
            },
        };
    },
});
</script>
<style scoped>
.card {
    border-style: solid;
    padding: 20px;
    border-color: rgb(217, 115, 195);
    border-radius: 0px;
    border-width: 2px;
    margin-left: auto;
    margin-right: auto;
}

.card:hover {
    border-color: gray;


}

.header,
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

img {
    max-width: 100%;
}

.username {
    font-style: oblique;
    font-weight: 700;
}
</style>