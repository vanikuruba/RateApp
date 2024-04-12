import { Component } from '@angular/core';
import { Prime } from './primemodel.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeService } from 'src/app/services/prime.service';
import { MatSnackBar } from '@angular/material/snack-bar';
 
 
@Component({
  selector: 'app-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.css']
})
export class PrimeComponent {
  primeForm!: FormGroup;
  hideRateIdField: boolean = false;
  isTitleRequired:boolean = true;
  astrick:any= '<span  class="red-star">*</span>';
 
  constructor(private formBuilder: FormBuilder, private primeService: PrimeService,private snackbar:MatSnackBar) {}
 
  ngOnInit(): void {
    this.initializeForm();
  }
 
  initializeForm(): void {
    this.primeForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      indexNumber:[0, Validators.required],
      spread: [0, Validators.required],
      floor:  [0, Validators.required],
      rateId: [0, Validators.required]
    });
    this.isTitleRequired = this.primeForm.value.bankName.hasValidator(Validators.required);
  }
   
 
  addPrime(): void {
    console.log(this.primeForm.value.studentUgId)
    if (this.primeForm.valid) {
      const newPrime: Prime = {
        bankName: this.primeForm.value.bankName,
        indexNumber: this.primeForm.value.indexNumber,
        floor: this.primeForm.value.floor,
        spread: this.primeForm.value.spread,
        rateId: this.primeForm.value.rateId
      };
 
      this.primeService.addPrime(newPrime).subscribe(
        (prime: Prime) => {
          console.log('Created primecomponent:', prime);
          console.log('prime creation completed');
          this.snackbar.open('Prime created successfully', 'Close', {
            duration: 3000,
          });
 
         
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating prime:', error);
        }
      );
    }
  }
 
}