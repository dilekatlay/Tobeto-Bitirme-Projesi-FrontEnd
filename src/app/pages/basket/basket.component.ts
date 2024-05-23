import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookComponent } from '../../components/book/book.component';
import { BookdetailComponent } from '../../components/bookdetail/bookdetail.component';
import { CategoryComponent } from '../../components/category/category.component';
import { CategorydetailComponent } from '../../components/categorydetail/categorydetail.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { kitap } from '../../Models/kitap';




@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,BookComponent,BookdetailComponent,CategoryComponent,CategorydetailComponent,NavbarComponent, ReactiveFormsModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  products: kitap[] = [];

  constructor(private http: HttpClient) {}

removeFromBasket(bookId: string) {
  // Sepetten ürün kaldırıldığında stok adedini arttırmak için backend API'sine istek gönder
  this.increaseStock(bookId).subscribe(
    () => {
      console.log('Stok arttırma isteği başarıyla gönderildi');
    },
    (error) => {
      console.error('Stok arttırma isteği başarısız oldu:', error);
    }
  );
}

// Backend API'sine stok adedini arttırmak için HTTP isteği gönderme fonksiyonu
increaseStock(bookId: string) {
  const apiUrl = `http://localhost:60805/api/Books/increaseStock/${bookId}`;
  return this.http.put(apiUrl, {});
}

  // Sepetteki toplam tutarı hesaplama
  getTotalPrice(): number {
    return this.products.reduce((total, product) => total + product.unitPrice, 0);
  }

}
