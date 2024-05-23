import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpRequestService } from '../../services/http-request.service';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [RouterLink,HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss'
})
export class ProfileUpdateComponent {
  userForm:FormGroup;
  memberForm:FormGroup;
  client = inject(HttpRequestService);
    constructor() {
      this.userForm = new FormGroup({
        Id: new FormGroup(""),
        email : new FormGroup(""),
        password : new FormGroup("")
      })
      this.memberForm = new FormGroup({
        Id: new FormGroup(""),
        FirstName:new FormGroup(""),
        LastName: new FormGroup(""),
        NationalIdentity: new FormGroup(""),
        Adress:new FormGroup(""),
        UserId: new FormGroup("")
      })
    }
  
     ngOnInit(){
      const token:any = localStorage.getItem('token');
      const decodedToken:any = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      this.client.get('api/Users/'+ userId)
      .subscribe((response) =>{
       console.log(response)
       this.userForm.patchValue({name:response.email});
      
      })
      const memberURL:any = 'api/Members/'+ userId;
      this.client.get(memberURL)
      .subscribe((memberr) =>{
        console.log(memberr);
        this.memberForm.patchValue({
          FirstName:memberr.firstName,
          LastName:memberr.lastName,
          NationalIdentity:memberr.nationalIdentity,
          Adress:memberr.adress
        })
      })
    }
  
    UpdateUser(){
      const isFormValid = this.userForm.valid;
      if(isFormValid){
        const token:any = localStorage.getItem('token');
        const decodedToken:any = jwtDecode(token);
        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        this.userForm.setValue({ Id:userId});
        this.client.put('api/Users',this.userForm)
        .subscribe((response)=>{
          console.log(response);
        })
        this.UpdateMember();
      }else {
        alert("bilgilerinizi düzgün doldurunuz")
      }


    }

    UpdateMember(){
      const token:any = localStorage.getItem('token');
      const decodedToken:any = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      this.userForm.setValue({ Id:userId});
      this.client.get('api/Members/' + userId)
      .subscribe((response)=>{
        this.memberForm.setValue({ Id:response.Id})
      })
      
      this.client.put('api/Members' , this.memberForm)
      .subscribe((response)=>{
        console.log(response);
      })
    
    }
    
  }
