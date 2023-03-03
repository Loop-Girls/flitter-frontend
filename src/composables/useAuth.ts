import { Credentials } from "@/models/credentials";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { User } from "../models/user";

const useAuth = () => {
  const router = useRouter();
  const store = useStore();
  return {
    isAuthenticated: computed(() => {
      return store.getters["auth/isAuthenticated"];
    }),
    reset: async (email: URLSearchParams) => {
      await store.dispatch("auth/reset", email);
    },
    logOut: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      store.commit("auth/setToken", null);
      store.commit("auth/setUser", null);
      window.location.reload();
      router.push({ name: "login" });
    },
    login: async (credentials: Credentials) => {
      await store.dispatch("auth/login", credentials);
      router.push({ name: "private" });
    },
    loggedUser: computed<User>(() => store.getters["auth/getUser"]),
    getProfile: () => {
      store.dispatch("auth/getProfile");
    },
    signup: async (user: URLSearchParams) => {
      await store.dispatch("auth/signup", user);
      router.push({ name: "home" });
    },
    forgotPassword: async (email: URLSearchParams) => {
      await store.dispatch("auth/forgotPassword", email);
    },
    deleteUserFromDB: (user: string) => {
      store.dispatch("auth/deleteUserFromDB", user);
    }
  };
};

export default useAuth;