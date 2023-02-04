import { Module } from "vuex";
import { IState } from "..";
import { IFlitsState } from "./state";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const productsModule: Module<IFlitsState, IState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default productsModule;