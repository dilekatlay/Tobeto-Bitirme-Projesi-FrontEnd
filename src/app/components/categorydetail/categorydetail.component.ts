import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CloudinaryModule } from '@cloudinary/ng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookComponent } from '../book/book.component';
import { CategoryComponent } from '../category/category.component';

import { FilterBookPipe } from '../../pipes/filter-book.pipe';

import { Category } from '../../models/category';
import { kitap } from '../../Models/kitap';



@Component({
  selector: 'app-categorydetail',
  standalone: true,
  imports: [CloudinaryModule, CommonModule, RouterModule, FormsModule, BookComponent, CategoryComponent, CategorydetailComponent, FilterBookPipe],
  templateUrl: './categorydetail.component.html',
  styleUrl: './categorydetail.component.scss'
})
export class CategorydetailComponent {
  category: Category | null = null;
  books: kitap[] = [];
  searchKey: string = '';


  constructor(private route: ActivatedRoute,private httpclient: HttpClient) {
    
  }

  ngOnInit() {
    const categoryId = this.route.snapshot.paramMap.get('id');
      this.httpclient.get('http://localhost:60805/api/Categories/'+categoryId)
      .subscribe((response)=>{
        console.log(response)
        this.category = new Category(response);

        this.httpclient.get<any>('http://localhost:60805/api/Books/ByCategory?categoryId='+categoryId+'&pageIndex=0&pageSize=10')
  .subscribe((response) => {
      let bookObject = new kitap(response);
      this.books = response.map((item: any) => new kitap(item));

    });
      })
  }
}
