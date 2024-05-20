import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiborService } from 'src/app/services/libor.service';
import { Libor } from './libormodel.component';
import { ActivatedRoute } from '@angular/router';
import { RateinfoComponent } from '../rateinfo/rateinfo.component';
 
@Component({
  selector: 'app-libor',
  templateUrl: './libor.component.html',
  styleUrls: ['./libor.component.css']
})
export class LiborComponent {
  liborForm!: FormGroup;
  isTitleRequired:boolean = true;
  viewMode: any;
 
 
 
  constructor(private formBuilder: FormBuilder, private liborService: LiborService,private snackbar:MatSnackBar,private route: ActivatedRoute,private rateInfo :RateinfoComponent) {
    this.liborForm = this.formBuilder.group({
      liborId:[0],
      description: [''],
      indexNumber:[0, Validators.required],
      spread: [0, Validators.required],
      floor:  [0, Validators.required],
      rateId: [0],
      term: [0, Validators.required],
      isa: [0, Validators.required]
    });
  }
 
  
  
  addLibor(newLibor:Libor): void {
    if (this.liborForm.valid) {
      // const newLibor: Libor = {
      //   description: this.liborForm.value.description, // Corrected assignment
      //   indexNumber: this.liborForm.value.indexNumber,
      //   floor: this.liborForm.value.floor,
      //   spread: this.liborForm.value.spread,
      //   rateId: this.liborForm.value.rateId,
      //   term: this.liborForm.value.term,
      //   isa: this.liborForm.value.isa
      // };
 
      this.liborService.addLibor(newLibor).subscribe(
        (libor: Libor) => {
          console.log('Created Liborcomponent:', libor);
          console.log('Libor creation completed');
          this.snackbar.open('Libor created successfully', 'Close', {
            duration: 3000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating libor:', error);
        }
      );
    }
  }

  updateLibor(liborId:number,updatedLibor:Libor): void {
    // if (this.liborForm.valid) {
      this.liborService.updateLibor(liborId,updatedLibor).subscribe(
        (libor: Libor) => {
          console.log('Created Liborcomponent:', libor);
          console.log('Libor creation completed');
          this.snackbar.open('Libor created successfully', 'Close', {
            duration: 3000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating libor:', error);
        }
      );
    // }
  }

  fetchLiborComponentData(rateId:number){
    this.liborService.getLiborByRateId(rateId).subscribe((liborData:any)=>{
      console.log(liborData)
      if (liborData != null) {
        this.liborForm = this.formBuilder.group({
          liborId:liborData.liborId,
          description: [liborData?liborData.description:''],
          indexNumber:[liborData?liborData.indexNumber:0, Validators.required],
          spread: [liborData?liborData.spread:0, Validators.required],
          floor:  [liborData?liborData.floor:0, Validators.required],
          rateId: [liborData?liborData.rateId:1, Validators.required],
          term: [liborData?liborData.term:0, Validators.required],
          isa: [liborData?liborData.isa:0, Validators.required]
        });
      }

      else{
        this.rateInfo.checkboxes.forEach(checkbox => {
    if (checkbox.label === 'LIBOR Comoponent') {
      checkbox.checked = false;
    } 
  });
      }
      // else{
      //   this.rateInfo.checkboxes.forEach(checkbox => {
      //     checkbox.label === 'LIBOR Component'?checkbox.checked = false:checkbox.checked = true; 
      //   });
      // }
      
       
      this.route.params.subscribe(params => {   
        this.viewMode= params['state']
        console.log(this.viewMode)
        if (this.viewMode == 'view') {
          this.liborForm.disable();
        } else {
          this.liborForm.enable();
        }
        
      });
      return liborData;
    },(error)=>{
      console.log(error)
      return null;
    
    })
    }

  getData() {
    return this.liborForm.value;
  } 
 
}