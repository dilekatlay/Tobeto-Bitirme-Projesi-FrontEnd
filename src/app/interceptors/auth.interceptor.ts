import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TokenServiceService } from '../services/token-service.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
const service = inject(TokenServiceService);

debugger
 if (typeof document !== 'undefined') {
 // req = req.clone( { withCredentials: true });
   let token = localStorage.getItem('token');
   req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }, withCredentials: true });
  }
  return next(req).pipe(
    catchError( (error: HttpErrorResponse) => 
      {
        if (error.status === 401)
          {
            console.log('token refreslendi');
            service.refreshToken();
        }
      return throwError(() => new Error('Token yenilendi.'));
 }));

};
