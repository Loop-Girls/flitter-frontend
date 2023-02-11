import { User } from "@/models/user";

export interface IAuthState {
  loggedUser: User | null;
  isLoading: boolean;
  token: string | null;
}

function state(): IAuthState {
  return {
    isLoading: false,
    loggedUser: null,
    token: null,
  };
}
export default state;