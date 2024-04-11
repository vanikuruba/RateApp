import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/singnin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  hide = true;
  signinForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router, private signinService: SigninService) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignIn() {
    const username = this.signinForm.value.username;
    const password = this.signinForm.value.password;

    // Call the authenticateUser method from the SigninService
    this.signinService.authenticateUser({ username, password }).subscribe(
      (response) => {
        
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
       this.errorMessage = 'Invalid username or password';
      }
    );
  }

}
