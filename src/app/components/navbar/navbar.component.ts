
import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasketComponent } from '../../pages/basket/basket.component';
import { BookdetailComponent } from '../bookdetail/bookdetail.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule, BasketComponent, BookdetailComponent, BasketComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  

}
