import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/ng';
import { BookComponent } from './components/book/book.component';
import { CategoryComponent } from './components/category/category.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageendComponent } from './components/pageend/pageend.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CloudinaryModule,
    RouterOutlet,
     CommonModule,
      FormsModule,
      RouterOutlet,
       ReactiveFormsModule,
        HomepageComponent,
         NavbarComponent,
          BookComponent,
           CategoryComponent,
            NgOptimizedImage,
             CategoryComponent,
              PageendComponent,
              ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StoryStack';
}
