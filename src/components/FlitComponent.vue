<template>
    <div class="container" >
        <div class="product-details">
            <h2 class="author" href="/http://localhost:8080/#/">
                {{ flit.author }}
            </h2>
            <p class="date">
                <!-- //TODO: change to nice date format -->
                {{new Date(flit.date).toLocaleString()}}
            </p>
            <div class="info">
                <p>{{ flit.message }}</p>
            </div>

        <div class="product-imgage" v-if="flit.image">
            <img :src="flit.image" />
        </div>
            <!-- //TODO: implement bottons, change v-if in case following[] type changed to User -->
            <div class="control" v-if="loggedUser&&flit.author!=loggedUser.username">
                <button  class="unfollow" @click="unfollowUser(flit.author,loggedUser)"
                    v-if="loggedUser.following.includes(flit.author)">
                    Unfollow
                </button>
                <button class="follow" v-else @click=followUser(flit.author,loggedUser)>
                    Follow
                </button>

                <div id="kudo_btn" class="footer" v-if="loggedUser&&flit.author!=loggedUser.username">
            <button class="kudo_img" @click="removeKudoFromFlit(flit,loggedUser)" v-if="flit.kudos.includes(loggedUser.username)">Remove
                Kudo</button>
            <button class="kudo_img" @click="giveKudoFromFlit(flit,loggedUser)" v-else>Give Kudo</button>
        </div>
            </div>

        </div>
     
        
        <!-- //TODO:check if it works -->
        <div id="kudo_btn" class="footer" v-if="loggedUser&&flit.author!=loggedUser.username">
            <button class="give" @click="removeKudoFromFlit(flit,loggedUser)" v-if="flit.kudos.includes(loggedUser.username)">&#128534;</button>
            <button class="nogive" @click="giveKudoFromFlit(flit,loggedUser)" v-else>&#128525;</button>
        </div>
        <p class="lenght-kudos">  &#128525; {{ flit.kudos.length }}</p>
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
        const {giveKudo, removeKudo, getPrivateZoneFlits} = useFlits();
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
                     (resp)=> getPrivateZoneFlits(loggedUser.following),
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
                    (resp)=> getPrivateZoneFlits(loggedUser.following),
                    (error)=> alert('Oops, error.')
                );
            },
        };
    },
});
</script>
<style scoped>
body{
    background-image: url(https://img.freepik.com/vector-premium/fondo-degradado-triangulo-cuadrado-abstracto-telon-fondo-poligonal-color-hielo-fresco-aplicaciones-moviles-web-bandera-abstracta-geometrica-moda-folleto-concepto-tecnologia-estilo-mosaico_121461-3071.jpg?w=1060g)
}
.date{
    margin-left: 10%;
    font-size: 30px;
    color: rgb(36, 157, 255);
}
.container{
    background-color: rgb(255, 255, 255);
    padding: 30px;
    width: 80%;
    border-radius: 70px;
    left: 0;
    right: 0;
    margin: auto;
    margin-top: 50px;


}
.info{
    font-size: 30px;
    margin-right: 10%;
    margin-left: 10%;
}

.author{
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 50px;
}

.product-image{
margin-left:30%;
}
.puppy{
    width: auto;
    height: auto;
    border-radius: 15px;

}
.control{
margin-bottom: 10%;
margin-top: 5%;

}


.follow{
    background-color: rgb(36, 157, 255);
    width: 10%;
    height:50px;
    font-size: 20px;
    color: white;
    border-radius: 10px;
    float: right;

}

.unfollow{
    background-color: rgb(36, 157, 255);
    width: 10%;
    height:50px;
    font-size: 20px;
    color:white;
    border-radius: 10px;
    float: right;
    margin-right: 10px;

}

.give{
    font-size: 30px;
    padding:10px;
    border-radius: 50px;
    background-color: white;
    border: transparent;
    float: right;
    margin-right: 10px;
}

.nogive{
    font-size:30px;
    padding:10px;
    border-radius: 50px;
    background-color: white;
    border: transparent;
    float: right;
    margin-right: 10px;
}

.lenght-kudos{
    float: left;
    margin-left: 20px;
    font-size: 20px;
    background-color: rgb(153, 151, 151);
    padding:10px;
    border-radius: 10px;
}
</style>