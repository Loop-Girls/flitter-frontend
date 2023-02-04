import fakeShopApi from "@/api/flitterApi";
import { Flit } from "@/models/flit";
import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { IState } from "..";
import { IFlitsState } from "./state";

const actions: ActionTree<IFlitsState, IState> = {
  async getFlits({ commit }, filter: string | null) {
    // usamos la mutación para poner isLoading = true
    commit("setIsLoading", true);

    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar
    const url = `/flits${filter ? "/?author=" + filter : ""}`;
    const { data } = await fakeShopApi.get<Flit, AxiosResponse<Flit>>(
      url
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    commit("setProducts", data);
  },

  async getProductById({ commit }, id: string) {
    commit("setIsLoading", true);

    const { data } = await fakeShopApi.get<Flit, AxiosResponse<Flit>>(
      `/flits/${id}`
    );

    commit("setSelectedProduct", data);

    commit("setIsLoading", false);
  },
};

export default actions;