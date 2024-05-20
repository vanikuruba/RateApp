import { Component, Injectable } from '@angular/core';
import { Prime } from '../prime/primemodel.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrimeService } from 'src/app/services/prime.service';
import { ViewChild } from '@angular/core';
import { RateinfoService } from 'src/app/services/rateinfo.service';
import { PrimeComponent } from '../prime/prime.component';
import { FederalComponent } from '../federal/federal.component';
import { Federal } from '../federal/federalmodel.component';
import { LiborComponent } from '../libor/libor.component';
import { BsbyComponent } from '../bsby/bsby.component';
import { SofrComponent } from '../sofr/sofr.component';
import { CeilingComponent } from '../ceiling/ceiling.component';
import { Libor } from '../libor/libormodel.component';
import { Bsby } from '../bsby/bsbymodel.component';
import { Ceiling } from '../ceiling/ceilingmodel.component';
import { Sofr } from '../sofr/sofrmodel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { parseISO, format, formatDate } from 'date-fns';




// @Injectable({
//   providedIn:'root'
// })
@Component({
  selector: 'app-rateinfo',
  templateUrl: './rateinfo.component.html',
  styleUrls: ['./rateinfo.component.css']
})
export class RateinfoComponent {
  @ViewChild(PrimeComponent) primeComponent!: PrimeComponent;
  @ViewChild(FederalComponent) federalComponent!: FederalComponent;
  @ViewChild(LiborComponent) liborComponent!: LiborComponent;
  @ViewChild(BsbyComponent) bsbyComponent!: BsbyComponent;
  @ViewChild(SofrComponent) sofrComponent!: SofrComponent;
  @ViewChild(CeilingComponent) ceilingComponent!: CeilingComponent;
  rateInfoForm!: FormGroup;
  hideRateIdField: boolean = false;
  isTitleRequired:boolean = true;
  isInputDisabled: boolean = true;
  selectedFiles : any[] = [];
  checkboxes = [
    { id: 'Prime', label: 'Prime Component', checked: false },
    { id: 'Federal Funds', label: 'Federal Funds Component', checked: false },
    { id: 'LIBOR', label: 'LIBOR Comoponent', checked: false },
    { id: 'BSBY', label: 'BSBY Component', checked: false },
    { id: 'SOFR', label: 'SOFR Component', checked: false },
    { id: 'rateIncludesOverallCeiling', label: 'Rate Includes Overall Floor Or Ceiling', checked: false }
];
  errorMsg!: string;
  newRateInfo: any;
  existedRateInfo:any;
  primeData!: Prime;
  federalData!:Federal;
  liborData!: Libor;
  bsbyData!:Bsby;
  sofrData!: Sofr;
  ceilingData!:Ceiling;
  rateId: any;
  isRateInfoEditing:boolean=false;
  viewMode:any;
  dateOfPreparedDefaultValue: string | null | undefined;
  userInfo:any;
  
 
  constructor(private formBuilder: FormBuilder, 
    // private primecomponent: PrimeComponent,
    private rateInfoService:RateinfoService, 
    private snackbar:MatSnackBar,
    private router :Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe

  ) {}





  
 
  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired = true;
    this.checkboxes;
    this.isRateInfoEditing=false;
   
  this.dateOfPreparedDefaultValue = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  console.log(this.dateOfPreparedDefaultValue)
    this.route.params.subscribe(params => {
      this.rateId =  parseInt(params['rateId'])
      this.viewMode= params['state']
      if (this.rateId) {
        this.fetchRateInfo(this.rateId);
      }
      
       
      // console.log(typeof this.rateId)
      
      // console.log(this.viewMode)

      
    });


      const userInfoString = localStorage.getItem('userData');
      this.userInfo = userInfoString ? JSON.parse(userInfoString) : null;
     
      
  
    


  }
 
  initializeForm(): void {
    this.rateInfoForm = this.formBuilder.group({
      preparedBy: ['', Validators.required],
      dateOfPrepared:['', Validators.required],
      customerName: ['', Validators.required],
      obligor:  ['', Validators.required],
      obligations: ['', Validators.required],
      nextBillDate: ['', Validators.required],
      leadDays:['', Validators.required],
      status: ['creating', Validators.required],
      // attachments: [null, Validators.required],
      effectiveDate:['', Validators.required],
      assignedApprover:['vani', Validators.required],
      assignedAnalyst:['ajitha', Validators.required],
      agreementType:['', Validators.required],
      nameOfNewBaseRate:['', Validators.required],
      assignedIndexNumber:[''],
      comments:['', Validators.required],
      
    });
    
    // this.isTitleRequired = this.primeForm.value.bankName.hasValidator(Validators.required);
  }
 
  onFileSelected(event: any) {
    console.log("selected files show here")
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
    console.log(this.selectedFiles)
    console.log(this.selectedFiles.length)
  }
 
  
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    console.log(this.selectedFiles.length)

   
  }
  
  // working method
  createRateInfo(): void {
    console.log("Create Info method Called");
    console.log(this.rateInfoForm.get('preparedBy')?.invalid)
     if (this.rateInfoForm.valid) {
      console.log("Create Info method Called123....");
      this.newRateInfo= {
      preparedBy:this.rateInfoForm.value.preparedBy,
      dateOfPrepared:this.rateInfoForm.value.dateOfPrepared,
      customerName:this.rateInfoForm.value.customerName,
      obligor:  this.rateInfoForm.value.obligor,
      obligation: this.rateInfoForm.value.obligations,
      nextIntrestBillDueDate: this.rateInfoForm.value.nextBillDate,
      leadDays:this.rateInfoForm.value.leadDays,
      status: this.rateInfoForm.value.status,
      comments:this.rateInfoForm.value.comments,
      assignedIndexNumber:this.rateInfoForm.value.assignedIndexNumber,
      nameOfNewBaseRate:this.rateInfoForm.value.nameOfNewBaseRate,
      agreementType:this.rateInfoForm.value.agreementType,
      effectiveDateOfNoteOrAgreement:this.rateInfoForm.value.effectiveDate,
      assignedApprover:'',
      assignedAnalyst:'',
      // userId:this.userInfo.userId,
      // attachments: this.selectedFiles,

      };
      const post =  this.newRateInfo;
      const userId = this.userInfo.userId;
      console.log(post);
      const formData = new FormData();
      // console.log(JSON.stringify(post));
      formData.append('rate',JSON.stringify(post));
      // console.log(formData);
      formData.append('userId', userId.toString());
      // // formData.append('userId', this.userInfo?.userId.toString());
      if (this.selectedFiles.length === 0) {
        this.errorMsg = 'Please select atleast one file'
      } else {
       
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('attachments', this.selectedFiles[i]);
      }
    }
   
    // this.rateInfoService.createRateInfo(this.newRateInfo).subscribe(
    //     (newRateInfo) => {
    //       console.log('Created primecomponent:', newRateInfo);
    //       console.log('prime creation completed');
    //       this.snackbar.open('Prime created successfully', 'Close', {
    //         duration: 3000,
    //       });
 
         
    //       // Reset the form or perform further actions here
    //     },
    //     (error: any) => {
    //       console.error('Error creating rateInfo:', error);
    //     }
    //   );

      // creating image with rate
      this.rateInfoService.createRateInfoWithAttachments(formData).subscribe(
        (newRateInfo:any) => {
          console.log('Created primecomponent:', newRateInfo.rateId);
          
          // this.primeComponent.getData().rateId=newRateInfo.rateId;
          // this.federalComponent.getData().rateId=newRateInfo.rateId;
          this.snackbar.open('Your Request  is Creating Please wait....', 'Close', {
            duration: 3000,
          });
          this.rateInfoForm.reset();
          this.router.navigate(['/dashboard'])

          const checkboxes = this.checkboxes.filter(checkbox => checkbox.checked);
          checkboxes.forEach(checkbox => {
            switch (checkbox.label) {
              case 'Prime Component':
                this.primeComponent.getData().rateId = newRateInfo.rateId;
                console.log(this.primeComponent.getData());
                this.primeComponent.addPrime(this.primeComponent.getData());
                break;
              case 'Federal Funds Component':
                this.federalComponent.getData().rateId = newRateInfo.rateId;
                this.federalComponent.addFederal(this.federalComponent.getData());
                break;
                case 'LIBOR Comoponent':
                this.liborComponent.getData().rateId = newRateInfo.rateId;
                this.liborComponent.addLibor(this.liborComponent.getData());
                break;
              case 'BSBY Component':
                this.bsbyComponent.getData().rateId = newRateInfo.rateId;
                this.bsbyComponent.addBsby(this.bsbyComponent.getData());
                break;
                case 'SOFR Component':
                this.sofrComponent.getData().rateId = newRateInfo.rateId;
                console.log(this.sofrComponent.getData())
                this.sofrComponent.addSofr(this.sofrComponent.getData());
                break;
              case 'Rate Includes Overall Floor Or Ceiling':
                this.ceilingComponent.getData().rateId = newRateInfo.rateId;
                this.ceilingComponent.addCeiling(this.ceilingComponent.getData());
                break;
              // Add cases for other checkboxes as needed
            }
          });

          this.checkboxes.forEach(checkbox => checkbox.checked = false);

          this.snackbar.open('Request created successfully', 'Close', {
            duration: 3000,
          });
            
         

        },
        (error: any) => {
          console.error('Error creating rateInfo:', error);
        }
      );
    }
  }

  updateRateInfo(rateId:number): void {
    console.log("Update Info method Called");
    console.log(rateId)
    console.log(this.rateInfoForm)
     if (this.rateInfoForm.valid) {
      console.log("Update Info method Called123....");
      this.newRateInfo= {
      rateId:rateId,
      preparedBy:this.rateInfoForm.value.preparedBy,
      dateOfPrepared:this.rateInfoForm.value.dateOfPrepared,
      customerName:this.rateInfoForm.value.customerName,
      obligor:  this.rateInfoForm.value.obligor,
      obligation: this.rateInfoForm.value.obligations,
      nextIntrestBillDueDate: this.rateInfoForm.value.nextBillDate,
      leadDays:this.rateInfoForm.value.leadDays,
      status: this.rateInfoForm.value.status,
      comments:this.rateInfoForm.value.comments,
      assignedIndexNumber:this.rateInfoForm.value.assignedIndexNumber,
      nameOfNewBaseRate:this.rateInfoForm.value.nameOfNewBaseRate,
      agreementType:this.rateInfoForm.value.agreementType,
      effectiveDateOfNoteOrAgreement:this.rateInfoForm.value.effectiveDate,
      assignedApprover:'updated',
      assignedAnalyst:'updated',
      // userId:1,
      //  attachments: this.rateInfoForm.value.attachments,

      };
      const post =  this.newRateInfo;
      const userId = this.userInfo.userId;
      console.log(post);
      const formData = new FormData();
      // console.log(JSON.stringify(post));
      formData.append('rate',JSON.stringify(post));
      // console.log(formData);
      formData.append('userId', userId.toString());
      // // formData.append('userId', this.userInfo?.userId.toString());
      if (this.selectedFiles.length === 0) {
        this.errorMsg = 'Please select atleast one file'
      } else {
       
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('attachments', this.selectedFiles[i]);
      }
    }
   
    // this.rateInfoService.createRateInfo(this.newRateInfo).subscribe(
    //     (newRateInfo) => {
    //       console.log('Created primecomponent:', newRateInfo);
    //       console.log('prime creation completed');
    //       this.snackbar.open('Prime created successfully', 'Close', {
    //         duration: 3000,
    //       });
 
         
    //       // Reset the form or perform further actions here
    //     },
    //     (error: any) => {
    //       console.error('Error creating rateInfo:', error);
    //     }
    //   );

      // creating image with rate
      this.rateInfoService.updateRateInfo(rateId,formData,userId).subscribe(
        (newRateInfo:any) => {
          console.log('Updated RateIfo:', newRateInfo);
          
          // this.primeComponent.getData().rateId=newRateInfo.rateId;
          // this.federalComponent.getData().rateId=newRateInfo.rateId;
          this.snackbar.open('Your Request  is Creating Please wait....', 'Close', {
            duration: 3000,
          });
          this.rateInfoForm.reset();

          const checkboxes = this.checkboxes.filter(checkbox => checkbox.checked);
          checkboxes.forEach(checkbox => {
            switch (checkbox.label) {
              case 'Prime Component':
                this.primeComponent.getData().rateId = rateId;
                console.log(this.primeComponent.getData().rateId)
                console.log(this.primeComponent.getData());
                this.primeComponent.updatePrime(this.primeComponent.getData().primeId,this.primeComponent.getData());
                break;
              case 'Federal Funds Component':
                this.federalComponent.getData().rateId = rateId;
                console.log(this.federalComponent.getData())
                console.log(this.federalComponent.getData().fedaralFundsId)
                this.federalComponent.updateFederal(this.federalComponent.getData().fedaralFundsId,this.federalComponent.getData());
                break;
                case 'LIBOR Comoponent':
                this.liborComponent.getData().rateId = rateId;
                this.liborComponent.updateLibor(this.liborComponent.getData().liborId,this.liborComponent.getData());
                break;
              case 'BSBY Component':
                this.bsbyComponent.getData().rateId = rateId;
                this.bsbyComponent.updateBsby(this.bsbyComponent.getData().bsbyId,this.bsbyComponent.getData());
                break;
                case 'SOFR Component':
                this.sofrComponent.getData().rateId = rateId;
                console.log(this.sofrComponent.getData().sofrId)
                console.log(this.sofrComponent.getData())
                this.sofrComponent.updateSofr(this.sofrComponent.getData().sofrId,this.sofrComponent.getData());
                break;
              case 'Rate Includes Overall Floor Or Ceiling':
                this.ceilingComponent.getData().rateId = rateId;
                this.ceilingComponent.updateCeiling(this.ceilingComponent.getData().ceilingId,this.ceilingComponent.getData());
                break;
              // Add cases for other checkboxes as needed
            }
          });

          this.checkboxes.forEach(checkbox => checkbox.checked = false);

          this.snackbar.open('Request updated successfully', 'Close', {
            duration: 3000,
          });
            
         

        },
        (error: any) => {
          console.error('Error creating rateInfo:', error);
        }
      );
    }
  }

  transformDate(dateString: string): string {
    if (!dateString) {
      return '';
    }
  
    const dateParts = dateString.split(' ');
    if (dateParts.length !== 3) {
      return ''; // Return empty string if date string is not in expected format
    }
  
    const year = dateParts[2];
    const month = dateParts[1].padStart(2, '0');
    const day = dateParts[0].padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  

fetchRateInfo(rateId:number){
  this.isRateInfoEditing=true;
  if (this.isRateInfoEditing) {
    console.log(this.isRateInfoEditing)
    this.checkboxes.forEach(checkbox => checkbox.checked = true);
  }
console.log(rateId);
this.rateInfoService.getRateById(rateId).subscribe(
  
  (rateData:any)=>{
  console.log(rateData);
  this.existedRateInfo = rateData
  this.rateInfoForm = this.formBuilder.group({
    preparedBy: [rateData? rateData.preparedBy:'', Validators.required],
    // dateOfPrepared:[ formatDate(rateData? rateData.dateOfPrepared)],
    dateOfPrepared:[this.transformDate(rateData.dateOfPrepared ), Validators.required],
    customerName: [rateData? rateData.customerName:'', Validators.required],
    obligor:  [rateData? rateData.obligor:'', Validators.required],
    obligations: [rateData? rateData.obligation:'', Validators.required],
    nextBillDate: [rateData? rateData.nextIntrestBillDueDate:'', Validators.required],
    leadDays:[rateData? rateData.leadDays:'', Validators.required],
    status: [rateData? rateData.status:'creating', Validators.required],
    attachments: [rateData? rateData.attachments:null, Validators.required],
    effectiveDate:[rateData? rateData.effectiveDateOfNoteOrAgreement:'', Validators.required],
    assignedApprover:[rateData? rateData.assignedApprover:'', Validators.required],
    assignedAnalyst:[rateData? rateData.assignedAnalyst:'', Validators.required],
    agreementType:[rateData? rateData.agreementType:'', Validators.required],
    nameOfNewBaseRate:[rateData? rateData.nameOfNewBaseRate:'', Validators.required],
    assignedIndexNumber:[rateData? rateData.assignedIndexNumber:''],
    comments:[rateData? rateData.comments:'', Validators.required],
    
  });
 

  
    if (this.viewMode == 'view') {
      this.rateInfoForm.disable();
    } else {
      this.rateInfoForm.enable();
    }
    
    
  this.primeComponent.fetchPrimeComponentData(rateId);
  this.bsbyComponent.fetchBsbyComponentData(rateId);
  this.sofrComponent.fetchSofrComponentData(rateId);
  console.log("hello vali libor componnet ");
  this.liborComponent.fetchLiborComponentData(rateId);
  this.ceilingComponent.fetchCeilingComponentData(rateId);
  this.federalComponent.fetchFederalComponentData(rateId);
},
(error)=>{
console.log("error while fetching data." + error)
})
  
}





  toggleCheckbox(checkbox: { id: string, label: string, checked: boolean }) {
    checkbox.checked = !checkbox.checked;
    console.log(checkbox.label + " " +  checkbox.checked)
}









}
