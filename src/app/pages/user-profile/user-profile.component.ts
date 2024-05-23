import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { HttpRequestService } from '../../services/http-request.service';
import { MemberRegister } from '../../Models/MemberRegister';
import { User } from '../../Models/User';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
member : MemberRegister;
user : User;
client = inject(HttpRequestService)

  constructor() {
    this.member = new MemberRegister();
    this.user = new User();
  }

   ngOnInit(){
    const token:any = localStorage.getItem('token');
    const decodedToken:any = jwtDecode(token);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.client.get('api/Users/'+ userId)
    .subscribe((response) =>{
     console.log(response)
     this.user.email = response.email
    
    })
      const memberURL:any = 'api/Members/User'+ userId;
      this.client.get(memberURL)
    .subscribe((memberr) =>{
      console.log(memberr);
     this.member.FirstName = memberr.firstName
     this.member.LastName = memberr.lastName 
     this.member.NationalIdentity = memberr.nationalIdentity
     this.member.Adress = memberr.adress
    })
  }

}
