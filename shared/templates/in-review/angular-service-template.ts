import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { [MODEL_NAME] } from '../models/[MODEL_FILE]';

@Injectable({
    providedIn: 'root'
})
export class [SERVICE_NAME] {
  private readonly apiUrl = `${environment.apiUrl}/[RESOURCE_PATH]`;

    constructor(private http: HttpClient) { }

    getAll(): Observable < [MODEL_NAME][] > {
        return this.http.get<[MODEL_NAME][]>(this.apiUrl)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    getById(id: number): Observable < [MODEL_NAME] > {
        return this.http.get<[MODEL_NAME]>(`${this.apiUrl}/${id}`)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    create(data: [MODEL_NAME]): Observable < [MODEL_NAME] > {
        return this.http.post<[MODEL_NAME]>(this.apiUrl, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    update(id: number, data: [MODEL_NAME]): Observable < [MODEL_NAME] > {
        return this.http.put<[MODEL_NAME]>(`${this.apiUrl}/${id}`, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete (id: number): Observable < void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

  private handleError(error: any): Observable < never > {
        let errorMessage = 'An error occurred';

        if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        if (error.error?.message) {
            errorMessage = error.error.message;
        }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
}
}

