import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: Http,
    private tokenService: TokenService
  ) { }
  private apiUrl = 'http://localhost:58970/api';
  private setHeaders(): Headers {

    const headersConfig = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    };

    if (this.tokenService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.tokenService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  /// **********************************************************************
  //          Service to GET all request in the application
  /// **********************************************************************
  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, { headers: this.setHeaders(), search: params })
      .pipe(map((res: Response) => res), catchError(this.formatErrors));
  }

  /// **********************************************************************
  //          Service to PUT all request in the application
  /// **********************************************************************
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    )
  }

  /// **********************************************************************
  //          Service to POST all request in the application
  /// **********************************************************************
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    )
  }

  /// **********************************************************************
  //          Service to DELETE all request in the application
  /// **********************************************************************
  delete(path): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}${path}`,
      { headers: this.setHeaders() }
    ).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    )
  }
}
