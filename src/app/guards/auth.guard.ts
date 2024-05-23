import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
const router = inject(Router);
let token = localStorage.getItem('token')

if(token){
  return true;

}
  alert('Lütfen giriş yapınız..');
  router.navigateByUrl('/homepage');
  return false;
};
