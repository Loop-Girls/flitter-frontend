import { GetterTree } from "vuex";
import { IState } from "..";
import { IUsersState } from "./state";

const getters: GetterTree<IUsersState, IState> = {
    getIsLoading(state) {
        return state.isLoading;
    },
    getUsers(state) {
        return state.users;
    },
    getSelectedUser(state) {
        return state.selectedUser;
    }
};
export default getters;