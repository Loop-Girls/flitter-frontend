import flitterApi from "@/api/flitterApi";
import { Flit } from "@/models/flit";
import router from "@/router";
import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { IState } from "..";
import { IUsersState } from "./state";
import { User } from "@/models/user"
import { IAuthState } from "../auth/state";

const actions: ActionTree<IUsersState, IState> = {
  async getUsers({ commit }, filter: string | null) {
    // usamos la mutación para poner isLoading = true
    commit("setIsLoading", true);
    //TODO: change sort dates
    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar
    const url = `/users${filter ? "/?" + filter + "=" + filter : ""}`;
    const { data } = await flitterApi.get<User[], AxiosResponse<User[]>>(
      url
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    commit("setUsers", data);
  },
 
  async getUserById({ commit }, id: string) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.get<User, AxiosResponse<User>>(
      `/users/${id}`
    );

    commit("setSelectedUser", data);
    commit("setIsLoading", false);
  },
  async unfollow({commit},info) {
    const id = info.id;
    console.log(id)
    const body = info.body;
    try {
      const {data} =await flitterApi.put(`/users/unfollow/id/${id}`, body);
      //update loggeduser
      window.location.reload();
      // router.push("/");
    }catch (error) {
      //  alert(error);
      console.log(error)
    }
   
  },
  async follow({commit},info) {
    const id = info.id;
    console.log(id)
    const body = info.body;
    try {
      const {data} =await flitterApi.put(`/users/follow/id/${id}`, body);
      console.log(data);
      //update loggeduser
       window.location.reload();
      //router.push("/");
    }catch (error) {
      //  alert(error);
      console.log(error)
    }
  },
};

export default actions;