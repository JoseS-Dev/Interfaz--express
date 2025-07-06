import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import AdminColors from "@/views/AdminColors.vue";
import AdminFonts from "@/views/AdminFonts.vue";
import { useAuthStore } from "@/store/AuthStore";
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
            component: Admin,
            meta: { requiresAuth: true },
        },
        {
            path: "/admin/colors",
            name: "AdminColors",
            component: AdminColors,
            meta: { requiresAuth: true },
        },
        {
            path: "/admin/fonts",
            name: "adminFonts",
            component: AdminFonts,
            meta: { requiresAuth: true },
        }
    ],
});

router.beforeEach((to) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) return '/'; 
});

export default router;