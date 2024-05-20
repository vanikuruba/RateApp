import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CeilingService } from 'src/app/services/ceiling.service';
import { Ceiling } from './ceilingmodel.component';
import { ActivatedRoute } from '@angular/router';
import { RateinfoComponent } from '../rateinfo/rateinfo.component';
 
@Component({
  selector: 'app-ceiling',
  templateUrl: './ceiling.component.html',
  styleUrls: ['./ceiling.component.css']
})
export class CeilingComponent {
  ceilingForm!: FormGroup;
  isTitleRequired:boolean = true;
  viewMode: any;
 
  constructor(private formBuilder: FormBuilder, private ceilingService: CeilingService,private snackbar:MatSnackBar,private route: ActivatedRoute ,private rateInfo :RateinfoComponent) {
    this.ceilingForm = this.formBuilder.group({
  
      compositeRateOverallFloor:[0, Validators.required],
      compositeRateOverallCeiling: [0, Validators.required],
      ceilingId:[0]
     
    });
  }
  
 
  addCeiling(newCeiling: Ceiling): void {
    if (this.ceilingForm.valid) {
      // const newCeiling: Ceiling= {
       
      //   compositeRateOverallFloor: this.ceilingForm.value.compositeRateOverallFloor,
      //   compositeRateOverallCeiling: this.ceilingForm.value.compositeRateOverallCeiling,
      //   rateId: this.ceilingForm.value.rateId,
     
      // };
 
      this.ceilingService.addCeiling(newCeiling).subscribe(
        (ceiling: Ceiling) => {
          console.log('Created Ceilingcomponent:', ceiling);
          console.log('Ceiling creation completed');
          this.snackbar.open('Ceiling created successfully', 'Close', {
            duration: 7000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating ceiling:', error);
        }
      );
    }
  }

  updateCeiling(ceilingId:number,updatedCeiling: Ceiling): void {
    if (this.ceilingForm.valid) {
      console.log(ceilingId)
      this.ceilingService.updateCeiling(ceilingId,updatedCeiling).subscribe(
        (ceiling: Ceiling) => {
          console.log('Created Ceilingcomponent:', ceiling);
          console.log('Ceiling creation completed');
          this.snackbar.open('Ceiling created successfully', 'Close', {
            duration: 7000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating ceiling:', error);
        }
      );
    }
  }


  fetchCeilingComponentData(rateId:number){
    this.ceilingService.getCeilingByRateId(rateId).subscribe((ceilingData:any)=>{
      console.log(ceilingData)
if (ceilingData != null) {
  this.ceilingForm = this.formBuilder.group({
    ceilingId:ceilingData.ceilingId,
    compositeRateOverallFloor:[ceilingData.compositeRateOverallFloor],
    compositeRateOverallCeiling: [ceilingData.compositeRateOverallCeiling],
    rateId:[ceilingData.rateId]
   
  });
} 
else{
  this.rateInfo.checkboxes.forEach(checkbox => {
if (checkbox.label === 'Rate Includes Overall Floor Or Ceiling') {
checkbox.checked = false;
} 
});
}

      this.route.params.subscribe(params => {   
        this.viewMode= params['state']
        console.log(this.viewMode)
        if (this.viewMode == 'view') {
          this.ceilingForm.disable();
        } else {
          this.ceilingForm.enable();
        }
        
      });
    },(error)=>{
      console.log(error)
    
    })
    }
  getData() {
    return this.ceilingForm.value;
  } 
 
}