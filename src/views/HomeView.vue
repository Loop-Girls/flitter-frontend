<template>
  <div class="home">
    
    <div v-if="isLoading">Cargando...</div>
    <div class="flit-list" v-else>
      <FlitComponent v-for="flit in flits" :key="flit._id" :flit="flit" :loggedUser="loggedUser" />
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
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent from '@/components/FlitComponent.vue';
import useFlits from '@/composables/useFlits';
import { useRouter } from 'vue-router';
import useAuth from '@/composables/useAuth';
import PaginationComponent from '@/components/PaginationComponent.vue';
import SearchbarComponent from '@/components/SearchbarComponent.vue';

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
    return {
      loggedUser,
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
