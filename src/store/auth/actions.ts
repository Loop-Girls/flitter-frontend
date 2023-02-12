import flitterApi from "@/api/flitterApi";
import { Credentials } from "@/models/credentials";
import { Token } from "@/models/token";
import { User } from "@/models/user";
import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { IState } from "..";
import { IAuthState } from "./state";

const actions: ActionTree<IAuthState, IState> = {
  async getProfile({ commit }) {
    // usamos la mutación para poner isLoading = true
    commit("setIsLoading", true);

    // obtenemos los datos de manera asíncrona
    const { data } = await flitterApi.get<User, AxiosResponse<User>>(
      "/auth/profile"
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    commit("setLoggedUser", data);
  },
  async getUpdatedLoggedUser({ commit }, id) {
    console.log('getUpdatedLoggedUser ' + id)
    // usamos la mutación para poner isLoading = true
    commit("setIsLoading", true);

    // obtenemos los datos de manera asíncrona
    const { data } = await flitterApi.get<User, AxiosResponse<User>>(
      `/auth/profile/${id}`
    );

    // usamos la mutación para poner isLoading = false
    commit("setIsLoading", false);

    // usamos la mutación para volcar los datos obtenidos en la variable del state users
    commit("setLoggedUser", data);
  },
  async login({ commit }, credentials: Credentials) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.post("/auth/login", credentials);

    // commit("setToken", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.user._id);
    commit("setIsLoading", false);
    commit("setLoggedUser", data.user);
  },

  async signup({ commit }, user: URLSearchParams) {
    commit("setIsLoading", true);

    const { data } = await flitterApi.post("/auth/signup", user);

    // commit("setToken", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.savedUser._id);

    commit("setIsLoading", false);
    commit("setLoggedUser", data.savedUser);
  },
};

export default actions;