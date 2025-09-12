<script setup>
import { ref } from 'vue';
import { axiosInstance } from '@/utilities/axios';
import Swal from 'sweetalert2';

const fileRef = ref(null);
const imageFile = ref(null);

const onChange = async (e) => {
  const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
  if (!file) return;

  // Obtener dimensiones con un Image()
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    imageFile.value = {
      file,
      dimensions: `${img.width}x${img.height}`,
      size: Math.round(file.size / 1024),
      format: file.type.split('/').pop() || '',
    };
  };
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!imageFile.value) {
    Swal.fire('Error', 'Por favor selecciona una imagen', 'error');
    return;
  }
  try {
    const formData = new FormData();
    formData.append('url_image', imageFile.value.file);
    formData.append('dimension_image', imageFile.value.dimensions);
    formData.append('size_image', String(imageFile.value.size));
    formData.append('format_image', imageFile.value.format);

    const result = await axiosInstance.post('/Images/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    await Swal.fire({
      title: 'Éxito',
      text: 'Imagen creada correctamente',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });

    localStorage.setItem('lastImageCreated', JSON.stringify(result.data || result.data?.data));
    // limpiar inputs
    if (fileRef.value) fileRef.value.value = '';
    imageFile.value = null;
    // refrescar página para que ListImages recargue (comportamiento similar)
    window.location.reload();
  } catch (error) {
    console.error(error);
    const msg = error?.message || 'Error al crear la imagen';
    Swal.fire({ title: 'Error', text: msg, icon: 'error' });
  }
};

const handleSubmitUpdate = async (e) => {
  e.preventDefault();
  if (!imageFile.value) {
    Swal.fire('Error', 'Por favor selecciona una imagen', 'error');
    return;
  }

  const stored = JSON.parse(localStorage.getItem('lastImageCreated') || '{}');
  const id_image = stored?.data?.id_image ?? stored?.id_image;
  if (!id_image) {
    Swal.fire('Atención', 'No se encontró una imagen previa para actualizar', 'info');
    return;
  }

  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, actualizar',
    cancelButtonText: 'Cancelar',
  });

  if (!confirm.isConfirmed) {
    await Swal.fire({
      title: 'Cancelado',
      text: 'La imagen no fue actualizada',
      icon: 'info',
      timer: 2000,
      showConfirmButton: false,
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append('url_image', imageFile.value.file);
    formData.append('dimension_image', imageFile.value.dimensions);
    formData.append('size_image', String(imageFile.value.size));
    formData.append('format_image', imageFile.value.format);

    const res = await axiosInstance.patch(`/Images/update/${id_image}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    await Swal.fire({
      title: 'Éxito',
      text: 'Imagen actualizada correctamente',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });

    localStorage.setItem('lastImageCreated', JSON.stringify(res.data || res.data?.data));
    if (fileRef.value) fileRef.value.value = '';
    imageFile.value = null;
    window.location.reload();
  } catch (error) {
    console.error(error);
    const msg = error?.message || 'Error al actualizar la imagen';
    Swal.fire({ title: 'Error', text: msg, icon: 'error' });
  }
};
</script>

<template>
  <div class="flex flex-col items-center h-full gap-6 p-2 px-4 border-r-2 border-gray-300 w-3/10">
    <h2 class="w-full text-xl font-bold text-center border-b-2">Selecciona una Imagen</h2>

    <div class="flex flex-col w-full gap-3">
      <label>
        <span class="block mb-1 text-lg font-500">Cargar Imagen</span>
        <input
          type="file"
          accept="image/*"
          class="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full"
          @change="onChange"
          ref="fileRef"
        />
      </label>
      <div v-if="imageFile" class="text-sm text-gray-600">
        <p>Dimensiones: {{ imageFile.dimensions }}</p>
        <p>Tamaño: {{ imageFile.size }} KB</p>
        <p>Formato: {{ imageFile.format }}</p>
      </div>
    </div>

    <div class="flex justify-between w-full">
      <button
        @click="handleSubmit"
        type="submit"
        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
      >
        Crear
      </button>
      <button
        @click="handleSubmitUpdate"
        type="submit"
        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
      >
        Editar
      </button>
    </div>
  </div>
</template>
