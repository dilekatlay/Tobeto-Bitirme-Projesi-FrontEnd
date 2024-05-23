import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CloudinaryModule } from '@cloudinary/ng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookComponent } from '../book/book.component';
import { CategoryComponent } from '../category/category.component';
import { Category } from '../../models/category';
import { CategorydetailComponent } from '../categorydetail/categorydetail.component';
import { response } from 'express';
import { FilterBookPipe } from '../../pipes/filter-book.pipe';
import { BasketComponent } from '../../pages/basket/basket.component';
import { kitap } from '../../Models/kitap';


@Component({
  selector: 'app-bookdetail',
  standalone: true,
  imports: [CloudinaryModule, CommonModule, RouterModule, FormsModule, BookComponent, CategoryComponent, CategorydetailComponent, FilterBookPipe, BasketComponent],
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.scss'
})
export class BookdetailComponent implements OnInit{
  book: kitap | null = null;
  category: Category | null = null;
  searchKey: string = '';
  basket: kitap[] = [];
  basketItemCount: number = 0;
  products: kitap[] = []; 
  
  constructor(private route: ActivatedRoute,private httpclient: HttpClient) {}

  addToBasket(product: kitap) {
    if (this.book) {
      // Eğer kitabın stok adedi 0 ise "Haber Ver" butonunu göster
      if (this.book.numberOfCopies === 0) {
        alert('Üzgünüz, bu ürün stokta bulunmamaktadır. Lütfen haber ver butonunu kullanarak stok geldiğinde bilgilendirilmek için iletişime geçiniz.');
      } else {
        // Eğer stok adedi 0 değilse, sepete ekleme işlemini gerçekleştir
        this.basket.push(product);
        this.products.push(this.book); // Ürünü sepet ürünleri listesine ekle
        this.basketItemCount++; // Sepet sayacını artır
        console.log('Kitap sepete eklendi:', this.book);
        alert('Kitap sepete eklendi: ' + this.book.bookName);
  
        // Kitabın stok adedini azaltmak için backend API'sine istek gönder
        this.reduceStock(this.book.id);
  
        // Sayfanın yenilenmesi
        window.location.reload();
      }
    } else {
      console.error('Kitap bulunamadı!');
      alert('Kitap bulunamadı!');
    }
  }
  
  
  

reduceStock(bookId: string) {
  // Kitabın stok adedini azaltmak için backend API'sine istek gönder
  const apiUrl = `http://localhost:60805/api/Books/${bookId}/reduceStock`;
  this.httpclient.put(apiUrl, {}).subscribe(
    (response) => {
      console.log('Stok azaltma isteği başarıyla gönderildi:', response);
    },
    (error) => {
      console.error('Stok azaltma isteği başarısız oldu:', error);
    }
  );
}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
      this.httpclient.get('http://localhost:60805/api/Books/'+productId)
      .subscribe((response)=>{
        console.log(response)
        this.book = new kitap(response);
        

        const categoryId = this.route.snapshot.paramMap.get('id');
      this.httpclient.get('http://localhost:60805/api/Categories?categoryId='+categoryId)
      .subscribe((response)=>{
        console.log(response)
        this.category = new Category(response);
        
      }) 
    });
  }

  }

