<template>
    <div class="container">
        <div class="product-details">
            <h2 class="author" @click="goDetail(flit.author)">
                &#128044; {{ flit.author }}
            </h2>
            <p class="date">
                <!-- //TODO: change to nice date format -->
                {{ new Date(flit.date).toLocaleString() }}
            </p>
            <div class="info">
                <p>{{ flit.message }}</p>
            </div>

            <div class="product-image" v-if="flit.image">
                <img :src="flit.image" />
            </div>
            <!-- //TODO: implement bottons, change v-if in case following[] type changed to User -->
            <div class="control" v-if="loggedUser && flit.author != loggedUser.username">
                <button class="unfollow" @click="unfollowUser(flit.author, loggedUser)"
                    v-if="loggedUser.following.includes(flit.author)">
                    Unfollow
                </button>
                <button class="follow" v-else @click=followUser(flit.author,loggedUser)>
                    Follow
                </button>

                <div class="footer" v-if="loggedUser && flit.author != loggedUser.username">
                    <button class="nogive" @click="removeKudoFromFlit(flit, loggedUser)"
                        v-if="flit.kudos.includes(loggedUser.username)"> &#128534;</button>
                    <button class="give" @click="giveKudoFromFlit(flit, loggedUser)" v-else> &#128525;</button>
                    <p class="lenght-kudos"> &#128525; {{ flit.kudos.length }}</p>
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
body {
    background-image: url(https://img.freepik.com/vector-premium/fondo-degradado-triangulo-cuadrado-abstracto-telon-fondo-poligonal-color-hielo-fresco-aplicaciones-moviles-web-bandera-abstracta-geometrica-moda-folleto-concepto-tecnologia-estilo-mosaico_121461-3071.jpg?w=1060g)
}

.date {

    font-size: 20px;
    font-weight: bold;
    color: rgb(71, 73, 74);
    margin-left:auto;
    margin-right: auto;
}
.message{
    margin-left: auto;
    font-weight: bold;
}
.container {
    background-color: rgb(255, 255, 255);
    padding: 30px;
    border-radius: 70px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;

}

.info {
    word-wrap: break-word;
    margin-right: auto;
    margin-left: auto;
}

.author {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 60px;
    font-weight: bold;
}

.product-image {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.puppy {
    width: auto;
    height: auto;
    border-radius: 15px;

}

.control {
    margin-bottom: 10%;
    margin-top: 5%;

}


.follow {
    background-color: rgb(61, 36, 255);
    width: 20%;
    height: 40px;
    font-size: 15px;
    color: white;
    border-radius: 10px;
    float: right;
    margin-right: 10px;
    overflow: hidden;
}

.unfollow {
    background-color: rgb(61, 36, 255);
    width: 20%;
    height: 40px;
    font-size: 15px;
    color: white;
    border-radius: 10px;
    float: right;
    margin-right: 10px;
    overflow: hidden;

}


.give {
    font-size: 30px;
    border-radius: 50px;
    background-color: white;
    border: transparent;
    float: right;
    margin-right: 10px;
    
}

.nogive {
    font-size: 30px;
    border-radius: 50px;
    background-color: white;
    border: transparent;
    float: right;
    margin-right: 10px;
}

.lenght-kudos {
    float: left;
    margin-left: 20px;
    font-size: 30px;
    background-color:white(255, 252, 252);
    border-radius: 10px;
}

/* @media screen and (min-width: 768px) {
    .projects {
        grid-template-columns: repeat(3, 1fr);
    }
} */
</style>