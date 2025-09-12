<script setup>
import * as XLSX from 'xlsx';

const props = defineProps({
  users: { type: Array, default: () => [] },
});

const downloadExcel = () => {
  const rows = (props.users || []).map((u) => ({
    ID: u.user_id,
    Nombre: u.name_user,
    Apellido: u.maiden_name_user,
    Email: u.email_user,
    Usuario: u.username,
    Rol: u.role_user,
    Activo: u.is_active_user ? 'Sí' : 'No',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
  XLSX.writeFile(workbook, 'usuarios.xlsx');
};
</script>

<template>
  <button class="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700" @click="downloadExcel">
    Descargar Excel
  </button>
</template>
