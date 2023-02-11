<template>
  <div class="home">
    
    <div v-if="isLoading">Cargando...</div>
      <div class="flit-list" v-else>
        <FlitComponent
          v-for="flit in flits"
          :key="flit._id"
          :author="flit.author"
          :message="flit.message"
          :image="flit.image"
          :kudos="flit.kudos"
          :flit="flit"
          :user="user"
        />
    </div> 
    <div>
      <CreateFlitButton></CreateFlitButton>
    </div>
  </div>  
   
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent from '@/components/FlitComponent.vue';
import useFlits from '@/composables/useFlits';
/*import { useRouter } from 'vue-router';*/


export default defineComponent({
  name: 'HomeView',
  components: {
    CreateFlitButton,
    FlitComponent,
    
  },
  setup() {
    const { flits, isLoading, getFlits } = useFlits();
    
    let user = {
      "_id":"fakeid",
      "email":"firstUser@fakemail.com",
      "password":"123456",
      "username":"kyl",
      "role":"user",
      "avatar":"",
      "followers":[],
      "following":[]
    };
    getFlits();
    return {
      user,
      flits,
      isLoading,
     /* goDetail: (user: User) =>
        router.push({ name: "detail", params: { id: user.id } }),*/
    };
  },
});
</script>

<style scoped>
  .flit-list {
  margin-left: 2em;
  margin-right: 4em;
  margin-top: 5em;
  padding-right: 5em;
  flex-flow: row wrap;
  width: 100%;
  gap: 1rem 1rem;
}
</style>
