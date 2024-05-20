import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupComponent } from '../user/signup/signup.component';
import { UserService } from '../services/user.service';
// import { UpdateUserProfileComponent } from '../update-user-profile/update-user-profile.component';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showUserProfile: boolean = false;
  showUpdateForm: boolean = false;
  currentUser: any;
  initials = '';
  fullName = '';
  role = '';
  constructor( private router: Router,public dialog: MatDialog,private userService:UserService) { }
 
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.fullName = this.currentUser.fullName;
    this.initials = this.generateInitials(this.fullName);
    console.log(this.initials);
    console.log(this.currentUser)
    this.role = this.currentUser.roles?.roleName;
   
  }
 
  toggleUserProfile() {
    this.showUserProfile = !this.showUserProfile;
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }

  generateInitials(fullName: string): string {
    if (!fullName) {
      return ''; // Handle the case when name is undefined or empty
    }
   
    const names = fullName.split(' ');
    const firstNameInitial = names[0][0].toUpperCase();
    const lastNameInitial = names.length > 1 ? names[1][0].toUpperCase() : '';
 
    return firstNameInitial + lastNameInitial;
  }
 
  openDialog() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const dialogRef = this.dialog.open(SignupComponent, {
      data: {
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        workEmail: this.currentUser.workEmail,
        costCenter: this.currentUser.costCenter,
        userId: this.currentUser.userId
        // roleName: this.currentUser.roles.roleName
      }
    });
 
    dialogRef.afterClosed().subscribe((updatedUserData: any) => {
      if (updatedUserData) {
        // Update the user data with the updated form data
        this.currentUser =  localStorage.getItem('currentUser');;
      }
    });
  }

  onSignOut() {
    const id = this.currentUser?.userId; // Get the id from user info
    // console.log(this.userInfo?.userId)
    // Check if an id is available
    if (!id) {
      console.log("User ID is not available.");
      return;
    }
  
    // Prepare the data to update 'loggedIn' to false
    const dataToUpdate = { loggedIn: false };
  
  
    this.userService.logOutUser(id,dataToUpdate).subscribe(
      (data: any) => {
        console.log('PUT request successful', data);
        // console.log(data)
        localStorage.removeItem('userData')
        // this.authService.logout();
        // this.snackBar.open('Logged out successfully!', 'Dismiss', {
        //   duration: 5000, // Duration in milliseconds
        // });
        this.router.navigate(['/home']); // Navigate to the post component or another route
      }
      ,
      (error: any) => {
        // alert("Credentials mismatched...");
        console.error('PUT request failed', error);
  
      }
    );
  }



}