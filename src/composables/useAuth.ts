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
    loggedUser: computed<User>(() => {
      return store.getters["auth/getUser"]
    }),
    logOut: () => {
      localStorage.removeItem("token");
      store.commit("auth/setToken", null);
      store.commit("auth/setLoggedUser", null);

      router.push({ name: "login" });
    },
    login: async (credentials: Credentials) => {
      await store.dispatch("auth/login", credentials);

      router.push({ name: "home" });
    },

    getProfile: (userId: string) => {
      store.dispatch("auth/getProfile", userId);
    },
    getUser: (userId: string) => {
      store.dispatch("auth/getUser", userId);
    },
    signup: async (user: URLSearchParams) => {
      await store.dispatch("auth/signup", user);
      router.push({ name: "home" });
    }
  };
};

export default useAuth;