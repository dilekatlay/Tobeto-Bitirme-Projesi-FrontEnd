export class Shelf{
    id:string;
    shelfNo:number;
    shelfLocation:string;
    capacity:number;
    numberOfBooksAvailable:boolean;
    
    constructor(data: any) {
        this.id=data.id;
        this.shelfNo = data.shelfNo;
        this.shelfLocation =data.shelfLocation;
        this.capacity =data.capacity;
        this.numberOfBooksAvailable=data.numberOfBooksAvailable;
        
    }
}
