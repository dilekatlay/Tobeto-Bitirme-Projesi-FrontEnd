import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookComponent } from "../book/book.component";
import { CloudinaryModule } from '@cloudinary/ng';
import { CategorydetailComponent } from '../categorydetail/categorydetail.component';
import { FilterCategoryPipe } from '../../pipes/filter-category.pipe';
import { Category } from '../../models/category';
import { kitap } from '../../Models/kitap';




@Component({
    selector: 'app-category',
    standalone: true,
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    imports: [CloudinaryModule, FormsModule, CommonModule, RouterModule, HttpClientModule, BookComponent, CategorydetailComponent, FilterCategoryPipe]
})
export class CategoryComponent {
  categories: Category[] = [];
  books: kitap[] = [];
  searchKey: string = '';

    constructor(private httpclient: HttpClient) { }
    async ngOnInit(){
    this.httpclient.get<any>('http://localhost:60805/api/Categories?PageIndex=0&PageSize=30')
    .subscribe((response) => {
        let categoryObject = new Category(response.items)
        this.categories = response.items.map((item: any) => new Category(item));

      });
  }
  }

