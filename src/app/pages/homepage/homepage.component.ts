import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BookComponent } from '../../components/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from '../../components/category/category.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';



@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [CommonModule, FormsModule, RouterModule, NavbarComponent,HttpClientModule]
})
export class HomepageComponent {
    myImage =  new CloudinaryImage('sample', {cloudName: 'dew2adsux'});
    
   

}
