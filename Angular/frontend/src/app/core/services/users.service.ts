import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IUser } from '../../shared/interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiUrl = environment.baseUrl + '/Users';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getUsers(): Observable<IUser[]> {
        return this.http.get<{ users: IUser[] }>(this.apiUrl).pipe(
            map(response => response.users || []),
            catchError(error => {
                console.error('Error al obtener usuarios:', error);
                return throwError(() => new Error('Error al obtener usuarios.'));
            })
        );
    }

    getUserLogged(): Observable<IUser> {
        const userId = this.authService.userId ? this.authService.userId : 0;
        return this.http.get<{message: string, user: IUser }>(`${this.apiUrl}/${userId}`).pipe(
            map(response => response.user || {}),
            catchError(error => {
                console.error('Error al obtener usuario:', error);
                return throwError(() => new Error('Error al obtener usuario.'));
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