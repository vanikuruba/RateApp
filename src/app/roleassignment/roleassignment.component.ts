import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-roleassignment',
  templateUrl: './roleassignment.component.html',
  styleUrls: ['./roleassignment.component.css']
})
export class RoleassignmentComponent {

  users: any[] = [];
  roles: any[] = [];
  selectedUserId: number | undefined;
  selectedRoleId: number | undefined;

  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadRoles(): void {
    this.userService.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data;
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  assignRole(): void {
    if (this.selectedUserId && this.selectedRoleId) {
      // Call your service method to assign role to user
      console.log('Assigning role to user with userId:', this.selectedUserId, 'and roleId:', this.selectedRoleId);
      
      // Make the service call to assign the role
      this.userService.updateUserRole(this.selectedUserId, this.selectedRoleId).subscribe(
        (response) => {
          console.log('Role assigned successfully:', response);
          // You can handle success here, such as displaying a success message
        },
        (error) => {
          console.error('Error assigning role:', error);
          // You can handle errors here, such as displaying an error message
        }
      );
    } else {
      console.error('Please select both user and role.');
    }
  }
  
  // userId: number | undefined;
  // roleId: number | undefined;

  // constructor(private userService: UserService) { }

  // updateUserRole() {
  //   if (!this.userId || !this.roleId) {
  //     alert('Please provide both user ID and role ID.');
  //     return;
  //   }
  //   this.userService.updateUserRole(this.userId, this.roleId).subscribe(
  //     (response) => {
  //       console.log('User role updated successfully:', response);
  //       // Handle success, such as displaying a success message
  //     },
  //     (error) => {
  //       console.error('Error updating user role:', error);
  //       // Handle error, such as displaying an error message
  //     }
  //   );
  // }
  
}
