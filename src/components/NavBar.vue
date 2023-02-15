<template>
    <nav>
      <div class="title">
        <h4>{{ title }}</h4>
      </div>
      <div class="links" v-if="loggedUser">
        <button @click="logout()" color="danger">
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
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    color: white;
  }
  h4 {
    color: white;
  }
  .links,
  .title {
    padding: 20px;
  }
  </style>
