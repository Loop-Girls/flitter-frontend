
<template>
  <NavBar class=title :title="'Flipper'"></NavBar>
  <NavBarLinks :links="links" />
  <router-view />
  <FooterBar class="footer">
    <img class="image" src="@/assets/logo.png" />
    <div class="link">
      <a class="footer-link" HREf="https://github.com/Andreapf13" target='_blank' > &#10024; Andrea
      </a>
      <a class="footer-link" HREf="https://github.com/CristinaMercedesNunez" target='_blank' >
        Cristina </a>
      <a class="footer-link" HREf="https://github.com/Esthefani5" target='_blank'> Esteff </a>
      <a class="footer-link" HREf="https://github.com/kyl03" target='_blank'> Karen </a>
      <a class="footer-link" HREf="https://github.com/BeatrizMontero" target='_blank'> Beatriz
        &#10024; </a>
    </div>
  </FooterBar>
</template>

<script lang="ts">
import FooterBar from './components/FooterBar.vue';
import NavBarLinks from './components/NavBarLinks.vue';
import NavBar from './components/NavBar.vue'
import { computed, defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import useAuth from './composables/useAuth';
export default defineComponent({
  name: "App",
  components: {
    FooterBar,
    NavBarLinks,
    NavBar,
  },
  setup() {
    const { isAuthenticated, getProfile } = useAuth();
    getProfile();
    return {
      getProfile,
      links: computed(() => {
        if (isAuthenticated.value) {
          return [
            { label: "Hello World", link: { name: "home" } },
            { label: "My world", link: { name: "private" } },
            { label: "Profile", link: { name: "profile" } },
          ];
        } else {
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
* {
  box-sizing: border-box;
  margin: 0;
}


section,
footer {
  overflow: hidden;
  white-space: wrap;
  word-break: break-word;
}

body {
  background-image: url(https://img.freepik.com/vector-premium/fondo-degradado-triangulo-cuadrado-abstracto-telon-fondo-poligonal-color-hielo-fresco-aplicaciones-moviles-web-bandera-abstracta-geometrica-moda-folleto-concepto-tecnologia-estilo-mosaico_121461-3071.jpg?w=1060g);
  margin: 0px;
  padding: 0px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


nav {
  font-weight: bold;
  background-color: black;
}

nav a.router-link-exact-active {
  color: #42b983;
}

img {
  max-width: 100%;
}


.btn-k {
  margin: 5px;
  border-color: white;
  color: white;
  background-color: #000000;
  border-radius: 10px;
  width: max-content;
  padding: 6px;
}

.btn-k:hover {
  width: max-content;
  /* border-color:  rgb(61, 36, 255); */
  border-color:  pink;
  /* color: white; */
  color: pink;
  border-radius: 10px;
}

.logo {
  width: 100px;
  max-width: 100px;
  height: auto;
  ;
}

.logo:hover {
  height: auto;
  ;
  background: url("@/assets/logocircle1.png");
}

.title {
  display: flex;
  align-items: center;
  padding: 10px;
}

.flit-list {
  padding: 10px;
}

.footer {
  /* position: fixed; */
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000;
  text-align: center;
  padding: 1%;
  margin-top: 5%;
}

.image {
  max-width: 50px;
  height: auto;
  border-radius: 15px;
}

a {
  margin: 5px;
  font-size: 12px;
  margin-right: 10px;
  font-weight: bold;
  color: white;

}

.footer-link:hover {
  color: aqua;
}

p {
  margin: 5px;
}

.link {
  display: flex;
  justify-content: space-between;
}</style>
