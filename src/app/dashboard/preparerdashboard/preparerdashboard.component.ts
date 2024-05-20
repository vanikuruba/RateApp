// import { Component } from '@angular/core';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';
import { RateinfoService } from 'src/app/services/rateinfo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parseISO, format } from 'date-fns';
import { RateinfoComponent } from 'src/app/rateform/rateinfo/rateinfo.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


// export interface RateInfoDataI {
//   // id: string;

//   customerName: string;
//   preparedBy: string;
//   dateOfPrepared: Date;
//   obligor: number;
//   obligations:number;
//   status:string;
// }

interface RateinfoComponentFilters {
  PrimeComponent: any; // Adjust the type as per your actual property type
  FederalFundsComponent: any; // Adjust the type as per your actual property type
  // Add other properties as needed
}


@Component({
  selector: 'app-preparerdashboard',
  templateUrl: './preparerdashboard.component.html',
  styleUrls: ['./preparerdashboard.component.css']
})
export class PreparerdashboardComponent implements OnInit  {
 


  displayedColumns: string[] = ['customerName', 'preparedBy', 'dateOfPrepared', 'obligor' ,'obligations','status', 'edit','delete','view'];
  dataSource!: MatTableDataSource<RateinfoComponent>;
  rateInfoData:any;
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ;

  checkboxes = [
    { id: 'Prime', label: 'Prime Component', checked: false },
    { id: 'Federal Funds', label: 'Federal Funds Component', checked: false },
    { id: 'LIBOR', label: 'LIBOR Comoponent', checked: false },
    { id: 'BSBY', label: 'BSBY Component', checked: false },
    { id: 'SOFR', label: 'SOFR Component', checked: false },
    { id: 'rateIncludesOverallCeiling', label: 'Rate Includes Overall Floor Or Ceiling', checked: false }
];

  status: string[] = ["created", "return for correction", "approved", "rejected","new rate"];
  selectedComponents: string[] = [];
  inputFilter: any;
  userInfo:any;
  sharedFilter: string = '';


  constructor(private userService:UserService,private rateInfoService:RateinfoService,private snackbar:MatSnackBar,private http: HttpClient,public router: Router) 
  {
    this.selectedComponents = [];
  this.getAllRateInfoRoles();
    //  this.userInfo = this.userService.getUserInfo();
  const userInfoString = localStorage.getItem('userData');
  this.userInfo = userInfoString ? JSON.parse(userInfoString) : null;
   console.log(this.userInfo)
  }



  @ViewChild(MatPaginator) paginator1!: MatPaginator;

  ngOnInit(): void {

    const userInfoString = localStorage.getItem('userData');
    this.userInfo = userInfoString ? JSON.parse(userInfoString) : null;
   
    

  }

  getAllRateInfoRoles(){
    this.rateInfoService.getPosts().subscribe((data: any)=>{
      this.rateInfoData =data
    console.log(data)
    this.dataSource = new MatTableDataSource<RateinfoComponent>(this.rateInfoData);
    this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    // this.dataSource = new MatTableDataSource(this.rateInfoData);
    })

  }

  // applyFilter(event: any) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // onChangeStatus(event: any) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.inputFilter = filterValue;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }




  
  // FilterRateInfoByComponent(){
  
   
  //   this.dataSource.filterPredicate = (data: any, filter: string) => {
  //       const selectedComponents: string[] = JSON.parse(this.toCamelCase(filter));
  //       return selectedComponents.every(component => data[component] != null);
  //   };
  //   this.dataSource.filter = JSON.stringify(this.selectedComponents);
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
   
  //  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateFilter(filterValue);
  }
  
  onChangeStatus(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateFilter(filterValue);
  }
  
  FilterRateInfoByComponent() {
    const selectedComponents: string[] = JSON.parse(this.toCamelCase(this.sharedFilter));
  
    this.dataSource.filterPredicate = (data: any) => {
      return selectedComponents.every(component => data[component] != null);
    };
  
    this.dataSource.filter = this.sharedFilter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  private updateFilter(filterValue: string) {
    this.sharedFilter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.sharedFilter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  deleteRateInfo(rateId:number){
    this.rateInfoService.deleteRateInfo(rateId).subscribe((data)=>{
      console.log(data)
      this.snackbar.open('Request deleted successfully', 'Close', {
        duration: 3000,
      });
        
    },(error)=>{
      console.log(error)
    })
  
  }


  toggleCheckbox(checkbox: { id: string, label: string, checked: boolean }) {
    checkbox.checked = !checkbox.checked;
    

   const index = this.selectedComponents.indexOf(checkbox.label);

    if (checkbox.checked && index === -1) {
        this.selectedComponents.push(checkbox.label);
      
    } else if (!checkbox.checked && index !== -1) {
        this.selectedComponents.splice(index, 1);
    }

     this.inputFilter = this.selectedComponents ;
    this.FilterRateInfoByComponent();
    // console.log(checkbox.label + " " +  checkbox.checked)
}

toCamelCase(input: string): string {
  return input
      .split(' ') // Split the input string by spaces
      .map((word, index) => {
          // Convert the first word to lowercase
          if (index === 0) {
              return word.toLowerCase();
          }
          // Convert subsequent words to lowercase with first letter uppercase
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(''); // Join the words back together without spaces
}











  
}













