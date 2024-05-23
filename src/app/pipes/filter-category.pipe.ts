import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category';

@Pipe({
  name: 'filterCategory',
  standalone: true
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: Category[], searchKey: string, filterProperties: string[]): Category[] {
    if (!searchKey || searchKey.length < 3) return value;

    return value.filter((category: any) => { // book nesnesinin tipini 'any' olarak belirtiyoruz
      // Her bir özellik için filtreleme yapın
      for (const prop of filterProperties) {
        if (category[prop] && category[prop].toString().toLowerCase().includes(searchKey.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
