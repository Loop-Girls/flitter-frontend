<template>
 
    <SearchbarComponent :following="[]" />

  <div v-if="isLoading">Cargando...</div>
  <div class="flit-list" v-else>
    <FlitComponentPublic v-for="flit in flits" :key="flit._id" :flit="flit" :loggedUser="loggedUser"
       />
  </div>

  <div v-if="loggedUser">
    <CreateFlitButton></CreateFlitButton>
  </div>

  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponentPublic from '@/components/FlitComponentPublic.vue';
import useFlits from '@/composables/useFlits';
import { useRouter } from 'vue-router';
import useAuth from '@/composables/useAuth';
import PaginationComponent from '@/components/PaginationComponent.vue';
import SearchbarComponent from '@/components/SearchbarComponent.vue';
import flits from '@/store/flits';
export default defineComponent({
  name: 'HomeView',
  components: {
    CreateFlitButton,
    FlitComponentPublic,
    SearchbarComponent,


  },
  setup() {
    const { flits, isLoading, getFlits, getPrivateZoneFlits } = useFlits();
    let { getProfile, loggedUser } = useAuth();
    const router = useRouter();
    //TODO: get private flits if user logged.
    // console.log('loggedUser?' + getProfile().value);

    console.log('gettingFlits')
    getFlits();
    let today_date = new Date(new Date());
    console.log(today_date);
 
    return {
      today_date,
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
