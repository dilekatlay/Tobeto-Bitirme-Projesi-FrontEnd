export class kitap {
    id: string;
    isbnNo: string;
    bookName: string;
    summary: string;
    writer: string;
    shelfId: string;
    numberOfCopies: number;
    numberOfPages: number;
    categoryId: string;
    imageUrl: string;
    unitPrice: number;


    constructor(data: any) {
      this.id = data.id || '';
      this.isbnNo = data.isbnNo || '';
      this.bookName = data.bookName || '';
      this.summary = data.summary || '';
      this.writer = data.writer || '';
      this.shelfId = data.shelfId || '';
      this.numberOfCopies = data.numberOfCopies || '';
      this.numberOfPages = data.numberOfPages || '';
      this.categoryId = data.category || '';
      this.imageUrl = data.imageUrl || '';
      this.unitPrice = data.unitPrice || '';
  
    }
  }
  export interface Ikitap
  {
    file: File;
    isbnNo: string;
    bookName: string;
    categoryId: string;
    shelfId: string;
    numberOfCopies: string;
    numberOfPages: string;
    unitPrice: number;
    summary: string;
    writer: string;
  }
export interface IKitap{
  id: string;
  isbnNo: string;
  bookName: string;
  shelfId: string;
  numberOfCopies: number;
  numberOfPages: number;
  categoryId: string;
  imageUrl: string;
}