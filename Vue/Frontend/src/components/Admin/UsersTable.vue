<script setup>
import { ref, onMounted, computed } from 'vue';
import { axiosInstance } from '@/utilities/axios';
import { successAlert, confirmAction } from '@/utilities/swalHelper';
import UsersDetails from '@/components/Admin/UsersDetails.vue';
import PdfDownloadButton from '@/components/Admin/PdfDownloadButton.vue';
import ExcelDownloadButton from '@/components/Admin/ExcelDownloadButton.vue';

const users = ref([]);
const pending = ref(true);
const selectedUser = ref(null);
const isModalOpen = ref(false);

// filtros y paginación
const search = ref('');
const roleFilter = ref('all'); // all | admin | user
const activeFilter = ref('all'); // all | active | inactive
const currentPage = ref(1);
const pageSize = ref(10);

const fetchUsers = async () => {
  pending.value = true;
  try {
    const res = await axiosInstance.get('/Users');
    users.value = res.data.users || [];
  } catch (e) {
    console.error('Error al obtener usuarios', e);
  } finally {
    pending.value = false;
  }
};

onMounted(fetchUsers);

const toggleUserActive = async (user) => {
  try {
    const url = user.is_active_user ? `/Users/deactivate/${user.user_id}` : `/Users/activate/${user.user_id}`;
    const ask = await confirmAction({
      title: '¿Confirmar?',
      text: user.is_active_user ? 'Desactivar usuario' : 'Activar usuario',
    });
    if (!ask.isConfirmed) return;
    await axiosInstance.patch(url);
    // Update local state
    users.value = users.value.map((u) =>
      u.user_id === user.user_id ? { ...u, is_active_user: u.is_active_user === 1 ? 0 : 1 } : u
    );
    successAlert({ title: 'Actualizado', text: 'Estado del usuario actualizado' });
  } catch (e) {
    console.error('Error al actualizar el estado del usuario', e);
  }
};

const openDetails = (user) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const closeDetails = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};

// computed lists
const normalized = (s) => (s ?? '').toString().toLowerCase();
const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const haystack = [u.name_user, u.maiden_name_user, u.email_user, u.username, u.role_user]
      .map(normalized)
      .join(' ');
    const matchesSearch = normalized(search.value) === '' || haystack.includes(normalized(search.value));
    const matchesRole = roleFilter.value === 'all' || (u.role_user ?? '').toLowerCase() === roleFilter.value;
    const isActive = u.is_active_user === 1;
    const matchesActive =
      activeFilter.value === 'all' || (activeFilter.value === 'active' ? isActive : !isActive);
    return matchesSearch && matchesRole && matchesActive;
  });
});

const totalItems = computed(() => filteredUsers.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)));
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredUsers.value.slice(start, start + pageSize.value);
});

const goToPage = (p) => {
  const clamped = Math.min(Math.max(1, p), totalPages.value);
  currentPage.value = clamped;
};
</script>

<template>
  <div class="w-full">
    <h2 class="w-full text-xl font-bold text-center border-b-2 mb-4">Usuarios</h2>

    <!-- Controles de búsqueda y filtros -->
    <div class="mb-4 flex flex-col md:flex-row gap-3 items-start md:items-end">
      <div class="flex flex-col">
        <label class="text-sm text-gray-600">Buscar</label>
        <input v-model="search" type="text" placeholder="Nombre, email, usuario..." class="px-3 py-2 border rounded w-64" />
      </div>
      <div class="flex flex-col">
        <label class="text-sm text-gray-600">Rol</label>
        <select v-model="roleFilter" class="px-3 py-2 border rounded w-40">
          <option value="all">Todos</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class="text-sm text-gray-600">Activo</label>
        <select v-model="activeFilter" class="px-3 py-2 border rounded w-40">
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class="text-sm text-gray-600">Por página</label>
        <select v-model.number="pageSize" class="px-3 py-2 border rounded w-28">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
      <div class="ml-auto text-sm text-gray-600">Total: {{ totalItems }}</div>
    </div>

    <div v-if="pending" class="text-center py-8">Cargando usuarios...</div>

    <div v-else>
      <div class="overflow-x-auto rounded border">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="px-3 py-2">ID</th>
              <th class="px-3 py-2">Nombre</th>
              <th class="px-3 py-2">Apellido</th>
              <th class="px-3 py-2">Email</th>
              <th class="px-3 py-2">Usuario</th>
              <th class="px-3 py-2">Rol</th>
              <th class="px-3 py-2">Activo</th>
              <th class="px-3 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in paginatedUsers" :key="u.user_id" class="border-t">
              <td class="px-3 py-2">{{ u.user_id }}</td>
              <td class="px-3 py-2">{{ u.name_user }}</td>
              <td class="px-3 py-2">{{ u.maiden_name_user }}</td>
              <td class="px-3 py-2">{{ u.email_user }}</td>
              <td class="px-3 py-2">{{ u.username }}</td>
              <td class="px-3 py-2">
                <span
                  class="px-2 py-1 rounded text-xs font-semibold"
                  :class="u.role_user === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                >
                  {{ u.role_user }}
                </span>
              </td>
              <td class="px-3 py-2">
                <span :class="u.is_active_user ? 'text-green-700' : 'text-red-700'">
                  {{ u.is_active_user ? 'Sí' : 'No' }}
                </span>
              </td>
              <td class="px-3 py-2">
                <div class="flex gap-2">
                  <button class="px-2 py-1 text-blue-700 hover:underline" @click="openDetails(u)">Ver</button>
                  <button
                    class="px-2 py-1 rounded text-white"
                    :class="u.is_active_user ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                    @click="toggleUserActive(u)"
                  >
                    {{ u.is_active_user ? 'Desactivar' : 'Activar' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="mt-4 flex items-center justify-center gap-2">
        <button class="px-2 py-1 border rounded" @click="goToPage(1)" :disabled="currentPage===1">«</button>
        <button class="px-2 py-1 border rounded" @click="goToPage(currentPage-1)" :disabled="currentPage===1">‹</button>
        <span>Página {{ currentPage }} / {{ totalPages }}</span>
        <button class="px-2 py-1 border rounded" @click="goToPage(currentPage+1)" :disabled="currentPage===totalPages">›</button>
        <button class="px-2 py-1 border rounded" @click="goToPage(totalPages)" :disabled="currentPage===totalPages">»</button>
      </div>

      <div class="my-4 flex justify-start gap-4">
        <PdfDownloadButton :users="users" />
        <ExcelDownloadButton :users="users" />
      </div>
    </div>

    <UsersDetails :user="selectedUser" :isOpen="isModalOpen" @close="closeDetails" />
  </div>
</template>
