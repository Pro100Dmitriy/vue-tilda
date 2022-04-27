import {createRouter, createWebHashHistory} from "vue-router"

import MainPage from "@/pages/MainPage"
import ProjectPage from "@/pages/ProjectPage"
import EditProjectPage from "@/pages/EditProjectPage"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainPage
        },
        {
            path: '/:projectId',
            name: 'Project',
            component: ProjectPage
        },
        {
            path: '/page/:projectId',
            name: 'Edit Project',
            component: EditProjectPage
        }
    ]
})

export default router