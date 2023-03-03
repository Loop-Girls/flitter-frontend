
<template>
  <NavBar class=title :title="'Flipper'"></NavBar>
  <NavBarLinks :links="links" />
  <router-view />
  <FooterBar class="footer">
    <img class="image" src="@/assets/logo.png" />
    <div class="link">
      <a class="footer-link" HREf="https://github.com/Andreapf13" target='_blank'> &#10024; Andrea
      </a>
      <a class="footer-link" HREf="https://github.com/CristinaMercedesNunez" target='_blank'>
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
    const { isAuthenticated } = useAuth();

    return {

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
:root {
  --main-color: rgb(37, 207, 215);
  --secondary-color: white;
  --text-color: #424040;
  --hover-color: #424040;
  --border-color:rgb(255, 255, 255);
  --flip-bg:black;
  --main-font: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

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
  height: 100vh;
  font-family: var(--main-font);
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  border-color: var(--secondary-color);
  color: var(--secondary-color);
  background-color: var(--flip-bg);
  border-radius: 10px;
  width: max-content;
  padding: 6px;
}

.btn-k:hover {
  width: max-content;
  /* border-color:  rgb(61, 36, 255); */
  /* border-color:  pink; */
  /* color: white; */
  /* color: pink; */
  color: var(--hover-color);
  border-color: var(--hover-color);
  border-radius: 10px;
}

.logo {
  width: 15%;
  max-width: 100px;
  height: auto;
  ;
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
  background-color: var(--flip-bg);
  text-align: center;
  padding: 1%;
  margin-top: auto;
  left: 0;
  bottom: 0;
  width: 100%;
  color: var(--text-color);
  text-align: center;
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
  color: var(--text-color);

}

.footer-link:hover {
  color: var(--text-color);
  ;
}

p {
  margin: 5px;
}

.link {
  display: flex;
  justify-content: space-between;
}

.lenght-kudos {
  font-size: 18px;
  border-radius: 10px;
  justify-content: center;
}

/* .footer-list{
    display: flex;
    justify-content:space-between;
    align-items: center;
    
} */
.likes {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  background-color: var(--secondary-color);
  padding: 25px;
  border-radius: 40px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  width: 90%;
  height: auto;
  border-color: var(--main-color);
  border-width: 3px;
  border-style: solid;


}
label {
  color: var(--text-color);
}

.btn-create {
  position: fixed;
  width: 70px;
  height: 70px;
  bottom: 60px;
  right: 15px;
  background-color: var(--secondary-color);
  border-color: var(--main-color);
  font-size: 40px;
  color: var(--main-color);
  border-radius: 50px;
  border-width: 5px;
  text-align: center;
  /* margin-bottom: 20px; */
  font-weight: bold;
  margin-right: 15px;
  margin-bottom: 10px;
}

.btn-create:hover {
  /* color:pink;
	border-color: pink; */
  color: var(--secondary-color);
  ;
  border-color: var(--secondary-color);
  ;
  background-color: var(--main-color);
}

.title-nav {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: black;
  color: var(--secondary-color);
}

.navbarlink {
  min-height: 30px;
  background-color: black;
}


.div-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
.search-btn {
  float: left;
    width: 20%;
    padding: 10px;
    background: var(--main-color);
    color: var(--secondary-color);
    border: 0px;
    border-left: none;
    border-radius: 0px;
    cursor: pointer;
 
}

.search-btn:hover {
  /* border-color: pink;
  color: pink; */
  color: var(--hover-color);
  border-color: var(--hover-color);
}

.search-btn::after {
  content: "";
  clear: both;
  display: table;
}
.searchbar{
  display: flex;
}
.btn-page{
  border-color: var(--secondary-color);
  border-style: solid;
  border-radius: 10px;
  background-color:var(--main-color);
  width: 40px;
  color: var(--secondary-color);
}
.btn-page:hover{
  color: var(--hover-color);
}

/* FlipComponent */

.card {
    position: relative;
    display: block;
    height: 100%;
    /* border-radius: calc(40 * 1px); */
    overflow: hidden;
    text-decoration: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    position: relative;
        display: block;
        min-width: 300px;
        min-width: 300px;
        max-width:  100vw;
        max-height: 300px;
        border-radius: calc(40 * 1px);
        overflow: hidden;
        text-decoration: none;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        border-color: var(--main-color);
        border-width: 0.5rem;
}

.date {

font-size: 15px;
font-weight: bold;
color: rgb(71, 73, 74);
margin-left:auto;
margin-right: auto;
}
.message{
word-wrap: break-word;
margin-right: auto;
margin-left: auto;
color: white;
}
.flip-container {
/* background-color: black; */
border-color: var(--flip-bg);
padding: 25px;
border-radius: 40px;
margin-right: auto;
margin-left: auto;
margin-top: 20px;
width: 100%;
height: auto;

border-width: 3px;
border-style: solid;


}
.flip-container:hover {
border-color: var(--main-color);
}

.info {
word-wrap: break-word;
margin-right: auto;
margin-left: auto;
}

.author {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 13x;
font-weight: bold;
color: black;
}
.message{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 12x;
font-weight: bold;
color: var(--text-color);
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

.give {
font-size: 25px;
border-radius: 50px;
border: transparent;
float: right;
margin-right: 10px;
background-color: transparent;
}

.nogive {
font-size: 25px;
border-radius: 50px;
border: transparent;
float: right;
margin-right: 10px;
background-color: transparent;
}

@media screen and (min-width: 768px) {
.projects {
    grid-template-columns: repeat(3, 1fr);
}
}
.btn-follow{
  margin: 5px;

  color: var(--secondary-color);
  background-color: var(--flip-bg);
  border-radius: 10px;
  width: max-content;
  padding: 6px;
}
.btn-follow:hover{

  color: var(--main-color);


}

</style>
