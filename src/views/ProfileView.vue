<!-- <template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <button class="btn btn-primary btn-block">UserData</button>
                        <button @click="delete(users)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<script lang="ts">
import FlitComponent from "@/components/FlitComponent.vue";
import useAuth from "@/composables/useAuth";
import useFlits from "@/composables/useFlits";
import useUsers from "@/composables/useUsers";
import flits from "@/store/flits";
import { defineComponent, watch } from "vue";
export default defineComponent({
    components: {
        FlitComponent,
    },
    setup(props) {
        const { getFlitsByUsername, flits, isLoading } = useFlits();
        const { loggedUser } = useAuth();
        // let user = ref<User>();
        // fakeShopAPI
        //   .get<unknown, AxiosResponse<User>>(`/users/${props.id}`)
        //   .then((resp) => (user.value = resp.data));
        watch(loggedUser, () => {
            if (loggedUser != null) {
                try {
                    console.log('getProfile ok' + loggedUser)
                    getFlitsByUsername(loggedUser.value.username);
                } catch (error) {
                    console.log(error)
                }
            }
        });
        return {
            loggedUser,
            flits,
            isLoading
        };
    },
});
</script> -->

