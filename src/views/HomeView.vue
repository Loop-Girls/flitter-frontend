<template>
      <div class="search">
      <SearchbarComponent/>
    </div>
    <div v-if="isLoading">Cargando...</div>
    <div class="flit-list" v-else>
      <FlitComponent v-for="flit in flits" :key="flit._id" :flit="flit" :loggedUser="loggedUser" />
    </div>

    <div>
      <CreateFlitButton></CreateFlitButton>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
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
    SearchbarComponent,
    

  },
  setup() {
    const { flits, isLoading, getFlits, getPrivateZoneFlits } = useFlits();
    const { loggedUser, getUser } = useAuth();
    const router = useRouter();
    //TODO: get private flits if user logged.
    console.log('loggedUser?' +loggedUser.value);
    try {
      getUser(localStorage.getItem("user_id") ?? '');
      getPrivateZoneFlits(loggedUser.value.following);
    } catch (error) {
      getFlits();
      console.log(error)
    }
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
