import { User } from "@/models/user";
export interface IUsersState {
    users: User[];
    isLoading: boolean;
    selectedUser: User | null;
  }
  
  function state(): IUsersState {
    return {
      isLoading: false,
      users: [],
      selectedUser: null,
    };
  }
  export default state;