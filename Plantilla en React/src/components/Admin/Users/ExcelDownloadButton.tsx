import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { User } from "./user.interface";

interface ExcelDownloadButtonProps {
  users: User[]; 
}

const ExcelDownloadButton = ({ users }: ExcelDownloadButtonProps) => {
  const generateExcel = () => {
    const headers = [
      "ID",
      "Nombre",
      "Apellido",
      "Email",
      "Usuario",
      "Edad",
      "Teléfono",
      "Fecha de Nacimiento",
      "Grupo Sanguíneo",
      "Altura",
      "Peso",
      "Color de Ojos",
      "Cabello",
      "IP",
      "MAC Address",
      "Universidad",
      "EIN",
      "SSN",
      "User Agent",
      "Rol",
      "Calle Residencia",
      "Ciudad Residencia",
      "Estado Residencia",
      "Código Estado Residencia",
      "Código Postal Residencia",
      "Latitud Residencia",
      "Longitud Residencia",
      "País Residencia",
      "Vencimiento Tarjeta",
      "Número Tarjeta",
      "Tipo Tarjeta",
      "Moneda",
      "IBAN",
      "Departamento Empresa",
      "Nombre Empresa",
      "Título Empresa",
      "Calle Empresa",
      "Ciudad Empresa",
      "Estado Empresa",
      "Código Estado Empresa",
      "Código Postal Empresa",
      "Latitud Empresa",
      "Longitud Empresa",
      "País Empresa",
      "Criptomoneda",
      "Dirección Wallet",
      "Red",
    ];

    const data = users.map((user) => [
      user.user_id,
      user.name_user,
      user.maiden_name_user,
      user.email_user,
      user.username,
      user.age_user,
      user.phone_user,
      user.birth_date_user,
      user.blood_group_user,
      user.height_user,
      user.weight_user,
      user.eye_color_user,
      user.hair_user,
      user.ip_user,
      user.mac_address_user,
      user.university_user,
      user.ein_user,
      user.ssn_user,
      user.user_agent_user,
      user.role_user,
      user.street_address,
      user.city_address,
      user.state_address,
      user.state_code_address,
      user.postal_code_address,
      user.latitude_address,
      user.longitude_address,
      user.country_address,
      user.card_expire_user,
      user.card_number_user,
      user.card_type_user,
      user.currency_user,
      user.iban_user,
      user.department_company_user,
      user.company_name_user,
      user.company_title_user,
      user.company_street_user,
      user.company_city_user,
      user.company_state_user,
      user.company_state_code_user,
      user.company_postal_code_user,
      user.company_latitude_user,
      user.company_longitude_user,
      user.company_country_user,
      user.coin_user,
      user.wallet_address_user,
      user.network_user,
    ]);

    const ws_data = [headers, ...data];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    const colWidths = headers.map(header => ({
        wch: header.length + 5 
    }));
    ws['!cols'] = colWidths;


    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(dataBlob, "usuarios.xlsx");
  };

  return (
    <button
      onClick={generateExcel}
      className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      type="button"
    >
      Descargar Excel
    </button>
  );
};

export default ExcelDownloadButton;