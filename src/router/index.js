import {createRouter, createWebHashHistory} from "vue-router"

import MainPage from "@/pages/MainPage"
import AboutPage from "@/pages/AboutPage"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainPage
        },
        {
            path: '/about',
            name: 'About',
            component: AboutPage
        }
    ]
})

export default router