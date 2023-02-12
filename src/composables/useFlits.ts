import { Flit } from "../models/flit";
import { computed } from "vue";
import { useStore } from "vuex";
import { User } from "@/models/user";

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
    updateFlit: (flit_id: string, body: URLSearchParams)=>
      store.dispatch("flits/updateFlit", flit_id),
    searchByAuthor: (author: string) =>
      store.dispatch("flits/searchByAuthor", author),
    searchByMessage: (message: string) =>
      store.dispatch("flits/searchByMessage", message),
    getPrivateZoneFlits:(following: string[])=>
      store.dispatch("flits/getPrivateZoneFlits", following),
    giveKudo: (body: any)=>
      store.dispatch("flits/giveKudo", body),
    removeKudo: (body: any) =>
      store.dispatch("flits/removeKudo", body)
  };
};

export default useFlits;