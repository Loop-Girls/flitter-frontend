import { Flit } from "@/models/flit";

export interface IFlitsState {
  flits: Flit[];
  isLoading: boolean;
  selectedFlit: Flit | null;
}

function state(): IFlitsState {
  return {
    isLoading: false,
    flits: [],
    selectedFlit: null,
  };
}
export default state;