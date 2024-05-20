import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FederalService } from 'src/app/services/federal.service';
import { Federal } from './federalmodel.component';
import { ActivatedRoute } from '@angular/router';
import { RateinfoComponent } from '../rateinfo/rateinfo.component';
 
@Component({
  selector: 'app-federal',
  templateUrl: './federal.component.html',
  styleUrls: ['./federal.component.css']
})
export class FederalComponent {
  federalForm!: FormGroup;
  isTitleRequired:boolean = true;
  viewMode: any;
 
  constructor(private formBuilder: FormBuilder, private federalService: FederalService,private snackbar:MatSnackBar,private route: ActivatedRoute,private rateInfo :RateinfoComponent) {
    this.federalForm = this.formBuilder.group({
      indexNumber:[0, Validators.required],
      spread: [0, Validators.required],
      floor:  [0, Validators.required],
      fedaralFundsId:[0],
      rateId: [0],
     
    });

  }
  // ngOnInit(): void {
  //   this.isTitleRequired=true;
  // }
 
  
 
  addFederal(newFederal:Federal): void {
    if (this.federalForm.valid) {
      // const newFederal: Federal= {
      //   indexNumber: this.federalForm.value.indexNumber,
      //   floor: this.federalForm.value.floor,
      //   spread: this.federalForm.value.spread,
      //   rateId: this.federalForm.value.rateId,
     
      // };
 
      this.federalService.addFederal(newFederal).subscribe(
        (federal: Federal) => {
          console.log('Created Federalcomponent:', federal);
          console.log('Federal creation completed');
          this.snackbar.open('federal created successfully', 'Close', {
            duration: 3000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating federal:', error);
        }
      );
    }
  }

  updateFederal(federalId:number,updatedFederal:Federal): void {
    console.log("calling update method before valid form" + federalId)
   
      console.log("calling update method After valid form" + federalId)
      this.federalService.updateFederal(federalId,updatedFederal).subscribe(
        (federal: Federal) => {
          console.log('Created Federalcomponent:', federal);
          console.log('Federal creation completed');
          this.snackbar.open('federal created successfully', 'Close', {
            duration: 3000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating federal:', error);
        }
      );
  
  }


  fetchFederalComponentData(rateId:number){
    this.federalService.getFederalByRateId(rateId).subscribe((federalData:any)=>{
      console.log(federalData)
      if(federalData != null){
        this.federalForm = this.formBuilder.group({
          fedaralFundsId:federalData.fedaralFundsId,
          indexNumber:[federalData.indexNumber],
          spread: [federalData.spread],
          floor:  [federalData.floor],
          rateId: [federalData.rateId, Validators.required],
         
        });
      }
      else{
        this.rateInfo.checkboxes.forEach(checkbox => {
    if (checkbox.label === 'Federal Funds Component') {
      checkbox.checked = false;
    } 
  });
      }
      
      this.route.params.subscribe(params => {   
        this.viewMode= params['state']
        console.log(this.viewMode)
        if (this.viewMode == 'view') {
          this.federalForm.disable();
        } else {
          this.federalForm.enable();
        }
        
      });
  
    },(error)=>{
      console.log(error)
    
    })
    }

  getData() {
    return this.federalForm.value;
  }
 
 
 
 
}