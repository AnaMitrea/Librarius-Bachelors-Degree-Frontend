import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryList'
})
export class BookCategoryPipe implements PipeTransform {
  transform(categories: any[]): string {
    if (categories === undefined || categories === null || categories.length === 0) {
      return '';
    }

    return categories.map(category => category.title).join(', ');
  }
}
