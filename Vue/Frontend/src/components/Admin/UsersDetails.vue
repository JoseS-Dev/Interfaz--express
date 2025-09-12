<script setup>
const props = defineProps({
  user: { type: Object, default: null },
  isOpen: { type: Boolean, default: false },
});
const emit = defineEmits(['close']);
</script>

<template>
  <dialog v-if="isOpen && user" open class="z-20 fixed top-10 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border rounded-xl shadow-xl">
    <div class="p-4">
      <div class="flex justify-between items-center border-b pb-2 mb-4">
        <h3 class="text-xl font-semibold">Detalle de Usuario</h3>
        <button class="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200" @click="emit('close')">Cerrar</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <p><strong>ID:</strong> {{ user.user_id }}</p>
        <p><strong>Nombre:</strong> {{ user.name_user }}</p>
        <p><strong>Apellido:</strong> {{ user.maiden_name_user }}</p>
        <p><strong>Email:</strong> {{ user.email_user }}</p>
        <p><strong>Usuario:</strong> {{ user.username }}</p>
        <p><strong>Rol:</strong> {{ user.role_user }}</p>
        <p><strong>Activo:</strong> {{ user.is_active_user ? 'Sí' : 'No' }}</p>
        <p v-if="user.city_address"><strong>Ciudad:</strong> {{ user.city_address }}</p>
        <p v-if="user.state_address"><strong>Estado:</strong> {{ user.state_address }}</p>
        <p v-if="user.country_address"><strong>País:</strong> {{ user.country_address }}</p>
      </div>
    </div>
  </dialog>
</template>
