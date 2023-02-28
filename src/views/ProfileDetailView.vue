<template>
  <div class="view">
    <div v-if="!isLoading">
      <SearchbarComponent :following="[]"></SearchbarComponent>
      <FlitComponent v-for="flit in flits" :key="flit._id" :flit="flit" :loggedUser="loggedUser"></FlitComponent>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts">
import FlitComponent from "@/components/FlitComponent.vue";
import SearchbarComponent from "@/components/SearchbarComponent.vue";
import useAuth from "@/composables/useAuth";
import useFlits from "@/composables/useFlits";
import useUsers from "@/composables/useUsers";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  components: {
    FlitComponent,
    SearchbarComponent,
  },
  setup(props) {
    const { getFlitsByUsername, flits, isLoading } = useFlits();
    const { loggedUser } = useAuth();
    // let user = ref<User>();
    // fakeShopAPI
    //   .get<unknown, AxiosResponse<User>>(`/users/${props.id}`)
    //   .then((resp) => (user.value = resp.data));
    getFlitsByUsername(props.username);
    return {
      flits,
      isLoading,
      loggedUser
    };
  },
});
</script>
<style scoped>
</style>