import { Flit } from "@/models/flit";

export interface IFlitsState {
  flits: Flit[];
  isLoading: boolean;
  selectedFlit: Flit | null;
  limit: number;
  skip: number;
}

function state(): IFlitsState {
  return {
    isLoading: false,
    flits: [],
    selectedFlit: null,
    limit: 6,
    skip: 0,
  };
}
export default state;