import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../services/http-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userForm: FormGroup;
  PasswordConfirm: FormGroup;
  client = inject(HttpRequestService);
  constructor(private router: Router) {
    this.userForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      PasswordConfirm: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
    this.PasswordConfirm = new FormGroup({
     
    });
  }

  StepOne() {
    const user = this.userForm.value;
    const isFormValid = this.userForm.valid;
    debugger
    if(isFormValid){
        this.client
          .post('api/Auth/Register', user)
          .subscribe(response => {
            const token = response.token;
            localStorage.setItem('token',token);
            this.router.navigateByUrl('/memberregister')
          });
      } else {
        alert("Şifre Hatalı");
      }
    }
  }

