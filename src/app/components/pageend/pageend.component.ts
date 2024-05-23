import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pageend',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './pageend.component.html',
  styleUrl: './pageend.component.scss'
})
export class PageendComponent {

  currentYear: number = new Date().getFullYear();

}
