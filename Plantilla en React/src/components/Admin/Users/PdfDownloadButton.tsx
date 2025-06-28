import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const logoUrl = `${window.location.origin}/src/assets/icons/logo.png`; // URL del logo en tu proyecto

const PdfDownloadButton = ({ users }) => {
    // Función para cargar imagen logo en base64
    const getBase64FromUrl = async (url: string): Promise<string> => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Aquí forzamos a string con el as
                resolve(reader.result as string);
            };
            reader.readAsDataURL(blob);
        });
    };
        

    const generatePDF = async () => {
        const doc = new jsPDF();

        // Carga logo
        const logoBase64 = await getBase64FromUrl(logoUrl);

        // Añade logo al PDF (posición x=10, y=8, ancho=24, alto=24)
        doc.addImage(logoBase64, "PNG", 10, 6, 24, 24);

        // Título del documento
        doc.setFontSize(18);
        doc.setTextColor('#2563EB');
        doc.text("Listado de Usuarios", 40, 20);

        // Define columnas para la tabla (excluyendo datos de mapa)
        const columns = [
        { header: "ID", dataKey: "user_id" },
        { header: "Nombre", dataKey: "name_user" },
        { header: "Apellido", dataKey: "maiden_name_user" },
        { header: "Email", dataKey: "email_user" },
        { header: "Usuario", dataKey: "username" },
        { header: "Rol", dataKey: "role_user" },
        { header: "Edad", dataKey: "age_user" },
        { header: "Teléfono", dataKey: "phone_user" },
        { header: "Ciudad", dataKey: "city_address" },
        { header: "Estado", dataKey: "state_address" },
        { header: "País", dataKey: "country_address" },
        ];

        // Prepara filas con los datos de usuarios
        const rows = users.map((user) => ({
        user_id: user.user_id,
        name_user: user.name_user,
        maiden_name_user: user.maiden_name_user,
        email_user: user.email_user,
        username: user.username,
        role_user: user.role_user,
        age_user: user.age_user,
        phone_user: user.phone_user,
        city_address: user.city_address,
        state_address: user.state_address,
        country_address: user.country_address,
        }));

        // Genera la tabla debajo del logo y título
        autoTable(doc, {
        startY: 35,
        columns: columns,
        body: rows,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [37, 99, 235] }, // color azul (tu secundario)
        margin: { left: 10, right: 10 },
        });

        // Guarda el PDF con nombre
        doc.save("usuarios.pdf");
    };

    return (
        <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        type="button"
        >
        Descargar PDF
        </button>
    );
};

export default PdfDownloadButton;
