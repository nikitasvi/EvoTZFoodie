import { Component } from '@angular/core';
import { TabType } from '../admin-page/admin-page.component';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../_admin.scss'],
})
export class UsersComponent {
  public currentTab: TabType = 'users';
  public users: IUser[] = [];

  constructor(private readonly userService: UsersService) {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }
}
