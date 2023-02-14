<template>
    <div class="search">
        <SearchbarComponent :following="loggedUser.following" />
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
import { defineComponent, watch } from 'vue';
import CreateFlitButton from '@/components/CreateFlitButton.vue';
import FlitComponent from '@/components/FlitComponent.vue';
import useFlits from '@/composables/useFlits';
import { useRouter } from 'vue-router';
import useAuth from '@/composables/useAuth';
import PaginationComponent from '@/components/PaginationComponent.vue';
import SearchbarComponent from '@/components/SearchbarComponent.vue';
import flits from '@/store/flits';
import { buildDirectiveArgs } from '@vue/compiler-core';
export default defineComponent({
    name: 'PrivateHomeView',
    components: {
        CreateFlitButton,
        FlitComponent,
        SearchbarComponent,

    },
    setup() {
        const { flits, isLoading, getFlits, getPrivateZoneFlits } = useFlits();
        let { getProfile, loggedUser } = useAuth();
        const router = useRouter();
        //TODO: get private flits if user logged.
        // console.log('loggedUser?' + getProfile().value);
        let user_id = localStorage.getItem("user_id") ?? '';
        if (user_id != '') {
            getProfile();
        } else {
            router.push('/');
        }
        watch(loggedUser, () => {
            if (loggedUser != null) {
                try {
                    console.log('getProfile ok' + loggedUser)
                    getPrivateZoneFlits(loggedUser.value.following);
                } catch (error) {
                    console.log('getProfile not ok');
                    getFlits();
                    console.log(error)
                }
            }
        });
        watch(flits, () => {
            
        });
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
