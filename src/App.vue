
<template>
    <nav>
    <router-link to="/">Hello World</router-link> |
    <router-link to="/private">My World</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/signup">Signup</router-link>|
    <router-link to="/login">Login</router-link>
  </nav>  <router-view/>
  <FooterBar>Karen Andrea Cristina Esthefani Beatriz</FooterBar>
</template>

<script lang="ts">
import FooterBar from './components/FooterBar.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: "App",
  components: {
    FooterBar,
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
