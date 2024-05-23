import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { kitap } from '../../Models/kitap';




@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent{
  books: kitap[] = [];



    constructor(private httpclient: HttpClient) { }
    async ngOnInit(){
    this.httpclient.get<any>('http://localhost:60805/api/Books?PageIndex=0&PageSize=50')
    .subscribe((response) => {
        this.books = response.items.map((item: any) => new kitap(item));
    })


}


}