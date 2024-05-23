import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { HttpRequestService } from '../../services/http-request.service';

@Component({
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  client = inject(HttpRequestService)
  userForm: FormGroup;


constructor(private router:Router ) {
 this.userForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  });
 }
  async login() {
    const FromUser = this.userForm.value;
    const isFormValid = this.userForm.valid;
    if (isFormValid){
      this.client.post('api/Auth/Login', FromUser)
        .subscribe( response => { debugger
          console.log(response)
          const token = response.accessToken.token;
          console.log(token)
            localStorage.setItem('token', token);
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken);
            const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            console.log(userId)
            this.router.navigateByUrl('/homepage')
          });
    }else {
      alert("Bilgilerinizi düzgün doldurunuz..")
    }
  }
  
}

