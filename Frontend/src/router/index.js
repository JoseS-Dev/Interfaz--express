import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import AdminColors from "@/views/AdminColors.vue";
import AdminFonts from "@/views/AdminFonts.vue";
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
            component: Admin
        },
        {
            path: "/admin/colors",
            name: "AdminColors",
            component: AdminColors
        },
        {
            path: "/admin/fonts",
            name: "adminFonts",
            component: AdminFonts
        }
    ],
});

export default router;