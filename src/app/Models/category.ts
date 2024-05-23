export class Category{
    id: string;
    categoryName:string;
    imageUrl:string;
  static categoryName: any;

    constructor(data: any) {
      this.id = data.id;
      this.categoryName = data.categoryName;
      this.imageUrl = data.imageUrl;
    }
}


export interface Icategory{
  categoryName:string
  fileSource:File,
}