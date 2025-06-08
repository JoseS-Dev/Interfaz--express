import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITypography } from '../../shared/interfaces/typography.interface';

@Injectable({
    providedIn: 'root'
})
export class TypographyService {
    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    createTypography(typographyFormData: FormData): Observable<any> {
        return this.http.post<{ typography: any }>(
            `${this.baseUrl}/Tipography`,
            typographyFormData,
            { withCredentials: true }
        );
    }

    getTypography(): Observable<ITypography[]> {
        return this.http.get<{ data: ITypography[], message: string }>(
            `${this.baseUrl}/Tipography`,
            { withCredentials: true }
        ).pipe(
            map(response => response.data)  // Extraemos solo data
        );
    }

    deleteTypography(id: string): Observable<any> {
        return this.http.delete<{ message: string, data: any}>(
            `${this.baseUrl}/Tipography/${id}`,
            { withCredentials: true }
        );
    }
}
