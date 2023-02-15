import { computed } from "vue";
import { useStore } from "vuex";
import { User } from "@/models/user";

const useUsers = () => {
    const store = useStore();

    return {
        users: computed<User[]>(() => store.getters["users/getusers"]),
        isLoading: computed(() => store.getters["users/getIsLoading"]),
        selectedUser: computed<User>(() => store.getters['users/getSelectedUser']),

        getusers: (filter?: string) =>
            store.dispatch("users/getusers", filter),
        getUserById: (id: string) =>
            store.dispatch("users/getUserById", id),
        follow: (data: any) =>
            store.dispatch("users/follow", data),
        unfollow: (data: any) =>
            store.dispatch("users/unfollow", data)
   

    };
};

export default useUsers;