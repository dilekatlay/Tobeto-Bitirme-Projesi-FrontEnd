import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PageendComponent } from '../../components/pageend/pageend.component';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule, NavbarComponent, NgOptimizedImage, PageendComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {

}
