import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private baseUrl: string = 'http://localhost:60805/'; // API base URL

  constructor(private http: HttpClient) { }

  // GET isteği gönderen fonksiyon
  get(endpoint: string): Observable<any> {
    return  this.http.get<any>(`${this.baseUrl}`+endpoint);
  }

  // POST isteği gönderen fonksiyon
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`+endpoint, data);
  }

  // PUT isteği gönderen fonksiyon
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}`+endpoint, data);
  }

  // DELETE isteği gönderen fonksiyon
  delete(endpoint: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}`+endpoint);
  }
}
