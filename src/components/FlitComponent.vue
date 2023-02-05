<template>
    <div class="header">
        <p class="username">
            {{flit.author}}
        </p>
        <p class="date">
            {{flit.date}}
        </p>
        <!-- //TODO: check if user follows this author -->
        <button class="follow_btn">
            Follow/Unfollow
        </button>
    </div>
    <div class="message" v-if="flit.message">
        <p>{{flit.message}}</p>
    </div>
    <div class="img" v-if="flit.image">
        <img {{ flit.image }} />
    </div>
    <!-- //TODO:check if it works -->
    <div class="footer"  v-if="flit.kudos.includes(user)"> 
        <button class="kudo_img" @click="$emit('giveKudo', flit)">Kudo</button>
        <p class="kudo_int">{{flit.kudos.length}}</p>
    </div>
    <div class="footer"  v-else>
        <button class="kudo_img" @click="$emit('removeKudo', flit)">Kudo</button>
        <p class="kudo_int">{{flit.kudos.length}}</p>
    </div>
</template>

<script lang="ts">
import { User } from '@/models/user';
import { defineComponent, PropType } from 'vue';
import {Flit} from '../models/flit';


export default defineComponent({
    name: "FlitComponent",
    props:{
        flit: {
        type: Object as PropType<Flit>,
        required: true,
        },
        user:{
            type: Object as PropType<User>,
            required: true,
        }
    },
    setup() {
        return {
        };
    },
});
</script>