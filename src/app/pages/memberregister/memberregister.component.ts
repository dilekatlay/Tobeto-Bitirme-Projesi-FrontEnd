import {  HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpRequestService } from '../../services/http-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memberregister',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,RouterLink,CommonModule],
  templateUrl: './memberregister.component.html',
  styleUrl: './memberregister.component.scss'
})
export class MemberregisterComponent {
  memberForm:FormGroup;
  client = inject(HttpRequestService)
  constructor(private router:Router ) {
    this.memberForm = new FormGroup({
      firstName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      nationalIdentity: new FormControl('',[Validators.required,Validators.minLength(11)]),
      adress:new FormControl('',[Validators.required]),
      userId: new FormControl('')
    })
   }
   

    StepTwo(){
    const isFormValid = this.memberForm.valid;
    if(isFormValid){
      const token :any = localStorage.getItem('token');
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
      this.memberForm.setValue({ userId:userId});
      const member = this.memberForm.value
      this.client
      .post('api/Members',member)
      .subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/homepage');
      })
    }else{
      alert("Bilgilerinizi düzgün doldurunuz")
    }
   }

}
