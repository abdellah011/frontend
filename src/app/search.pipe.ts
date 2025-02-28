import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users: any[], searchText: string): any[] {
    if (!users || !searchText) {
      return users;
    }
    
    searchText = searchText.toLowerCase();

    return users.filter(user =>
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.Password.toLowerCase().includes(searchText) ||
      user.department.toLowerCase().includes(searchText) ||
      user.id.toString().includes(searchText)
    );
  }
}
