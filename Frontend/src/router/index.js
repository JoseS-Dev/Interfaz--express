import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/admin",
            name: "Admin",
            component: 
        }
    ],
});

export default router;