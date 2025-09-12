import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import AdminColors from "@/views/AdminColors.vue";
import AdminFonts from "@/views/AdminFonts.vue";
import { useAuthStore } from "@/store/AuthStore";
import AdminImages from "@/views/AdminImages.vue";
import AdminVideos from "@/views/AdminVideos.vue";
import AdminLoader from "@/views/AdminLoader.vue";
import AdminUsers from "@/views/AdminUsers.vue";
import Settings from "@/views/Settings.vue";
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
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: "/admin/colors",
            name: "AdminColors",
            component: AdminColors,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: "/admin/fonts",
            name: "adminFonts",
            component: AdminFonts,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: "/admin/images",
            name: "AdminImages",
            component: AdminImages,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: "/admin/videos",
            name: "AdminVideos",
            component: AdminVideos,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: "/admin/loader",
            name: "AdminLoader",
            component: AdminLoader,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: "/admin/users",
            name: "AdminUsers",
            component: AdminUsers,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: "/settings",
            name: "Settings",
            component: Settings,
            meta: { requiresAuth: true },
        }
    ],
});

router.beforeEach((to) => {
    const authStore = useAuthStore();
    // requiere autenticación
    if (to.meta.requiresAuth && !authStore.isAuthenticated) return '/';
    // requiere rol admin
    if (to.meta.requiresAdmin) {
        const role = authStore.user?.role_user || authStore.user?.role || null;
        if (role !== 'admin') return '/';
    }
});

export default router;