// import vue router
import { createRouter, createWebHistory } from 'vue-router';

// define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },
]