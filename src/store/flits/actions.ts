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
    commit("setIsLoading", true);
    let privateFlits: AxiosResponse<Flit[]>[];

    const chronoFilter = 'date=-'
    // obtenemos los datos de manera asíncrona y vemos si hay que filtrar

    //loop usernames to get their flits
    followingUsers?.forEach(async (user: User) => {
      const url = `/flits${followingUsers ? "/?" + chronoFilter + "&exactAuthor=" + user.username : ""}`;
      await flitterApi.get<Flit[], AxiosResponse<Flit[]>>(
        url
      ).then(
        (resp) => {
          privateFlits.push(resp);
          // usamos la mutación para volcar los datos obtenidos en la variable del state users
          commit("setFlits", privateFlits);
        },
        (error) => console.log(error)
      );

    });


    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);


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
    
        return data;
      } catch (error) {
        alert(error);
        console.log(error)
      }
      router.push('/');
      commit("setIsLoading", false);
  },
  // async createFlit({commit}, flit:Object) {
  //   commit("setIsLoading", true);
  
  //     try {
  //       const { data } = await flitterApi.post('/flits/post', flit);
  //       return data;
  //     } catch (error) {
  //       alert(error);
  //       console.log(error)
  //     }
  
  //     commit("setIsLoading", false);
  // },
  async updateFlit({ commit }, body: Flit) {
    console.log('Body received' + body);
    try {
      const { data } = await flitterApi.put("/flits", {
        author: "vue",
        message: "flit from vue",
        "date": "2023-02-04T00:00:00.000Z",
        "kudos": [],
        "comments": [],
      });
      router.push("/");
    } catch (error) {
      alert(error);
      console.log(error)
    };

  },
};

export default actions;