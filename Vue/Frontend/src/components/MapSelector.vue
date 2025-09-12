<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import L from 'leaflet';

// Propiedades
const props = defineProps({
  initialLat: { type: Number, default: 51.505 },
  initialLng: { type: Number, default: -0.09 },
  height: { type: String, default: '400px' },
});

const emit = defineEmits(['locationSelect']);

const mapEl = ref(null);
let mapInstance = null;

// Resolver iconos por defecto de Leaflet en bundlers
const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString();
const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString();
const defaultIcon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

onMounted(async () => {
  if (mapInstance) return;
  mapInstance = L.map(mapEl.value).setView([props.initialLat, props.initialLng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(mapInstance);

  try {
    const module = await import('leaflet-control-geocoder');
    const geocoder = module.geocoder({ defaultMarkGeocode: false })
      .on('markgeocode', function (e) {
        const bbox = e.geocode.bbox;
        const poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest(),
        ]).addTo(mapInstance);
        mapInstance.fitBounds(poly.getBounds());

        const { name, properties } = e.geocode;
        const city = properties.city || '-';
        const state = properties.state || '-';
        const country = properties.country || '-';
        const address = name || '-';
        const center = poly.getBounds().getCenter();
        emit('locationSelect', {
          lat: center.lat,
          lng: center.lng,
          address,
          city,
          state,
          country,
          postalCode: properties.postcode || '',
        });
      })
      .addTo(mapInstance);
  } catch (err) {
    // Si falla el geocoder, dejamos solo el mapa
    console.warn('Geocoder no disponible:', err);
  }

  mapInstance.on('click', async function (e) {
    const { lat, lng } = e.latlng;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      const address = data.display_name || 'Desconocida';
      const city = data.address?.city || data.address?.town || data.address?.village || 'Desconocida';
      const state = data.address?.state || 'Desconocido';
      const country = data.address?.country || 'Desconocido';
      const postalCode = data.address?.postcode || '';
      emit('locationSelect', { lat, lng, address, city, state, country, postalCode });
    } catch (error) {
      console.error('Error al obtener datos de geocodificación:', error);
      emit('locationSelect', { lat, lng, address: 'Ubicación seleccionada', city: 'Desconocida', state: 'Desconocido', country: 'Desconocido', postalCode: '' });
    }
  });
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});
</script>

<template>
  <div>
    <div ref="mapEl" :style="{ height }" class="w-full rounded-lg border border-quinary/5"></div>
  </div>
</template>

<style>
@import 'leaflet/dist/leaflet.css';
@import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
</style>
