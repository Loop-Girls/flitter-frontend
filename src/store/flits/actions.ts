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
    commit("setLimitReached", false);
    commit("setIsLoading", true);
    //TODO: change sort dates
    const chronoFilter = 'date=-'
    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar
    const url = `/flits${filter ? "/?message=" + filter+'&skip=0&limit=5' : "/?skip=0&limit=5"}`;
    const { data } = await flitterApi.get<Flit[], AxiosResponse<Flit[]>>(
      url
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);


    if(data.length>0){
      commit("setFlits", data);
      commit("setLimitReached", false);
    }
    if(data.length<5){
      commit("setLimitReached", true);
    }
    if(data.length==0&&filter!=undefined){
      commit("setFlits", data);
    }
     
  

  },
  async getFlitsByUsername({ commit }, filter: string | null) {
    // usamos la mutación para poner isLoading = true
    console.log('user flits')
    commit("setLimitReached", false);
    commit("setIsLoading", true);
    //TODO: change sort dates
    const chronoFilter = 'date=-'
    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar
    const url = `/flits${filter ? "/?author=" + filter+'&skip=0&limit=5' : "/?skip=0&limit=5"}`;
    const { data } = await flitterApi.get<Flit[], AxiosResponse<Flit[]>>(
      url
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);


    if(data.length>0){
      commit("setFlits", data);
      commit("setLimitReached", false);
    }
    if(data.length<5){
      commit("setLimitReached", true);
    }
    if(data.length==0&&filter!=undefined){
      commit("setFlits", data);
    }
     
  

  },
  async getPrivateZoneFlits({ commit }, followingUsers: string[] | []) {
    //usamos la mutación para poner isLoading = true
    commit("setLimitReached", false);
    commit("setIsLoading", true);
    let url = '';
    //create string of following users to pass as a query param
    if(followingUsers?.length>0){
      let filter = '';
      followingUsers?.forEach((following:string)=>{
        filter+= following+','
      });
      console.log('getprivate' +filter);
      // const ultimateFilter = filter.slice(',',-1);
      // console.log(ultimateFilter);
       url = `/flits/private/?author=${followingUsers.toString()}&skip=0&limit=5`;
    }else{
      url = "/flits/?skip=0&limit=5";
    }
    
    try {
      const {data} =await flitterApi.get(
        url
         );
         if(data.length>0){
          commit("setFlits", data);
         }else{
          commit("setLimitReached", true);
         }
   
     // usamos la mutación para poner isLoading = false
     commit("setIsLoading", false);
    } catch (error) {
      console.log(error);
    }

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
        commit("setIsLoading", false);
        return data;
      } catch (error) {
        //  alert(error);
        console.log(error)
      }
   

    
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
    const id = info._id;
    console.log(id)
    const body = info.body;
    try {
      const {data} =await flitterApi.put(`/flits/kudos/give/id/${id}`, body);
      console.log(data);
      //  window.location.reload();
      //router.push("/");
    }catch (error) {
      //  alert(error);
      console.log(error)
    }

  },
  async removeKudo({commit}, info){
    console.log('remove kudo');
    const id = info._id;
    console.log(id)
    const body = info.body;
    try {
      const {data} =await flitterApi.put(`/flits/kudos/remove/id/${id}`, body);
      console.log(data);
      //update loggeduser
      //  window.location.reload();
      //router.push("/");
    }catch (error) {
      //  alert(error);
      console.log(error)
    }
  },
  async fetchFlitsPage({ commit }, filter: any) {

    // usamos la mutación para poner isLoading = true
    commit("setLimitReached", false);
    commit("setIsLoading", true);
    const message = filter.message;
    const previous_limit = filter.offset;
    console.log('message'+ message)
    // obtenemos los datos de manera asíncrona ?skip=1&limit=1
    let url = '';
    const user_id = localStorage.getItem('user_id')??'';
    if(user_id){
      if(message!=undefined){
        url =  message;
      }
    }else{
      if(message!=undefined){
        url =  message;
      }else{
        url =  message;
      }
    }
   
  
    const { data } = await flitterApi.get<unknown, AxiosResponse<Flit[]>>(
      url
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state products
    if(data.length>0){
      commit("setFlits", data);
      commit("setLimitReached", false);
    }
    if(data.length<5){
      commit("setLimitReached", true);
    }
    // if(data.length==0&&message!=undefined){
    //   commit("setFlits", data);
    // }

  },
};

export default actions;