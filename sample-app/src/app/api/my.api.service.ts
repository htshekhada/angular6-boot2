import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiBaseURL = 'http://localhost:8080/api';

@Injectable({
    providedIn: 'root'
})

export class MyApiService {

    constructor(private http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Error
            console.error('error:', error.error.message);
        } else {
            // Error
            console.error(
                `Api server returned ${error.status}, ` +
                `error body: ${error.error}`);
        }
        // throwError is observable
        return throwError('Error has happened');
    };

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getProducts(): Observable<any> {
        const url = `${apiBaseURL}/`;
        return this.http.get(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getProduct(id: string): Observable<any> {
        const url = `${apiBaseURL}/${id}`;
        return this.http.get(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    postProduct(data): Observable<any> {
        const url = `${apiBaseURL}/`;
        return this.http.post(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateProduct(id: string, data): Observable<any> {
        const url = `${apiBaseURL}/${id}`;
        return this.http.put(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteProduct(id: string): Observable<{}> {
        const url = `${apiBaseURL}/${id}`;
        return this.http.delete(url, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
}