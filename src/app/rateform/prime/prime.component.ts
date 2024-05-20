import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { Prime } from './primemodel.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeService } from 'src/app/services/prime.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RateinfoComponent } from '../rateinfo/rateinfo.component';
 
// @Injectable({
//   providedIn: 'root'
// }) 

@Component({
  selector: 'app-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.css']
})
export class PrimeComponent {
  primeForm!: FormGroup;
  hideRateIdField: boolean = false;
  isTitleRequired:boolean = true;
  viewMode:any;
 

  constructor(private formBuilder: FormBuilder, private primeService: PrimeService,private snackbar:MatSnackBar,  private route: ActivatedRoute , private rateInfo :RateinfoComponent) {
    this.primeForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      indexNumber:['', Validators.required],
      spread: ['', Validators.required],
      floor:  ['', Validators.required],
       rateId: [0],
       primeId: [0]
    });
  }
 


ngOninit(){
  this.route.params.subscribe(params => {
      
    // this.rateComponent.fetchRateInfo(params['rateId']);
    this.viewMode= params['state']
    console.log(this.viewMode)

    
  });
}

   
  addPrime(newPrime: Prime): void {
    this.primeService.addPrime(newPrime).subscribe(
      // console.log(newPrime);
            (prime) => {
              console.log('Created primecomponent:', prime);
              console.log('prime creation completed');
              this.snackbar.open('Prime created successfully', 'Close', {
                duration: 3000,
              });
     
              this.primeForm.reset();

            },
            (error: any) => {
              console.error('Error creating prime:', error);
            }
        );      
  }

  updatePrime(primeId: number,updatedPrime:Prime): void {
    console.log( updatedPrime)
    this.primeService.updatePrime(primeId,updatedPrime).subscribe(
      // console.log(newPrime);
            (prime) => {
              console.log('Created primecomponent:', prime);
              console.log('prime creation completed');
              this.snackbar.open('Prime created successfully', 'Close', {
                duration: 3000,
              });
     
              this.primeForm.reset();

            },
            (error: any) => {
              console.error('Error creating prime:', error);
            }
        );      
  }

fetchPrimeComponentData(rateId:number){
this.primeService.getPrimeByRateId(rateId).subscribe((primeData:any)=>{
  console.log(primeData)
if (primeData != null) {
  // console.log("prime becomes null")
  this.primeForm = this.formBuilder.group({
    primeId: primeData.primeId,
    bankName: [primeData.bankName],
    indexNumber:[primeData.indexNumber],
    spread: [primeData.spread],
    floor:  [primeData.floor],
     rateId: [primeData.rateId]
  });
}
else{
  this.rateInfo.checkboxes.forEach(checkbox => {
    if (checkbox.label === 'Prime Component') {
      checkbox.checked = false;
    } 
  });
  
  
}


 
  this.route.params.subscribe(params => {   
    this.viewMode= params['state']
    console.log(this.viewMode)
    if (this.viewMode == 'view') {
      this.primeForm.disable();
    } else {
      this.primeForm.enable();
    }
    
  });
},(error)=>{
  console.log(error)

})
}

  getData() {
    return this.primeForm.value;
  } 
 
}