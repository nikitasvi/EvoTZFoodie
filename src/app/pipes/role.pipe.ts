import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../models/Auth';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(role: Role): string {
    switch (role) {
      case Role.Admin:
        return 'Администратор';
      case Role.User:
        return 'Пользователь';
      default:
        return 'Неизвестная роль';
    }
  }
}
