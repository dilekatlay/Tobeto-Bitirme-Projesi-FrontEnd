import { Component, OnInit, inject } from '@angular/core';
import { HttpRequestService } from '../../services/http-request.service';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, Icategory } from '../../models/category';
import { CommonModule } from '@angular/common';
import { AddCategory } from '../../Models/addcategory';
import { Reservation } from '../../Models/reservations';
import { Shelf } from '../../Models/shelf';
import { IKitap, Ikitap } from '../../Models/kitap';





@Component({
  selector: 'app-employee-panel',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './employee-panel.component.html',
  styleUrl: './employee-panel.component.scss'
})
export class EmployeePanelComponent implements OnInit  {
  client = inject(HttpRequestService);
  category:AddCategory = new AddCategory();
  categoryForm!:FormGroup;
  bookForm!:FormGroup;
  shelfAdd!:FormGroup;
  Category:Category[] = [];
  Reservs:Reservation[]=[];
  Shelf:Shelf[] = [];
  Book!:IKitap;
  UpdateReservation!:FormGroup;
  UpdateBook!:FormGroup;
  constructor(private fb:FormBuilder) {}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({ 
      fileSource: ["", [Validators.required]],
      categoryName: ["", [Validators.required]],
    });
    this.shelfAdd = this.fb.group({
      shelfNo:["",[Validators.required]],
      shelfLocation:["",[Validators.required]],
      capacity:["",Validators.required],
      numberOfBooksAvailable:[true,Validators.required]
    })
    this.bookForm = this.fb.group({
      fileSource: ["", [Validators.required]],
      isbnNo:["",Validators.required],
      bookName:["",Validators.required],
      numberOfCopies:["",Validators.required],
      numberOfPages:["",Validators.required],
      CategoryId:["",Validators.required],
      ShelfId:["",Validators.required],
      writer:["",Validators.required],
      unitPrice:["",Validators.required],
      summary:["",Validators.required]
    })
    this.getCategories();
    this.getShelfs();
  };
  addCategory(Data: Icategory){   
      console.log(Data)
      let formData = new FormData();
      const getFileSource = this.categoryForm.get('fileSource')?.value
      formData.append('categoryName',Data.categoryName)
      formData.append('formFile',getFileSource);
      if(this.categoryForm.valid){
        debugger
        this.client.post('api/Categories',formData )
        .subscribe(response => {
         console.log(response);
        });
      }
    }
    SelectedImage(Data:any)
    {
      const file = Data.target.files[0];
      this.categoryForm.patchValue(
        {fileSource:file}
       )
    }
    SelectedBookImage(Data:any)
    {
      const file = Data.target.files[0];
      this.bookForm.patchValue(
        {fileSource:file}
       )
    }
    addBook(Data:Ikitap){
     let formData = new FormData();
     const getShelfSource = this.bookForm.get('ShelfId')?.value
     const getCategorySource = this.bookForm.get('CategoryId')?.value
     const getFileSource = this.bookForm.get('fileSource')?.value
     const unitPrice = (Data.unitPrice).toString();
     formData.append('unitPrice',unitPrice)
     formData.append('writer',Data.writer)
     formData.append('summary',Data.summary)
     formData.append('formFile',getFileSource)
     formData.append('isbnNo',Data.isbnNo)
     formData.append('bookName',Data.bookName)
     formData.append('categoryId',getCategorySource)
     formData.append('shelfId',getShelfSource)
     formData.append('numberOfCopies',Data.numberOfCopies)
     formData.append('numberOfPages',Data.numberOfPages) 
     debugger
     console.log(formData)
     this.client.post('api/Books',formData).subscribe(response=>{
      console.log(response)
     })
     alert('Kitap Eklendi')
    } 
    getCategories(){
      this.client.get('api/Categories?PageIndex=0&PageSize=10000').subscribe(response =>{
        this.Category = response.items.map((item: any) => new Category(item));
      })}
   getShelfs(){
    this.client.get('api/Shelves?PageIndex=0&PageSize=1000').subscribe(response =>{
      this.Shelf = response.items.map((item: Shelf) => new Shelf(item)); 
      
    })}
      onCategorySelect(Data:any){
        
        this.bookForm.patchValue(
          {CategoryId:Data.items.id}
         )
      }
      onShelfSelect(Data:any)
      {
        this.bookForm.patchValue(
          {ShelfId:Data.items.id}
         )
      }
      
      addShelf(Data:Shelf){
        
        this.client.post('api/Shelves',Data).subscribe(response=>{
          console.log(response)
        })
        alert('Raf Eklendi')
      }
}