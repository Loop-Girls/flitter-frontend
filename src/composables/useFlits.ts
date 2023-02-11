import { Flit } from "../models/flit";
import { computed } from "vue";
import { useStore } from "vuex";

const useFlits = () => {
  const store = useStore();

  return {
    flits: computed<Flit[]>(() => store.getters["flits/getFlits"]),
    isLoading: computed(() => store.getters["flits/getIsLoading"]),
    selectedFlit: computed<Flit>(() => store.getters['flits/getSelectedFlit']),
    flit: computed(() => store.getters["flits/getFlit"]),


    getFlits: (filter?: string) =>
      store.dispatch("flits/getFlits", filter),
    getFlitById: (id: string) =>
      store.dispatch("flits/getFlitById", id),
    createFlit: (formData:FormData) =>
      store.dispatch('flits/createFlit', formData),
    updateFlit: (flit_id: string)=>
      store.dispatch("flits/updateFlit", flit_id),
    searchByAuthor: (author: string)=>
      store.dispatch("flits/searchbyAuthor", author),
    searchByMessage: (message: string) =>
      store.dispatch("flits/SearhByMessage", message),
    updateLimit: (limit: number) =>
      store.dispatch("flits/updateLimit", limit),
    updateSkip: (skip: number) =>
      store.dispatch("flits/UpdateSkip", skip),
  };
};

export default useFlits;