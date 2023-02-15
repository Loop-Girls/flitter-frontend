import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import CreateFlitView from '../views/CreateFlitView.vue'
import LoginView from '../views/LoginView.vue'
import PrivateHomeView from '../views/PrivateHomeView.vue';
import ForgotPassword from '../views/ForgotPassword.vue'
import haveAuthGuard from "./authGuard";
import ProfileView from '../views/ProfileView.vue'

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
    component: HomeView //TODO: change
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
