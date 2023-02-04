import flitterApi from "@/api/flitterApi";
import { Flit } from "@/models/flit";
import router from "@/router";
import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { IState } from "..";
import { IFlitsState } from "./state";

const actions: ActionTree<IFlitsState, IState> = {
  async getFlits({ commit }, filter: string | null) {
    // usamos la mutación para poner isLoading = true
    commit("setIsLoading", true);

    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar
    const url = `/flits${filter ? "/?"+filter +"=" + filter : ""}`;
    const { data } = await flitterApi.get<Flit, AxiosResponse<Flit>>(
      url
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    commit("setFlit", data);
  },

  async getFlitById({ commit }, id: string) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.get<Flit, AxiosResponse<Flit>>(
      `/flits/${id}`
    );

    commit("setSelectedProduct", data);

    commit("setIsLoading", false);
  },
  async createFlit({commit},body:{}){
    try {
        const { data } = await flitterApi.post("/flits", body);
        router.push("/");
    } catch (error) {
        alert("error, not created");
        console.log(error)   
    }
  }
};

export default actions;