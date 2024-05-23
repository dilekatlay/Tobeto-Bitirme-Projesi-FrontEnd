import { kitap } from "./kitap";



export class Reservation{
    id:string;
    bookId:string;
    memberId:string;
    reservationDate:Date;
    reservationEndDate:Date;
    isReserv:Boolean;
    book:kitap;
    constructor(data:any) {
        this.id = data.id;
        this.bookId = data.bookId;
        this.memberId = data.memberID;
        this.reservationDate = data.reservationDate;
        this.reservationEndDate=data.reservationEndDate;
        this.isReserv=data.isReserv;
        this.book=data.book;
    }
}
export class Resevatio{
    id:string;
    bookId:string;
    memberId:string;
    reservationDate:Date;
    reservationEndDate:Date;
    isReserv:Boolean;
    constructor() {
        this.id='';
        this.bookId='';
        this.memberId='';
        this.reservationDate = new Date();
        this.reservationEndDate = new Date();
        this.isReserv = true

        
    }
}
