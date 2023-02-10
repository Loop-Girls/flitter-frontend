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
  getLimit(state) {
    return state.limit;
  },
  getSkip(state) {
    return state.skip;
  },
};
export default getters;