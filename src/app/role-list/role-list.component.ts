import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Roles } from './rolemodel.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {
  roles: Roles[] = [];
  displayedColumns: string[] = ['roleId', 'roleName'];

  constructor(private roleService: UserService) { }

  // ngOnInit(): void {
  //   this.getRoles();
  // }

  // getRoles() {
  //   this.roleService.getAllRoles().subscribe((data: Roles[]) => {
  //     this.roles = data;
  //   });
  // }

}
