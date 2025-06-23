import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { LocationData } from '../types/user';

// Importar iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configurar iconos por defecto
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSelectorProps {
  onLocationSelect: (location: LocationData) => void;
  initialLat?: number;
  initialLng?: number;
  height?: string;
}

const MapSelector: React.FC<MapSelectorProps> = ({ 
  onLocationSelect, 
  initialLat = 51.505, 
  initialLng = -0.09,
  height = "400px"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [locationInfo, setLocationInfo] = useState<string>('Selecciona una ubicación en el mapa');

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Importar el geocoder dinámicamente
    const loadGeocoder = async () => {
      try {
        const { geocoder } = await import('leaflet-control-geocoder');
        
        // Inicializar el mapa
        const map = L.map(mapRef.current!).setView([initialLat, initialLng], 13);
        mapInstanceRef.current = map;

        // Añadir capa de OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Añadir buscador al mapa usando el plugin de geocoder
        const geocoderControl = geocoder({
          defaultMarkGeocode: false,
        })
          .on("markgeocode", function (e: any) {
            const bbox = e.geocode.bbox;
            const poly = L.polygon([
              bbox.getSouthEast(),
              bbox.getNorthEast(),
              bbox.getNorthWest(),
              bbox.getSouthWest(),
            ]).addTo(map);
            map.fitBounds(poly.getBounds());

            // Mostrar información de la ubicación
            const { name, properties } = e.geocode;
            const city = properties.city || "-";
            const state = properties.state || "-";
            const country = properties.country || "-";
            const address = name || "-";
            
            setLocationInfo(`Ciudad: ${city}, Estado: ${state}, País: ${country}`);
            
            // Obtener coordenadas del centro del polígono
            const center = poly.getBounds().getCenter();
            const locationData: LocationData = {
              lat: center.lat,
              lng: center.lng,
              address,
              city,
              state,
              country,
              postalCode: properties.postcode || ""
            };
            onLocationSelect(locationData);
          })
          .addTo(map);

        // Manejar clics en el mapa
        map.on("click", async function (e) {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;

          // Usar Nominatim para obtener información de la ubicación
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            
            const address = data.display_name || "Desconocida";
            const city = data.address.city || data.address.town || data.address.village || "Desconocida";
            const state = data.address.state || "Desconocido";
            const country = data.address.country || "Desconocido";
            const postalCode = data.address.postcode || "";

            setLocationInfo(`Latitud: ${lat.toFixed(6)}, Longitud: ${lng.toFixed(6)}\nCiudad: ${city}, País: ${country}`);
            
            const locationData: LocationData = {
              lat,
              lng,
              address,
              city,
              state,
              country,
              postalCode
            };
            onLocationSelect(locationData);
          } catch (error) {
            console.error("Error al obtener datos de geocodificación:", error);
            setLocationInfo(`Latitud: ${lat.toFixed(6)}, Longitud: ${lng.toFixed(6)}`);
            
            const locationData: LocationData = {
              lat,
              lng,
              address: "Ubicación seleccionada",
              city: "Desconocida",
              state: "Desconocido",
              country: "Desconocido",
              postalCode: ""
            };
            onLocationSelect(locationData);
          }
        });

      } catch (error) {
        console.error('Error al cargar el geocoder:', error);
        
        // Fallback: crear mapa sin geocoder
        const map = L.map(mapRef.current!).setView([initialLat, initialLng], 13);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Solo manejar clics en el mapa
        map.on("click", async function (e) {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            
            const address = data.display_name || "Desconocida";
            const city = data.address.city || data.address.town || data.address.village || "Desconocida";
            const state = data.address.state || "Desconocido";
            const country = data.address.country || "Desconocido";
            const postalCode = data.address.postcode || "";

            setLocationInfo(`Latitud: ${lat.toFixed(6)}, Longitud: ${lng.toFixed(6)}\nCiudad: ${city}, País: ${country}`);
            
            const locationData: LocationData = {
              lat,
              lng,
              address,
              city,
              state,
              country,
              postalCode
            };
            onLocationSelect(locationData);
          } catch (error) {
            console.error("Error al obtener datos de geocodificación:", error);
            setLocationInfo(`Latitud: ${lat.toFixed(6)}, Longitud: ${lng.toFixed(6)}`);
            
            const locationData: LocationData = {
              lat,
              lng,
              address: "Ubicación seleccionada",
              city: "Desconocida",
              state: "Desconocido",
              country: "Desconocido",
              postalCode: ""
            };
            onLocationSelect(locationData);
          }
        });
      }
    };

    loadGeocoder();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialLat, initialLng, onLocationSelect]);

  return (
    <div className="w-full">
      <div 
        ref={mapRef} 
        style={{ height }} 
        className="w-full rounded-lg border border-gray-300"
      />
      <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
        {locationInfo}
      </div>
    </div>
  );
};

export default MapSelector; 