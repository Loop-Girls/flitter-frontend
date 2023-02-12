
import SearchbarComponent from './components/SearchbarComponent.vue';


<template>
    <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/signup">Signup</router-link>|
    <router-link to="/login">Login</router-link>
    <SearchbarComponent></SearchbarComponent>
  </nav>  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SearchbarComponent from './components/SearchbarComponent.vue';
export default defineComponent({
  components: {
    SearchbarComponent,
  },
  }

  );
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
