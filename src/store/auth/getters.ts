import { GetterTree } from "vuex";
import { IState } from "..";
import { IAuthState } from "./state";

const getters: GetterTree<IAuthState, IState> = {
  getIsLoading(state) {
    return state.isLoading;
  },
  getUser(state) {
    return state.loggedUser;
  },
  getToken(state) {
    return state.token;
  },
  isAuthenticated(state) {
    let token = state.token;
    
    if (!token) {
      token = localStorage.getItem("token");
    }

    // Devolvemos si true si el token es distinto de null
    
    return !!token;
  },

};
export default getters;