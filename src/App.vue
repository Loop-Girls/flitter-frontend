
<template>
    
      <NavBarLinks :links="links"/>
    <router-view/>
  <FooterBar>
  <div class="link">
    <A HREf="https://github.com/Andreapf13" target='_blank' style="color:aliceblue">  &#10024; Andrea </A>
    <A HREf="https://github.com/CristinaMercedesNunez" target='_blank' style="color:aliceblue"> Cristina </A>
    <A HREf="https://github.com/Esthefani5" target='_blank' style="color:aliceblue"> Esteff </A>
    <A HREf="https://github.com/kyl03" target='_blank' style="color:aliceblue"> Karen </A>
    <A HREf="https://github.com/BeatrizMontero" target='_blank' style="color:aliceblue"> Beatriz  &#10024; </A>
  </div>
  </FooterBar>
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
        if (isAuthenticated.value) {
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
      }),
    };
  }
})
</script>

<style>
a{
  font-size: 30px;
  margin-right: 10px;
  font-weight: bold;
  text-decoration: none;

}
 body{
  background-image: url(https://img.freepik.com/vector-premium/fondo-degradado-triangulo-cuadrado-abstracto-telon-fondo-poligonal-color-hielo-fresco-aplicaciones-moviles-web-bandera-abstracta-geometrica-moda-folleto-concepto-tecnologia-estilo-mosaico_121461-3071.jpg?w=1060g);
  margin: 0;
    padding: 0;
  margin-bottom: 10%;}


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
