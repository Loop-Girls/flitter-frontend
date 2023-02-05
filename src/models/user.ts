export interface User {
    _id: number;
    email: string;
    password: string;
    username: string;
    avatar: string;
    following: User[];
    followers:User[];
  }