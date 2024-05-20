import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsbyService } from 'src/app/services/bsby.service';
import { Bsby } from './bsbymodel.component';
import { ActivatedRoute } from '@angular/router';
import { RateinfoComponent } from '../rateinfo/rateinfo.component';
 
@Component({
  selector: 'app-bsby',
  templateUrl: './bsby.component.html',
  styleUrls: ['./bsby.component.css']
})
export class BsbyComponent {
  bsbyForm!: FormGroup;
  isTitleRequired:boolean = true;
  viewMode: any;
 
 
 
  constructor(private formBuilder: FormBuilder, private bsbyService: BsbyService,private snackbar:MatSnackBar,private route: ActivatedRoute,private rateInfo :RateinfoComponent) {}
 
  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired = true;
   
  }
 
  initializeForm(): void {
    this.bsbyForm = this.formBuilder.group({
      bsbyId:[0],
      description: [''],
      indexNumber:[0, Validators.required],
      spread: [0, Validators.required],
      floor:  [0, Validators.required],
      rateId: [1, Validators.required],
      term: [0, Validators.required],
      isa: [0, Validators.required]
    });
  }
 
  // addLibor(): void {
  //   if (this.liborForm.valid) {
  //     const newLibor: Libor = {
  //       description: this.liborForm.value.bankName,
  //       indexNumber: this.liborForm.value.indexNumber,
  //       floor: this.liborForm.value.floor,
  //       spread: this.liborForm.value.spread,
  //       rateId: this.liborForm.value.rateId,
  //       term:this.liborForm.value.term,
  //       isa:this.liborForm.value.isa
  //     };
 
  //     this.liborService.addLibor(newLibor).subscribe(
  //       (libor: Libor) => {
  //         console.log('Created Liborcomponent:', libor);
  //         console.log('libor creation completed');
  //         this.snackbar.open('Libor created successfully', 'Close', {
  //           duration: 3000,
  //         });
 
         
  //         // Reset the form or perform further actions here
  //       },
  //       (error: any) => {
  //         console.error('Error creating libor:', error);
  //       }
  //     );
  //   }
  // }
  addBsby(newBsby:Bsby): void {
    if (this.bsbyForm.valid) {
 
      this.bsbyService.addBsby(newBsby).subscribe(
        (bsby: Bsby) => {
          console.log('Created Bsbycomponent:', bsby);
          console.log('bsby creation completed');
          // this.bsbyForm.reset();
          // this.snackbar.open('Bsby created successfully', 'Close', {
          //   duration: 3000,
          // });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating bsby:', error);
        }
      );
    }
  }

  updateBsby(rateId:any,newBsby:Bsby): void {
    
    // if (this.bsbyForm.valid) {

      this.bsbyService.updateBsby(rateId,newBsby).subscribe(
        (bsby: Bsby) => {
          console.log('Created Bsbycomponent:', bsby);
          console.log('bsby creation completed');
          // this.bsbyForm.reset();
          // this.snackbar.open('Bsby created successfully', 'Close', {
          //   duration: 3000,
          // });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating bsby:', error);
        }
      );
    // }
  }

  fetchBsbyComponentData(rateId:number){
    this.bsbyService.getBsbyByRateId(rateId).subscribe((bsbyData:any)=>{
      console.log(bsbyData)
      if (bsbyData != null) {
        this.bsbyForm = this.formBuilder.group({
          bsbyId:bsbyData.bsbyId,
          description: [bsbyData?bsbyData.description:''],
          indexNumber:[bsbyData?bsbyData.indexNumber:0, Validators.required],
          spread: [bsbyData?bsbyData.spread:0, Validators.required],
          floor:  [bsbyData?bsbyData.floor:0, Validators.required],
          rateId: [bsbyData?bsbyData.rateId:1, Validators.required],
          term: [bsbyData?bsbyData.term:0, Validators.required],
          isa: [bsbyData?bsbyData.isa:0, Validators.required]
        });
      }

      else{
        this.rateInfo.checkboxes.forEach(checkbox => {
          if (checkbox.label === 'BSBY Component') {
            checkbox.checked = false;
          } 
        });
        
        
      }
      


      this.route.params.subscribe(params => {   
        this.viewMode= params['state']
        console.log(this.viewMode)
        if (this.viewMode == 'view') {
          this.bsbyForm.disable();
        } else {
          this.bsbyForm.enable();
        }
        
      });
    },(error)=>{
      console.log(error)
    
    })
    }


    


  getData() {
    return this.bsbyForm.value;
  }
 
}
 