import { Module } from "vuex";
import { IState } from "..";
import { IAuthState } from "./state";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const authModule: Module<IAuthState, IState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default authModule;