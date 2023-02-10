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
            <div v-if="userIsLogged">
                <button class="follow_btn" @click="$emit('unfollow', flit.author)"
                    v-if="user.following.includes(flit.author)">
                    Unfollow
                </button>
                <button class="follow_btn" v-else @click="follow(flit.author)">
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
        <div id="kudo_btn" class="footer" v-if="userIsLogged">
            <button class="kudo_img" @click="$emit('giveKudo', flit)" v-if="flit.kudos.includes(user._id)">Kudo</button>
            <button class="kudo_img" @click="$emit('removeKudo', flit)" v-else>Kudo</button>

        </div>
        <p class="kudo_int">{{ flit.kudos.length }}</p>
    </div>

</template>

<script lang="ts">
// import useUsers from '@/composables/useUsers';
import { User } from '@/models/user';
import { defineComponent, PropType } from 'vue';
import { Flit } from '../models/flit';


export default defineComponent({
    name: "FlitComponent",
    props: {
        flit: {
            type: Object as PropType<Flit>,
            required: true,
        },
        user: {
            type: Object as PropType<User>,
            required: true,
        },
        userIsLogged: {
            type: Boolean,
            required: true,
        }
    },
    setup(props) {
        // const {fetchUserByUsername, followUser} = useUsers();
        return {
            follow: async (username: string) => {
                //TODO: waiting for useUsers composable implemented.
                // console.log(username);
                // await fetchUserByUsername(username).then(
                //     (resp)=>{
                //         followUser(resp);
                //     },
                //     (error) =>{
                //         console.log(error);
                //     }
                // );
            }
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