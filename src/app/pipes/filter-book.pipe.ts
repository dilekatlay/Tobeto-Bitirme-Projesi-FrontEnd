import { Pipe, PipeTransform } from '@angular/core';
import { kitap } from '../Models/kitap';





@Pipe({
  name: 'filterBook',
  standalone: true
})
export class FilterBookPipe implements PipeTransform {

  transform(value: kitap[], searchKey: string, filterProperties: string[]): kitap[] {
    if (!searchKey || searchKey.length < 3) return value;

    return value.filter((book: any) => { // book nesnesinin tipini 'any' olarak belirtiyoruz
      // Her bir özellik için filtreleme yapın
      for (const prop of filterProperties) {
        if (book[prop] && book[prop].toString().toLowerCase().includes(searchKey.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
}
