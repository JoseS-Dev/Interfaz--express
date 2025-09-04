// src/app/shared/components/pdf-download-button/pdf-download-button.component.ts
import { Component, Input } from '@angular/core';
import { IUser } from '../../../shared/interfaces/user.interface'; 
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

@Component({
    standalone: true,
    selector: 'users-download-button',
    template: `
        <button (click)="downloadPdf()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-primary text-paragraph">
            Descargar   PDF
        </button>
    `
})
export class UsersDownloadButtonComponent {
    @Input() users: IUser[] = [];
    private readonly logoUrl = `${window.location.origin}/assets/img/logo.png`;

    private getBase64FromUrl = async (url: string): Promise<string> => {
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

    downloadPdf = async () => {
        const doc = new jsPDF();

        // Carga logo
        const logoBase64 = await this.getBase64FromUrl(this.logoUrl);

        // Añade logo al PDF (posición x=10, y=8, ancho=32, alto=24)
        doc.addImage(logoBase64, "PNG", 10, 6, 32, 24);

        // Título del documento
        doc.setFontSize(18);
        doc.setTextColor('#2563EB');
        doc.text("Listado de Usuarios", 45, 20);

        // Define columnas para la tabla (excluyendo datos de mapa)
        const columns = [
        { header: "ID", dataKey: "id_user" },
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
        const rows = this.users.map((user) => ({
            id_user: user.id_user,
            name_user: user.name_user,
            maiden_name_user: user.maiden_name_user,
            email_user: user.email_user,
            username: user.username,
            role_user: user.role_user,
        }));

        // Genera la tabla debajo del logo y título
        autotable(doc, {
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

}