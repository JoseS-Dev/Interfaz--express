import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginCredentials, RegisterCredentials } from '../../shared/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  // Estado reactivo de autenticación
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Al crear el servicio, intenta verificar token en backend
    this.verifyToken().subscribe();
  }

  // Login: guarda datos, actualiza estado
  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<{ user: any; token: string }>(
      `${this.baseUrl}/Users/login`,
      credentials,
      {
        withCredentials: true,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(result => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.authState.next(true);
      })
    );
  }

  // Login: guarda datos, actualiza estado
  register(credentials: RegisterCredentials): Observable<any> {
    return this.http.post<{ user: any; token: string }>(
      `${this.baseUrl}/Users/register`,
      credentials,
      {
        withCredentials: true,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(result => {
        console.log('Registro exitoso:', result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.authState.next(true);
      })
    );
  }

  // Logout: limpia datos, actualiza estado
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  // Verifica token en backend y actualiza estado
  verifyToken(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(
      `${this.baseUrl}/Users/verify`
    ).pipe(
      map(response => response.isAuthenticated),
      tap(isAuth => this.authState.next(isAuth))
    );
  }

  // Observable para consumir estado de autenticación
  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
