<script setup>
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const props = defineProps({
  users: { type: Array, default: () => [] },
});

const downloadPdf = () => {
  const doc = new jsPDF({ orientation: 'landscape' });
  doc.setFontSize(14);
  doc.text('Reporte de Usuarios', 14, 16);

  const head = [['ID', 'Nombre', 'Apellido', 'Email', 'Usuario', 'Rol', 'Activo']];
  const body = (props.users || []).map((u) => [
    u.user_id,
    u.name_user,
    u.maiden_name_user,
    u.email_user,
    u.username,
    u.role_user,
    u.is_active_user ? 'Sí' : 'No',
  ]);

  autoTable(doc, {
    head,
    body,
    startY: 22,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [223, 238, 255], textColor: [55, 65, 81] },
  });

  doc.save('usuarios.pdf');
};
</script>

<template>
  <button class="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700" @click="downloadPdf">
    Descargar PDF
  </button>
</template>
