import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service'; 
import { IUser } from '../../../shared/interfaces/user.interface'; 
import { UsersDetailsComponent } from './users-details.component';
import { UsersDownloadButtonComponent } from './users-download.component';
import Swal from 'sweetalert2';

// Definición de colores (igual que en React para consistencia)
const COLORS = {
    primary_color: "DFEEFF",
    secondary_color: "2563EB",
    ternary_color: "F97316",
    cuarternary_color: "FFFFFF",
    neutral_color: "374151",
};

@Component({
    standalone: true,
    selector: 'users-table',
    templateUrl: './users-table.component.html', 
    imports: [
        CommonModule,
        UsersDetailsComponent, 
        UsersDownloadButtonComponent
    ]
})
export class UsersTableComponent implements OnInit {
    users: IUser[] = [];
    pending: boolean = true;
    selectedUser: IUser | null = null;
    isModalOpen: boolean = false;

    // Para la paginación manual
    currentPage: number = 1;
    itemsPerPage: number = 10; // Puedes ajustar esto
    totalPages: number = 1;
    paginatedUsers: IUser[] = [];

    // Para el ordenamiento manual
    sortColumn: string = 'id_user';
    sortDirection: 'asc' | 'desc' = 'asc';

    constructor(private usersService: UsersService) { }

    ngOnInit(): void {
        this.fetchUsers();
    }

    fetchUsers(): void {
        this.pending = true;
        this.usersService.getUsers().subscribe({
            next: (data: IUser[]) => {
                this.users = data;
                this.updatePagination();
                this.pending = false;
            },
            error: (err) => {
                console.error('Error al cargar usuarios:', err);
                this.pending = false;
            }
        });
    }

    // Lógica para ordenar la tabla
    sortTable(columnName: string): void {
        if (this.sortColumn === columnName) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = columnName;
            this.sortDirection = 'asc';
        }

        this.users.sort((a, b) => {
            const aValue = (a as any)[this.sortColumn];
            const bValue = (b as any)[this.sortColumn];

            // Manejo de valores nulos o indefinidos
            if (aValue === undefined || aValue === null) return this.sortDirection === 'asc' ? 1 : -1;
            if (bValue === undefined || bValue === null) return this.sortDirection === 'asc' ? -1 : 1;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return this.sortDirection === 'asc' 
                    ? aValue.localeCompare(bValue) 
                    : bValue.localeCompare(aValue);
            }
            return this.sortDirection === 'asc' 
                ? aValue - bValue 
                : bValue - aValue;
        });
        this.updatePagination(); // Actualizar la paginación después de ordenar
    }

    // Lógica para paginación
    updatePagination(): void {
        this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedUsers = this.users.slice(startIndex, endIndex);
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePagination();
        }
    }

    nextPage(): void {
        this.goToPage(this.currentPage + 1);
    }

    prevPage(): void {
        this.goToPage(this.currentPage - 1);
    }


    toggleUserActive(user: IUser): void {
        Swal.fire({
            title: `¿Estás seguro de ${user.is_active_user === 1 ? 'desactivar' : 'activar'} a ${user.username}?`,
            text: "Esta acción afectará el acceso del usuario al sistema.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Sí, ${user.is_active_user === 1 ? 'desactivar' : 'activar'}!`,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.usersService.toggleUserActive(user.id_user, user.is_active_user).subscribe({
                    next: () => {
                        // Actualizar localmente el estado del usuario
                        this.users = this.users.map(u =>
                            u.id_user === user.id_user
                                ? { ...u, is_active_user: u.is_active_user === 1 ? 0 : 1 }
                                : u
                        );
                        this.updatePagination(); // Re-aplicar paginación después del cambio
                        Swal.fire(
                            '¡Actualizado!',
                            `El usuario ha sido ${user.is_active_user === 1 ? 'desactivado' : 'activado'}.`,
                            'success'
                        );
                    },
                    error: (err) => {
                        console.error('Error al actualizar el estado del usuario:', err);
                        Swal.fire(
                            'Error',
                            `No se pudo ${user.is_active_user === 1 ? 'desactivar' : 'activar'} el usuario.`,
                            'error'
                        );
                    }
                });
            }
        });
    }

    openUserDetails(user: IUser): void {
        this.selectedUser = user;
        this.isModalOpen = true;
    }

    closeUserDetails(): void {
        this.isModalOpen = false;
        this.selectedUser = null;
    }

    // Getter para los colores en el template
    get colors() {
        return COLORS;
    }
}