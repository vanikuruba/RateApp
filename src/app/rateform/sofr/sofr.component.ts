import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SofrService } from 'src/app/services/sofr.service';
import { Sofr } from './sofrmodel.component';
import { ActivatedRoute } from '@angular/router';
import { RateinfoComponent } from '../rateinfo/rateinfo.component';
 
@Component({
  selector: 'app-sofr',
  templateUrl: './sofr.component.html',
  styleUrls: ['./sofr.component.css']
})
export class SofrComponent {
  sofrForm!: FormGroup;
  isTitleRequired:boolean = true;
  astrick:any= '<span  class="red-star">*</span>';
  viewMode: any;
 
 
 
  constructor(private formBuilder: FormBuilder, private sofrService: SofrService,private snackbar:MatSnackBar, private route: ActivatedRoute,private rateInfo :RateinfoComponent) {

    this.sofrForm = this.formBuilder.group({
      sofrId:[0],
      description: ['', Validators.required],
      indexNumber:['', Validators.required],
      spread: ['', Validators.required],
      floor:  ['', Validators.required],
      term: ['', Validators.required],
      isa: ['', Validators.required],
      rateId:[0],
    });
  }
 

 
  addSofr(newSofr: Sofr): void {
    if (this.sofrForm.valid) {
      // const newSofr: Sofr = {
      //   description: this.sofrForm.value.bankName,
      //   indexNumber: this.sofrForm.value.indexNumber,
      //   floor: this.sofrForm.value.floor,
      //   spread: this.sofrForm.value.spread,
      //   rateId: this.sofrForm.value.rateId,
      //   term:this.sofrForm.value.term,
      //   isa:this.sofrForm.value.isa
      // };
 
      this.sofrService.addSofr(newSofr).subscribe(
        (sofr: Sofr) => {
          console.log('Created sofrcomponent:', sofr);
          console.log('sofr creation completed');
          this.snackbar.open('sofr created successfully', 'Close', {
            duration: 3000,
          });
 
         
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating sofr:', error);
        }
      );
    }
  }


  updateSofr(sofrId:number,updatedSofr: Sofr): void {
    console.log(updatedSofr)
    console.log(this.sofrForm)
    console.log(this.sofrForm.valid)
    // if (this.sofrForm.valid) {
     
      this.sofrService.updateSofr(sofrId,updatedSofr).subscribe(
        (sofr: Sofr) => {
          console.log('Created sofrcomponent:', sofr);
          console.log('sofr creation completed');
          this.snackbar.open('sofr created successfully', 'Close', {
            duration: 3000,
          });
 
         
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating sofr:', error);
        }
      );
    // }
  }

  fetchSofrComponentData(rateId:number){
    this.sofrService.getSofrByRateId(rateId).subscribe((sofrData:any)=>{
      console.log(sofrData)
      if (sofrData != null) {
        this.sofrForm = this.formBuilder.group({
          sofrId:sofrData.sofrId,
          description: [sofrData?sofrData.description:''],
          indexNumber:[sofrData?sofrData.indexNumber:0, Validators.required],
          spread: [sofrData?sofrData.spread:0, Validators.required],
          floor:  [sofrData?sofrData.floor:0, Validators.required],
          rateId: [sofrData?sofrData.rateId:1, Validators.required],
          term: [sofrData?sofrData.term:0, Validators.required],
          isa: [sofrData?sofrData.isa:0, Validators.required]
        });
      }

      else{
        this.rateInfo.checkboxes.forEach(checkbox => {
          if (checkbox.label === 'SOFR Component') {
            checkbox.checked = false;
          } 
        });
        
        
      }
     
      
      this.route.params.subscribe(params => {   
        this.viewMode= params['state']
        console.log(this.viewMode)
        if (this.viewMode == 'view') {
          this.sofrForm.disable();
        } else {
          this.sofrForm.enable();
        }
        
      });
    },(error)=>{
      console.log(error)
    
    })
    }

  getData() {
    return this.sofrForm.value;
  } 

}
 