import { createStore } from "vuex";
import authModule from "./auth";
import flitsModule from "./flits";
import usersModule from "./users";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IState {}
export default createStore({
  modules: {
    flits: flitsModule,
    auth: authModule,
    users:usersModule
  },
});