import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IUser } from '../../features/admin/users/users.interface'; 
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiUrl = environment.baseUrl + '/Users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUser[]> {
        return this.http.get<{ users: IUser[] }>(this.apiUrl).pipe(
            map(response => response.users || []),
            catchError(error => {
                console.error('Error al obtener usuarios:', error);
                return throwError(() => new Error('Error al obtener usuarios.'));
            })
        );
    }

    toggleUserActive(userId: number, isActive: 0 | 1): Observable<any> {
        const url = isActive === 1 ? `${this.apiUrl}/deactivate/${userId}` : `${this.apiUrl}/activate/${userId}`;
        return this.http.patch(url, {}).pipe(
            catchError(error => {
                console.error(`Error al ${isActive === 1 ? 'desactivar' : 'activar'} usuario:`, error);
                return throwError(() => new Error(`Error al ${isActive === 1 ? 'desactivar' : 'activar'} usuario.`));
            })
        );
    }
}