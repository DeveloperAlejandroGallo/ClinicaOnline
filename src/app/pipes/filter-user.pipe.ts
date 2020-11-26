import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../class/user';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(users: Array<User>, ...args: string[]): Array<User> {

    let usersList = Array<User>();
    let state: boolean;
    let filterType = args[0];
    console.log('En el PIPE');
    console.table(users);

    if (users.length > 0) {
      switch (filterType) {
        case 'approved':
          state = args[1] == 'true';
          usersList = users.filter(u => u.approved == state && u.profile == 'Profesional');
          break;
        case 'active':
          state = args[1] == 'true';
          usersList = users.filter(u => u.isActive == state);
          break;
        case 'profile':
          usersList = users.filter(u => u.profile == args[1]);
          break;
        case 'speciality':
          let specialityName = args[1]
          usersList = users.filter(u => u.specialitiesDays.some(s => s.spec.name == specialityName));
          break;
      }
    }
    return usersList;
  }

}
