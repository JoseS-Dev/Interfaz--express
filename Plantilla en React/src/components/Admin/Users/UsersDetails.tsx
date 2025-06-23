import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Configuración de iconos Leaflet para bundlers modernos
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    marker: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
});

const customMarkerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [30, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
});

const COLORS = {
    primary_color: "DFEEFF",
    secondary_color: "2563EB",
    ternary_color: "F97316",
    cuarternary_color: "FFFFFF",
    neutral_color: "374151",
};

const UserDetailsModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    const position: LatLngExpression = [
        parseFloat(user.latitude_address) || 0,
        parseFloat(user.longitude_address) || 0,
    ];

    return (
        <div
        className="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        >
        <div
            className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
        >
            <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            onClick={onClose}
            aria-label="Cerrar modal"
            type="button"
            >
            &times;
            </button>

            <h3
            id="user-details-title"
            className="text-3xl font-semibold mb-6"
            style={{ color: `#${COLORS.secondary_color}` }}
            >
            Detalles de Usuario: {user.username}
            </h3>

            {/* Sección Información Personal */}
            <section className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Información Personal</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <p><strong>Nombre completo:</strong> {user.name_user} {user.maiden_name_user}</p>
                <p><strong>Email:</strong> {user.email_user}</p>
                <p><strong>Edad:</strong> {user.age_user}</p>
                <p><strong>Fecha de nacimiento:</strong> {new Date(user.birth_date_user).toLocaleDateString()}</p>
                <p><strong>Teléfono:</strong> {user.phone_user}</p>
                <p><strong>Color de ojos:</strong> {user.eye_color_user}</p>
                <p><strong>Color de cabello:</strong> {user.hair_user}</p>
                <p><strong>Grupo sanguíneo:</strong> {user.blood_group_user}</p>
                <p><strong>Altura (cm):</strong> {user.height_user}</p>
                <p><strong>Peso (kg):</strong> {user.weight_user}</p>
                <p><strong>Rol:</strong> 
                <span
                    className="ml-2 px-2 py-1 rounded text-xs font-semibold"
                    style={{
                    backgroundColor:
                        user.role_user === "admin"
                        ? `#${COLORS.secondary_color}20`
                        : `#${COLORS.primary_color}`,
                    color:
                        user.role_user === "admin"
                        ? `#${COLORS.secondary_color}`
                        : `#${COLORS.neutral_color}`,
                    }}
                >
                    {user.role_user}
                </span>
                </p>
            </div>
            </section>

            {/* Sección Dirección */}
            <section className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Dirección</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Calle:</strong> {user.street_address}</p>
                <p><strong>Ciudad:</strong> {user.city_address}</p>
                <p><strong>Estado:</strong> {user.state_address} ({user.state_code_address})</p>
                <p><strong>Código postal:</strong> {user.postal_code_address}</p>
                <p><strong>País:</strong> {user.country_address}</p>
                <p><strong>IP:</strong> {user.ip_user}</p>
                <p><strong>MAC:</strong> {user.mac_address_user}</p>
            </div>

            {/* Mapa Leaflet */}
            <div className="h-64 w-full rounded-md overflow-hidden border border-gray-300 mt-4">
                <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customMarkerIcon}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                </MapContainer>
            </div>
            </section>

            {/* Sección Información Académica */}
            <section className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Información Académica</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Universidad:</strong> {user.university_user}</p>
                <p><strong>Agente de usuario:</strong> {user.user_agent_user}</p>
            </div>
            </section>

            {/* Sección Información Financiera */}
            <section className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Información Financiera</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Tipo de tarjeta:</strong> {user.card_type_user}</p>
                <p><strong>Número de tarjeta:</strong> {user.card_number_user}</p>
                <p><strong>Expiración tarjeta:</strong> {user.card_expire_user}</p>
                <p><strong>Moneda:</strong> {user.currency_user}</p>
                <p><strong>IBAN:</strong> {user.iban_user}</p>
            </div>
            </section>

            {/* Sección Información de la Empresa */}
            <section className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Información de la Empresa</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Nombre empresa:</strong> {user.company_name_user}</p>
                <p><strong>Departamento:</strong> {user.department_company_user}</p>
                <p><strong>Título:</strong> {user.company_title_user}</p>
                <p><strong>Calle empresa:</strong> {user.company_street_user}</p>
                <p><strong>Ciudad empresa:</strong> {user.company_city_user}</p>
                <p><strong>Estado empresa:</strong> {user.company_state_user} ({user.company_state_code_user})</p>
                <p><strong>Código postal empresa:</strong> {user.company_postal_code_user}</p>
                <p><strong>País empresa:</strong> {user.company_country_user}</p>
            </div>
            </section>

            {/* Sección Cripto Wallet */}
            <section>
            <h4 className="text-xl font-semibold mb-2">Cripto Wallet</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Moneda:</strong> {user.coin_user}</p>
                <p><strong>Dirección Wallet:</strong> {user.wallet_address_user}</p>
                <p><strong>Red:</strong> {user.network_user}</p>
            </div>
            </section>
        </div>
        </div>
    );
};

export default UserDetailsModal;
