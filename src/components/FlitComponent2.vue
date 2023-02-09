<template>
    <div>
        <a class="card">
            <img :src="flit.image" class="card__image" alt="" v-if="flit.image"/>
            <img src="@/assets/A2.png"  class="small_flit" alt="" v-else="flit.image"/>
            <div class="card__overlay">
                <p class="card__header" v-if="flit.message">{{ flit.message }}</p>
                <div class="card__description">
                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z" />
                    </svg>
                    <img class="card__thumb" :src="user.avatar" alt="" v-if="user.avatar" />
                    <img class="card__thumb" src="@/assets/logo.png" alt="" v-else />
                    <div class="card__header-text">
                        <h3 class="card__title">{{ flit.author }}</h3>
                        <span class="card__status">{{ flit.date }}</span>
                    </div>
                    <!-- //TODO v-if user is logged -->
                    <div class="buttons">
                        <button class="follow_btn" @click="$emit('unfollow', flit.author)"
                            v-if="user.following.includes(flit.author)">
                            Unfollow
                        </button>
                        <button class="follow_btn" v-else @click="follow(flit.author)">
                            Follow
                        </button>
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
                </div>

            </div>
        </a>
       
    </div>




</template>

<script lang="ts">
// import useUsers from '@/composables/useUsers';
import { User } from '@/models/user';
import { defineComponent, PropType } from 'vue';
import { Flit } from '../models/flit';


export default defineComponent({
    name: "FlitComponent2",
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
* {
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: #fef8f8;
}

.card {
    position: relative;
    display: block;
    height: 100%;
    border-radius: calc(40 * 1px);
    overflow: hidden;
    text-decoration: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
}

.card__image {
    max-width: 100%;
    height: auto;
}
.small_flit{
    width: 100%;
    height: 200px;
}  

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .card {
        position: relative;
        display: block;
        min-width: 400px;
        min-width: 400px;
        max-width: 400px;
        max-height: 400px;
        border-radius: calc(40 * 1px);
        overflow: hidden;
        text-decoration: none;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
    }

    .card__image {
        height: auto;
        width: auto;
        max-width: 400px;
        max-height: 400px;
    }
}

.card__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    border-radius: calc(40 * 1px);
    background-color: #fff;
    transform: translateY(100%);
    transition: .2s ease-in-out;
}

.card:hover .card__overlay {
    transform: translateY(0);
}

.card__header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 1em;
    border-radius: calc(40 * 1px) 0 0 0;
    background-color: #fff;
    transform: translateY(-100%);
    transition: .2s ease-in-out;
}

.card__header_no_tr {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 1em;
    border-radius: calc(40 * 1px) 0 0 0;
    background-color: #fff;
}

.card__arc {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 100%;
    right: 0;
    z-index: 1;
}

.card__arc {
    fill: #fff;
}

.card:hover .card__header {
    transform: translateY(0);
}

.card__thumb {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.card__title {
    font-size: 1em;
    margin: 0 0 .3em;
    color: #6A515E;
}

.card__tagline {
    display: block;
    margin: 1em 0;
    font-family: "MockFlowFont";
    font-size: .8em;
    color: #D7BDCA;
}

.card__status {
    font-size: .8em;
    color: #D7BDCA;
}


.card__description {
    padding: 0 2em 1em;
    margin: 0;
    color: #D7BDCA;
    font-family: "MockFlowFont";
    display: -webkit-box;

    -webkit-line-clamp: 3;
    overflow: hidden;
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
button{
    border-radius: 5px;
    border-color:lightcoral;
    color: #fef8f8;
    background-color: lightcoral;
    font-family:'Courier New', Courier, monospace;
}
</style>