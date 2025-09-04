
import { Component } from "@angular/core";
import { UsersTableComponent } from "./users-table.component";
import { AdminNavbarComponent } from "../admin-navbar.component";

@Component({
    selector: "users-view",
    template: `
        <admin-navbar />
        <section class="w-full min-h-screen py-10 bg-[#DFEEFF]">
            <div class="max-w-6xl mx-auto p-6 rounded-lg shadow-lg border-2 border-[#DFEEFF] bg-[#fff]">
                <h2 class="text-3xl font-bold text-center text-[#2563EB]"> Gestión de Usuarios </h2>
                <users-table />
            </div>
        </section>
    `,
    imports: [UsersTableComponent, AdminNavbarComponent]
})
export class UsersComponent {}