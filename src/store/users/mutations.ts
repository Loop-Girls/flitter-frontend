import { User } from "@/models/user";
import { MutationTree } from "vuex";
import { IUsersState } from "./state";

const mutations: MutationTree<IUsersState> = {
  setUsers(state: IUsersState, users: User[]) {
    state.users= users;
  },

  setIsLoading(state: IUsersState, isLoading: boolean) {
    state.isLoading = isLoading;
  },

  setSelectedUser(state: IUsersState, user: User) {
    state.selectedUser = user;
  },
  
};

export default mutations;