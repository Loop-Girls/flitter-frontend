import { Flit } from "@/models/flit";

export interface IFlitsState {
  flits: Flit[];
  isLoading: boolean;
  selectedFlit: Flit | null;
  limitReached: boolean | null;
}

function state(): IFlitsState {
  return {
    isLoading: false,
    flits: [],
    selectedFlit: null,
    limitReached: false,
  };
}
export default state;