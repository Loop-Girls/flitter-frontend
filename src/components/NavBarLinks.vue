<template>
  <nav>
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
nav {
  min-height: 30px;
  background-color: rgb(37, 207, 215);
}

ul {
  display: flex;
  justify-content: center;
  list-style: none;
}

li {
  margin: 1rem;
  font-weight: bold;
}

li:hover {
  margin: 1rem;
  font-weight: bold;
  color: hotpink;
}

a {
  color: white;
  text-decoration: none;
}

a:visited {
  color: white;
}
</style>