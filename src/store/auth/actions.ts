import flitterApi from "@/api/flitterApi";
import { Credentials } from "@/models/credentials";
import { Token } from "@/models/token";
import { User } from "@/models/user";
import router from "@/router";
import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { IState } from "..";
import { IAuthState } from "./state";

const actions: ActionTree<IAuthState, IState> = {
  // async getProfile({ commit }) {
  //   // usamos la mutación para poner isLoading = true
  //   commit("setIsLoading", true);

  //   // obtenemos los datos de manera asíncrona
  //   const { data } = await flitterApi.get<User, AxiosResponse<User>>(
  //     "/auth/profile"
  //   );

  //   // usamos la mutación para poner isLoading = false
  //   commit("setIsLoading", false);

  //   // usamos la mutación para volcar los datos obtenidos en la variable del state users
  //   commit("setUser", data);
  // },
  async getProfile({ commit }) {

    // usamos la mutación para poner isLoading = true
    commit("setIsLoading", true);

    // obtenemos los datos de manera asíncrona
    const { data } = await flitterApi.get<User, AxiosResponse<User>>(
      `/auth/profile/${localStorage.getItem('user_id') ?? ''}`
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    console.log('commit updated user ' + JSON.stringify(data));
    commit("setUser", data);

  },
  async login({ commit }, credentials: Credentials) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.post("/auth/login", credentials);
    console.log('login' + data);
    // commit("setToken", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.user._id);
    commit("setIsLoading", false);
    commit("setUser", data.user);
    window.location.reload();
    router.push('/private');
  },

  async signup({ commit }, user: URLSearchParams) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.post("/auth/signup", user);

    // commit("setToken", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.savedUser._id);

    commit("setIsLoading", false);
    commit("setUser", data.savedUser);

    window.location.reload();
    router.push('/private');
  },
<<<<<<< HEAD

  //Funcion delete data
=======
  async forgotPassword({ commit }, email: URLSearchParams) {

     await flitterApi.post("/auth/forgot", email).then(
      (res)=> {
        alert(res.data);
        router.push('/login');
      },
      (err)=> console.log(err)
    );
     
  },
>>>>>>> ec8174f6e0254f78b21e67b6a77697a355b6dd73
};

export default actions;