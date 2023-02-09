<template>
  <div class="home">
    <div v-if="isLoading">Cargando...</div>
    <div class="flit-list" v-else>
      <FlitComponent2 v-for="flit in flits" :key="flit._id" :flit="flit" :user="user" />
    </div>
    <!-- <div class="search">
      <SearchbarComponent />
    </div> -->
    <div>
      <CreateFlitButton></CreateFlitButton>
    </div>
    <!-- <div class="pagination">
      <PaginationComponent />
    </div> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
/*import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src*/
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent2 from '@/components/FlitComponent2.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import SearchbarComponent from '@/components/SearchbarComponent.vue';
import useFlits from '@/composables/useFlits';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'HomeView',
  components: {
    /*HelloWorld,*/
    CreateFlitButton,
    FlitComponent2,
    // PaginationComponent,
    // SearchbarComponent,
  },
  setup() {
    const { flits, isLoading, getFlits } = useFlits();
    const router = useRouter();

    getFlits();
    let user = {
      "_id": "fakeid",
      "email": "firstUser2@fakemail.com",
      "password": "123456",
      "username": "FlitterFan",
      "role": "user",
      "avatar": "",
      "following": [],
      "followers":[],

    }
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

</style>
