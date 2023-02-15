<template>
  <div v-if="!isLoading">
     <SearchbarComponent :following="[]"></SearchbarComponent>
    <FlitComponent v-for="flit in flits" :key="flit._id" :flit="flit"></FlitComponent>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import FlitComponent from "@/components/FlitComponent.vue";
import SearchbarComponent from "@/components/SearchbarComponent.vue";
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
  components:{
    FlitComponent,
    SearchbarComponent,
  },
  setup(props) {
    const { getFlitsByUsername, flits, isLoading} = useFlits();
    // let user = ref<User>();
    // fakeShopAPI
    //   .get<unknown, AxiosResponse<User>>(`/users/${props.id}`)
    //   .then((resp) => (user.value = resp.data));
    getFlitsByUsername(props.username);
    return {
      flits,
      isLoading
    };
  },
});
</script>