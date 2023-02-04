import axios, { AxiosHeaders } from "axios";

const flitterApi = axios.create({
  baseURL: "http://localhost:3000/apiv1/",
});

// flitterApi.interceptors.request.use((config) => {
//     const token = localStorage.getItem('access_token') ?? '';
//   if(token) {
//     //TODO: modified according to our api jwt implementation
//     (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`); // JWT
//   }
//   return config;
// });

export default flitterApi;