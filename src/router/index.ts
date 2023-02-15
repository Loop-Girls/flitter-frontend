import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import CreateFlitView from '../views/CreateFlitView.vue'
import LoginView from '../views/LoginView.vue'
import PrivateHomeView from '../views/PrivateHomeView.vue';
import ForgotPassword from '../views/ForgotPassword.vue'
import haveAuthGuard from "./authGuard";
import Profile from "../views/ProfileView.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/createFlit',
    name: 'create',
    component: CreateFlitView
  },
  {
    path: '/profile',
    name: 'profile',
    beforeEnter: [haveAuthGuard],
    component: Profile //TODO: change to ProfileView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/private',
    name: 'private',
    beforeEnter: [haveAuthGuard],
    component: PrivateHomeView
  },
  {
    path: '/forgot-password',
    name: 'forgot',
    component: ForgotPassword
  },
  // {
  //   path: "/users/:id",
  //   name: "user-detail",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "product-detail" */ "../views/ProfileDetailView.vue"
  //     ),
  //   props: (route) => {
  //     const id = route.params.id;
  //     return { id };
  //   },
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
