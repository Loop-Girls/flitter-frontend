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
  
    logOut: () => {
      localStorage.removeItem("token");
      store.commit("auth/setToken", null);
      store.commit("auth/setUser", null);
      router.push({ name: "login" });
    },
    login: async (credentials: Credentials) => {
      await store.dispatch("auth/login", credentials);

      router.push({ name: "home" });
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
    resetPassword: async (email: string) => {
      await store.dispatch("auth/resetPassword", email);
    }
  };
};

export default useAuth;