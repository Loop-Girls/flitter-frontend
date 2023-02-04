import { Flit } from "../models/flit";
import { computed } from "vue";
import { useStore } from "vuex";

const useFlits = () => {
  const store = useStore();

  return {
    flits: computed<Flit>(() => store.getters["flits/getFlits"]),
    selectedFlit: computed<Flit>(() => store.getters['flits/getSelectedFlit']),
    getFlits: (filter?: string) =>
      store.dispatch("flits/getFlits", filter),
    getFlitById: (id: string) =>
      store.dispatch("flits/getFlitById", id),
    createFlit: (flit: Flit) =>
      store.dispatch('flits/createFlit', flit)
  };
};

export default useFlits;