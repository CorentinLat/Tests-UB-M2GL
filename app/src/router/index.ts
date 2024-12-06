import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeComponent from '../components/HomeComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'Home', meta: { needLogged: true }, component: HomeComponent },
    { path: '/login', name: 'Login', meta: { needNotLogged: true }, component: LoginComponent },
    { path: '/register', name: 'Register', meta: { needNotLogged: true }, component: RegisterComponent },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    if (to.meta.needLogged && !localStorage.getItem('token')) {
        next({ name: 'Login' });
    } else if (to.meta.needNotLogged && localStorage.getItem('token')) {
        next({ name: 'Home' });
    } else {
        next();
    }
});
