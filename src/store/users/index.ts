import { Module } from "vuex";
import { IState } from "..";
import { IUsersState } from "./state";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const usersModule: Module<IUsersState, IState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default usersModule;