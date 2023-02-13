import { Flit } from "@/models/flit";
import { MutationTree } from "vuex";
import { IFlitsState } from "./state";

const mutations: MutationTree<IFlitsState> = {
  setFlits(state: IFlitsState, flits: Flit[]) {
    state.flits= flits;
  },

  setIsLoading(state: IFlitsState, isLoading: boolean) {
    state.isLoading = isLoading;
  },

  setSelectedFlit(state: IFlitsState, flit: Flit) {
    state.selectedFlit = flit;
  },
  setLimitReached(state: IFlitsState, limit: boolean) {
    state.limitReached = limit;
  },

  
};

export default mutations;