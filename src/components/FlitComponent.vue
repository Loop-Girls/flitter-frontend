<template>
    <div class="card">
        <div class="header">
            <p class="username">
                {{ flit.author }}
            </p>
            <p class="date">
                <!-- //TODO: change to nice date format -->
                {{flit.date}}
            </p>
            <!-- //TODO: implement bottons -->
            <button class="follow_btn" @click="$emit('unfollow', flit.author)" v-if="user.following.includes(flit.author) ">
                Unfollow
            </button>
            <button class="follow_btn"   v-else @click="follow(flit.author)">
                Follow
            </button>
        </div>
        <div class="message" v-if="flit.message">
            <p>{{ flit.message }}</p>
        </div>
        <div class="img" v-if="flit.image">
            <img :src="flit.image" />
        </div>
        <!-- //TODO:check if it works -->
        <div class="footer" v-if="flit.kudos.includes(user)">
            <button class="kudo_img" @click="$emit('giveKudo', flit)">Kudo</button>
            <p class="kudo_int">{{ flit.kudos.length }}</p>
        </div>
        <div class="footer" v-else>
            <p class="kudo_int">{{ flit.kudos.length }}</p>
            <button class="kudo_img" @click="$emit('removeKudo', flit)">Kudo</button>
        </div>
    </div>

</template>

<script lang="ts">
import useUsers from '@/composables/useUsers';
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
    },
    setup(props) {
        const {fetchUserByUsername, followUser} = useUsers();
        return {
            follow:async (username: string)=>{
                console.log(username);
                await fetchUserByUsername(username).then(
                    (resp)=>{
                        followUser(resp);
                    },
                    (error) =>{
                        console.log(error);
                    }
                );
            }
        };
    },
});
</script>
<style>
.card {
    border-style: solid;
    padding: 20px;
    border-color: rgb(217, 115, 195);
    border-radius: 10px;
    margin-bottom: 1px;
    
}
.card:hover {
    border-color: aqua;
 
    
}

.header, footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
img{
    max-width:100%;
}
.username{
    font-style: oblique;
    font-weight: 700;
}
</style>