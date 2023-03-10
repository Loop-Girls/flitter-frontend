import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import CreateFlitView from '../views/CreateFlitView.vue'
import LoginView from '../views/LoginView.vue'
import PrivateHomeView from '../views/PrivateHomeView.vue';
import ForgotPassword from '../views/ForgotPassword.vue'
import haveAuthGuard from "./authGuard";
import Profile from "../views/ProfileView.vue";
import ErrorView from "../views/ErrorView.vue";


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
  {
    path: "/:username",
    name: "detail",
    component: () =>
      import(
        /* webpackChunkName: "user-detail" */ "../views/ProfileDetailView.vue"
      ),
    props: (route) => {
      const username = route.params.username;
      return { username };
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: 'error',
    component: ErrorView
  },
  {
    path: "/reset-password/:id&:token",
    name: "reset",
    component: () =>
      import(
        /* webpackChunkName: "user-detail" */ "../views/ResetPasswordView.vue"
      ),

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
