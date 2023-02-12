import { User } from "@/models/user";
import { MutationTree } from "vuex";
import { IAuthState } from "./state";

const mutations: MutationTree<IAuthState> = {
  setUser(state: IAuthState, loggedUser: User) {
    state.loggedUser = loggedUser;
  },

  setIsLoading(state: IAuthState, isLoading: boolean) {
    state.isLoading = isLoading;
  },

  setToken(state: IAuthState, token: string) {
    state.token = token;
  },
};

export default mutations;