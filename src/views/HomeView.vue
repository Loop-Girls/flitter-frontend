<template>
  <div class="home">
    
    <div v-if="isLoading">Cargando...</div>
    <div class="flit-list" v-else>
      <FlitComponent v-for="flit in flits" :key="flit._id" :flit="flit" :user="user" :loggedUser="loggedUser" />
    </div>
    <div class="search">
      <SearchbarComponent />
    </div>
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
    <div class="pagination">
      <PaginationComponent />
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent from '@/components/FlitComponent.vue';
import useFlits from '@/composables/useFlits';
import { useRouter } from 'vue-router';
import useAuth from '@/composables/useAuth';


export default defineComponent({
  name: 'HomeView',
  components: {
    CreateFlitButton,
    FlitComponent,
    PaginationComponent,
    SearchbarComponent,
  },
  setup() {
    const { flits, isLoading, getFlits } = useFlits();
    const {loggedUser} = useAuth();
    const router = useRouter();
    getFlits();
    let user = {
      "_id": "63e59ab4cc3789e79a97a73e",
      "username": "kyl",
      "email": "firstuser@fakemail.com",
      "password": "123456",
      "avatar": "",
      "followers": [],
      "following": [],
      "flits": [],


    }

    return {
      loggedUser,
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

</style>
