export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    following: User[];
    followers:User[];
  }