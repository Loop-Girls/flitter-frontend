<template>
  <div class="home">

    <div v-if="isLoading">Cargando...</div>
    <div class="flit-list" v-else>
      <FlitComponent v-for="flit in flits" :key="flit._id" :flit="flit" :user="loggedUser" :loggedUser="loggedUser" />
    </div>
    <div class="search">
      <SearchbarComponent />
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
/*import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src*/
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent from '@/components/FlitComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import SearchbarComponent from '@/components/SearchbarComponent.vue';
import useFlits from '@/composables/useFlits';
import { useRouter } from 'vue-router';
import useAuth from '@/composables/useAuth';


export default defineComponent({
  name: 'HomeView',
  components: {
    /*HelloWorld,*/
    CreateFlitButton,
    FlitComponent,
    PaginationComponent,
    SearchbarComponent,
  },
  setup() {
    const { flits, isLoading, getFlits} = useFlits();
    const { loggedUser } = useAuth();
    const router = useRouter();
    const { getUpdatedLoggedUser } = useAuth();
    let user_id = localStorage.getItem('user_id') ?? '';
    console.log(user_id);
    if (user_id != '') {
      getUpdatedLoggedUser(user_id);
    }
    getFlits();
    return {
      loggedUser,
      flits,
      isLoading,
      /* goDetail: (user: User) =>
         router.push({ name: "detail", params: { id: user.id } }),*/
    };
  },
  onBeforeMount: () => {

  }
});
</script>

<style scoped>

</style>
