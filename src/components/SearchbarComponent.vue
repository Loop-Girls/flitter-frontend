<template>
    <div>
        <li v-for="flit in flits" :key="flit.author"></li>
        <li v-for="flit in flits" :key="flit.message"></li>
        <input
            type="text"
            placeholder="Search in Flitter"
            class="search-input"
            required
      />
      
    </div>
</template>


<script>

import { defineComponent } from "module";
import {useFlits}from '../composables'

export default defineComponent({
 setup() {
  const {searchByAuthor,searchByMessage} = useFlits() 
  return{
    searchByAuthor,
    searchByMessage
  }
 } 
})
 
</script>


<style scoped>
.search-input{
  position: fixed;
  top: 0;
  right: 70px;
  padding: 8px;
  border: 2px solid;
  background-color: transparent;
  cursor: pointer;
}

</style>