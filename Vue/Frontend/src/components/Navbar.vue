<script setup>
import { useAuthStore } from "@/store/AuthStore";
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";

function getCssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

const authStore = useAuthStore();

const onClickMobileBtn = () => {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
};

const onToggleLogin = () => {
  const modal = document.getElementById("loginModal");
  modal.classList.toggle("hidden");
};

const onClickLinkMobile = () => {
  document.getElementById("mobile-menu").classList.add("hidden");
};

const onLogout = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Vas a cerrar tu sesión.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: getCssVar("--color-tertiary"),
    cancelButtonColor: getCssVar("--color-quinary"),
    confirmButtonText: "Sí, salir",
    cancelButtonText: "Cancelar",
    background: getCssVar("--color-primary"),
    color: getCssVar("--color-secondary"),
    customClass: {
      popup: "rounded-xl",
      confirmButton: "font-bold",
      cancelButton: "font-bold",
      title: "font-bold",
      htmlContainer: "font-primary",
    },
  });

  if (result.isConfirmed) {
    authStore.clearAuth();
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      background: getCssVar("--color-primary"),
      color: getCssVar("--color-secondary"),
      showConfirmButton: false,
      timer: 1200,
      customClass: {
        popup: "rounded-xl",
        title: "font-bold",
        htmlContainer: "font-primary",
      },
    });
    router.push("/");
  }
};
</script>

<template>
  <nav
    class="sticky top-0 z-50 shadow-sm bg-quaternary scroll-smooth font-primary"
  >
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <h1
            class="text-xl font-bold text-secondary font-secondary text-subtitle"
          >
            Bienestar Total
          </h1>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="onClickMobileBtn"
            id="mobile-menu-button"
            class="cursor-pointer text-quinary hover:text-secondary focus:outline-none"
          >
            <i class="text-xl fas fa-bars text-subtitle"></i>
          </button>
        </div>
        <!-- Desktop menu -->
        <div class="hidden md:block">
          <div class="flex items-baseline ml-10 space-x-4">
            <a
              href="#inicio"
              class="px-3 py-2 text-sm font-medium text-quinary hover:text-secondary scroll-smooth text-paragraph"
              >Inicio</a
            >
            <a
              href="#servicios"
              class="px-3 py-2 text-sm font-medium text-quinary hover:text-secondary text-paragraph"
              >Servicios</a
            >
            <a
              href="#galeria"
              class="px-3 py-2 text-sm font-medium text-quinary hover:text-secondary text-paragraph"
              >Galería</a
            >
            <a
              href="#contacto"
              class="px-3 py-2 text-sm font-medium text-quinary hover:text-secondary text-paragraph"
              >Contacto</a
            >
            <button
              v-if="!authStore.isAuthenticated"
              @click="onToggleLogin"
              class="px-4 py-2 text-sm font-medium rounded-md cursor-pointer bg-secondary hover:bg-secondary/75 text-quaternary text-paragraph"
            >
              Login
            </button>
            <RouterLink
              v-else
              to="/admin"
              class="px-3 py-2 text-sm font-medium text-quinary hover:text-secondary text-paragraph"
              >Settings</RouterLink
            >
            <button
              v-if="authStore.isAuthenticated"
              @click="onLogout"
              class="px-4 py-2 text-sm font-medium rounded-md cursor-pointer bg-secondary hover:bg-secondary/75 text-quaternary text-paragraph"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile menu, show/hide based on menu state -->
    <div id="mobile-menu" class="hidden md:hidden bg-quaternary">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          @click="onClickLinkMobile"
          href="#inicio"
          class="block px-3 py-2 text-base font-medium text-quinary hover:text-secondary text-paragraph"
          >Inicio</a
        >
        <a
          @click="onClickLinkMobile"
          href="#servicios"
          class="block px-3 py-2 text-base font-medium text-quinary hover:text-secondary text-paragraph"
          >Servicios</a
        >
        <a
          @click="onClickLinkMobile"
          href="#galeria"
          class="block px-3 py-2 text-base font-medium text-quinary hover:text-secondary text-paragraph"
          >Galería</a
        >
        <a
          @click="onClickLinkMobile"
          href="#contacto"
          class="block px-3 py-2 text-base font-medium text-quinary hover:text-secondary text-paragraph"
          >Contacto</a
        >
        <button
          v-if="!authStore.isAuthenticated"
          @click="onToggleLogin"
          class="w-full px-3 py-2 text-base font-medium text-left rounded-md cursor-pointer bg-secondary text-quaternary hover:bg-secondary/75 text-paragraph"
        >
          Login
        </button>
        <RouterLink
          v-else
          to="/admin"
          class="block px-3 py-2 text-base font-medium text-quinary hover:text-secondary text-paragraph"
          >Settings</RouterLink
        >
        <button
          v-if="authStore.isAuthenticated"
          @click="onLogout"
          class="w-full px-3 py-2 text-base font-medium text-left rounded-md cursor-pointer bg-secondary text-quaternary hover:bg-secondary/75 text-paragraph"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
