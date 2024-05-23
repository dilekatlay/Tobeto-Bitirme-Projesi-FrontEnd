import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoryComponent } from './components/category/category.component';
import { BookdetailComponent } from './components/bookdetail/bookdetail.component';
import { CategorydetailComponent } from './components/categorydetail/categorydetail.component';
import { authGuard } from './guards/auth.guard';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EmployeePanelComponent } from './pages/employee-panel/employee-panel.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { MemberregisterComponent } from './pages/memberregister/memberregister.component';
import { ProfileUpdateComponent } from './pages/profile-update/profile-update.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ReservationComponent } from './pages/reservation/reservation.component';

export const routes: Routes = [
{path:'' , redirectTo : 'homepage' , pathMatch :'full'},
{path: 'categories', component: CategoryComponent },  
{path: 'homepage', component: HomepageComponent },
{path: 'aboutus', component: AboutusComponent },
{path: 'contact', component: ContactComponent },
{path: "categories/:id", component: CategorydetailComponent},
{path: "books/:id", component: BookdetailComponent},
{path: "basket", component: BasketComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'memberregister',component:MemberregisterComponent,canActivate:[authGuard]},
{path:'userprofile',component:UserProfileComponent ,canActivate:[authGuard]},
{path:'profile-update', component:ProfileUpdateComponent,canActivate:[authGuard]},
{path:'employeepanel',component:EmployeePanelComponent,canActivate:[authGuard]},
{path: 'Management',component:ReservationComponent,canActivate:[authGuard]}
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }