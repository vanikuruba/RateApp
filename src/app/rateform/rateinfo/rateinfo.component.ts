import { Component } from '@angular/core';
import { Prime } from '../prime/primemodel.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrimeService } from 'src/app/services/prime.service';

@Component({
  selector: 'app-rateinfo',
  templateUrl: './rateinfo.component.html',
  styleUrls: ['./rateinfo.component.css']
})
export class RateinfoComponent {
  primeForm!: FormGroup;
  hideRateIdField: boolean = false;
  isTitleRequired:boolean = true;
  isInputDisabled: boolean = true;
  selectedFiles!: File[];
 
  constructor(private formBuilder: FormBuilder, private primeService: PrimeService,private snackbar:MatSnackBar) {}
 
  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired = true;
  }
 
  initializeForm(): void {
    this.primeForm = this.formBuilder.group({
      preaperdBy: ['', Validators.required],
      dateOfPrepared:['', Validators.required],
      customerName: [0, Validators.required],
      obligor:  [0, Validators.required],
      obligations: [0, Validators.required],
      nextBillDate: ['', Validators.required],
      leadDays:['', Validators.required],
      status: ['creating', Validators.required],
      attachments: [''],
      
    });
    
    // this.isTitleRequired = this.primeForm.value.bankName.hasValidator(Validators.required);
  }
   
  public onFileChanged(event:any) {
    //Select File
    // this.selectedFile = event.target.files[0];
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles.length)
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
   
  }
  
  addPrime(): void {
    
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
