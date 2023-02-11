import { createStore } from "vuex";
import authModule from "./auth";
import flitsModule from "./flits";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IState {}
export default createStore({
  modules: {
    flits: flitsModule,
    auth: authModule
  },
});