import { User } from "@/models/user";
import { MutationTree } from "vuex";
import { IAuthState } from "./state";

const mutations: MutationTree<IAuthState> = {
  setLoggedUser(state: IAuthState, user: User) {
    state.loggedUser = user;
  },

  setIsLoading(state: IAuthState, isLoading: boolean) {
    state.isLoading = isLoading;
  },

  setToken(state: IAuthState, token: string) {
    state.token = token;
  },
};

export default mutations;