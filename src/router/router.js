import Main from "@/pages/Main"
import PostPage from "@/pages/PostPage"
import About from "@/pages/About"
import IndividualPost from "@/pages/IndividualPost"
import PostPageWithStore from "@/pages/PostPageWithStore"
import { createRouter, createWebHistory } from "vue-router"

    const routes = [
        {
            path: '/',
            component: Main
        },
        {
            path: '/posts',
            component: PostPage
        },
        {
            path: '/info',
            component: About
        }, 
        {
            path: '/posts/:id',
            component: IndividualPost
        }, 
        {
            path: '/store',
            component: PostPageWithStore
        }
    ]

    const router = createRouter({
        routes,
        history: createWebHistory(process.env.BASE_URL)
    })

    export default router