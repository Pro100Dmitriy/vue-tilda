import {createRouter, createWebHistory} from "vue-router"

import MainPage from "@/pages/MainPage"
import ProjectPage from "@/pages/ProjectPage"
import EditProjectPage from "@/pages/EditProjectPage"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainPage
        },
        {
            path: '/project/:projectId',
            params: { projectId: 'public' },
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