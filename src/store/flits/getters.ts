import { GetterTree } from "vuex";
import { IState } from "..";
import { IFlitsState } from "./state";

const getters: GetterTree<IFlitsState, IState> = {
  getIsLoading(state) {
    return state.isLoading;
  },
  getFlits(state) {
    return state.flits;
  },
  getSelectedFlit(state) {
    return state.selectedFlit;
  },
  getLimitReached(state){
    return state.limitReached;
  }
};
export default getters;