export interface User {
    _id: number;
    email: string;
    password: string;
    username: string;
    avatar: string;
    following: string[]; //TODO: change to User when implemented
    followers:string[];//TODO: change to User when implemented
  }