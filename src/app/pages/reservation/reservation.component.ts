import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpRequestService } from '../../services/http-request.service';
import { CommonModule } from '@angular/common';
import { IKitap } from '../../Models/kitap';
import { Reservation } from '../../Models/reservations';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  Book!:IKitap;
  Reservs:Reservation[]=[];
  UpdateReservation!:FormGroup;
  UpdateBook!:FormGroup;
  Reserve!:Reservation;
  client = inject(HttpRequestService)
  constructor(private fb:FormBuilder) {}



  ngOnInit(): void {
  this.UpdateReservation = this.fb.group({
    id:[''],
    bookId:[''],
    memberID:[''],
    isReserv:[''],
    reservationDate:[''],
    reservationEndDate:['']

  })
  this.UpdateBook = this.fb.group({
      id:[""],
      isbnNo:[""],
      bookName:[""],
      numberOfCopies:[""],
      numberOfPages:[""],
      categoryId:[""],
      shelfId:[""],
      writer:[""],
      unitPrice:[""],
      summary:[""],
      imageUrl:[""]

  })
}
  getReservations(id:string){
    this.client.get('api/Reservations/member/'+id+'?PageIndex=0&PageSize=1000').subscribe(response=>{
      console.log(response)
      this.Reservs=response.items.map((item:Reservation)=> new Reservation(item))
    })
  }
  updateReservation()
  {
  this.UpdateReservation.patchValue(
    {id:this.Reserve.id,
     bookId:this.Reserve.bookId,
     memberID:this.Reserve.memberId,
     reservationDate:this.Reserve.reservationDate,
     reservationEndDate:this.Reserve.reservationEndDate,
     isReserv: false
    }
   )
   this.UpdateBook.patchValue(
    {
      id:this.Reserve.book.id,
      isbnNo:this.Reserve.book.isbnNo,
      bookName:this.Reserve.book.bookName,
      shelfId:this.Reserve.book.shelfId,
      numberOfCopies:this.Reserve.book.numberOfCopies +1,
      numberOfPages:this.Reserve.book.numberOfPages,
      categoryId:this.Reserve.book.categoryId,
      imageUrl:this.Reserve.book.imageUrl,
      summary:this.Reserve.book.summary,
      unitPrice: this.Reserve.book.unitPrice,
      writer:this.Reserve.book.writer,

    }
   )
 debugger
    const book = this.UpdateBook.value;
    const reservation = this.UpdateReservation.value;
    console.log(book)
    console.log(reservation)
    this.client.put('api/Reservations',reservation).subscribe(response=>{
      debugger
      console.log(response)
    })
    this.client.put('api/Books',book).subscribe(response=>{
      console.log(response)
    })
  }
}
