import flitterApi from "@/api/flitterApi";
import { Flit } from "@/models/flit";
import router from "@/router";
import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { IState } from "..";
import { IFlitsState } from "./state";
import { User } from "@/models/user"

const actions: ActionTree<IFlitsState, IState> = {
  async getFlits({ commit }, filter: string | null) {
    // usamos la mutación para poner isLoading = true
    commit("setIsLoading", true);
    //TODO: change sort dates
    const chronoFilter = 'date=-'
    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar
    const url = `/flits${filter ? "/?" + chronoFilter + "&" + filter + "=" + filter : ""}`;
    const { data } = await flitterApi.get<Flit[], AxiosResponse<Flit[]>>(
      url
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    commit("setFlits", data);
  },
  async getPrivateZoneFlits({ commit }, followingUsers: User[] | null) {
    // usamos la mutación para poner isLoading = true
    // commit("setIsLoading", true);
    // let privateFlits:Flit[];
    // privateFlits = [];

    // const chronoFilter = 'date=-'
    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar

    //loop usernames to get their flits
    // followingUsers?.forEach(async (user: User) => {
    //   const url = `/flits${followingUsers ? "/?" + chronoFilter + "&exactAuthor=" + user.username : ""}`;
    //   await flitterApi.get(
    //     url
    //   ).then(
    //     (resp) => {
    //       privateFlits.push(resp.data);
          
    //     },
    //     (error) => console.log(error)
    //   );

    // });
    // privateFlits.sort(
      //TODO:
      // function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // return new Date(b.date) - new Date(a.date);
    // }
    // );
    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    // commit("setFlits", privateFlits);
    // usamos la mutación para poner isLoading = false
    // commit("setIsLoading", false);
  },

  async getFlitById({ commit }, id: string) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.get<Flit, AxiosResponse<Flit>>(
      `/flits/${id}`
    );

    commit("setSelectedFlit", data);

    commit("setIsLoading", false);
  },
  async createFlit({commit}, formData:FormData) {
    commit("setIsLoading", true);
    console.log('Body received' + FormData);
  
      try {
        const { data } = await flitterApi.post('/flits/post', formData);
        router.push('/');
        return data;
      } catch (error) {
        //  alert(error);
        console.log(error)
      }
   
      commit("setIsLoading", false);
  },
  async searchByAuthor({ commit }, author: string) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.get<Flit, AxiosResponse<Flit>>(
      `/flits/?${author}`
    );

    commit("setSelectedFlit", data);

    commit("setIsLoading", false);
  },
  async searchByMessage({ commit }, message: string) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.get<Flit, AxiosResponse<Flit>>(
      `/flits/?${message}`
    );

    commit("setSelectedFlit", data);

    commit("setIsLoading", false);
  },
  async updateLimit({ commit, dispatch }, limit: number): Promise<void> {
    try {
      commit("setLimit", limit);
      await dispatch("getFlits");
    } catch (err) {
      console.error(err);
    }
  },
  async updateSkip({ commit, dispatch }, skip: number): Promise<void> {
    try {
      commit("setSkip", skip);
      await dispatch("getFlits");
    } catch (err) {
      console.error(err);
    }
  },
  async giveKudo({commit}, info){
    console.log('remove kudo');
    let id = info._id;
    console.log(id)
    let body = info.body;
    try {
      const {data} =await flitterApi.put(`/flits/kudos/give/id/${id}`, body);
      console.log(data);
       window.location.reload();
      //router.push("/");
    }catch (error) {
      //  alert(error);
      console.log(error)
    }

  },
  async removeKudo({commit}, info){
    console.log('remove kudo');
    let id = info._id;
    console.log(id)
    let body = info.body;
    try {
      const {data} =await flitterApi.put(`/flits/kudos/remove/id/${id}`, body);
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