<template>
    <nav>
      <div class="title">
        <!-- <img  class="image" src="@/assets/logocircle1.png" /> -->
        <img class="logo" src="@/assets/logocirclewhite.png"/>

        <h4>{{ title }}</h4>
      </div>
      <div class="links" v-if="loggedUser">
        <button class="btn-k" @click="logout()" color="danger">
            <span class="glyphicon glyphicon-log-out"></span> Log out
        </button>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { Link } from "@/interfaces/link";
  import useAuth from "@/composables/useAuth";
  import ActionButton from "./ActionButton.vue";
  interface NavbarProps {
    title: string;
  }
  export default defineComponent({
    name: "NavBar",
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    setup(_props: NavbarProps, ctx) {
      const { logOut, isAuthenticated, loggedUser } = useAuth();
      return {
     
        logout:()=>{
            logOut();
            isAuthenticated;
        },
        loggedUser,
        isAuthenticated,
      
      };
    },
  });
  </script>
  
  <style scoped>
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    color: white;
  }
  h4 {
    color: white;
    margin-left: 10px;
    font-size: xx-large;
  }
 a{
  font-size: medium;
 }

  </style>
