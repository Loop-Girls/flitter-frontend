<template>
  <nav class=navbarlink>
    <ul v-if="links">
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.link">{{ link.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">

import { Link } from "@/interfaces/link";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    links: {
      type: Array as PropType<Link[]>,
    }
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
ul {
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  margin: 0px;
}

a {
  color: white;
  text-decoration: none;
  font-size: medium;
}
a:hover{
  color: grey;
}

a:visited {
  color: white;
}

</style>