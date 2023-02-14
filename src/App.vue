
<template>
    
      <NavBarLinks :links="links"/>
    <router-view/>
  <FooterBar>Karen Andrea Cristina Esthefani Beatriz</FooterBar>
</template>

<script lang="ts">
import FooterBar from './components/FooterBar.vue';
import NavBarLinks from './components/NavBarLinks.vue';
import { computed, defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import useAuth from './composables/useAuth';
export default defineComponent({
  name: "App",
  components: {
    FooterBar,
    NavBarLinks,
  },
  setup(){
    const { isAuthenticated } = useAuth();
    return {
      links: computed(() => {
        if (isAuthenticated) {
          return [
            { label: "Hello World", link: { name: "home" } },
            { label: "My world", link: { name: "private" } },
            { label: "Profile", link: { name: "profile" } },
          ];
        }else{
          return [
            { label: "Hello World", link: { name: "home" } },
            { label: "Signup", link: { name: "signup" } },
            { label: "Login", link: { name: "login" } },
          ];
        }
        return [];
      }),
    };
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
