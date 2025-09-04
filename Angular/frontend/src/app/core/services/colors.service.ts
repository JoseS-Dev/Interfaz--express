import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IColors } from '../../shared/interfaces/colors.interface'; 

@Injectable({
    providedIn: 'root'
})
export class ColorsService {
    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    create(colorsPayload: any): Observable<any> {
        return this.http.post<{ data: any }>(
            `${this.baseUrl}/Colors`,
            colorsPayload,
            { withCredentials: true }
        );
    }

    update(id: number, colorsPayload: any): Observable<any> {
        return this.http.patch<{ data: IColors, message: string }>(
            `${this.baseUrl}/Colors/${id}`,
            colorsPayload,
            { withCredentials: true }
        ).pipe(
            map(response => response.data)
        );
    }


    getAll(): Observable<IColors[]> {
        return this.http.get<IColors[]>(
            `${this.baseUrl}/Colors`,
            { withCredentials: true }
        );
    }

    delete(id: number): Observable<any> {
        return this.http.delete<{ message: string, data: any}>(
            `${this.baseUrl}/Colors/${id}`,
            { withCredentials: true }
        );
    }

    getSelected(): Observable<IColors> {
        return this.http.get<{ data: IColors, message: string }>(
            `${this.baseUrl}/Colors/selected`,
            { withCredentials: true }
        ).pipe(
            map(response => response.data)  // Extraemos solo data
        );
    }

    select(id: number): Observable<{ message: string, data: IColors }> {
        return this.http.patch<{ message: string, data: IColors }>(
            `${this.baseUrl}/Colors/select/`,
            { id_colors: id },
            { withCredentials: true }
        );
    }
}
