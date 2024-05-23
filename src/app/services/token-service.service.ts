import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor(private client:HttpClient) {}
   isTokenExpire(token:any):boolean {
    const decodedToken:any = jwtDecode(token);
    const currentDate: Date = new Date();
    const expiryDate: Date = new Date(decodedToken.exp);
    
  return currentDate>expiryDate;
   }

 isTokenNull(token:any):boolean{

  if (token){
    return true;
  }else{
    return false;
  }
 }

   refreshToken(){
          
          this.client.get<any>('http://localhost:60805/api/Auth/RefreshToken').subscribe(response =>{
          const newToken= response.token;
          localStorage.removeItem('token');
          localStorage.setItem('token',newToken);
 })}
}

