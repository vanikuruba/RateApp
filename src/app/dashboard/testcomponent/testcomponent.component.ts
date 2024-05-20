import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RateinfoService } from 'src/app/services/rateinfo.service';
import { UserService } from 'src/app/services/user.service';
// import { RateInfoDataI } from '../preparerdashboard/preparerdashboard.component';



export interface RateInfoDataI {
  // id: string;

  customerName: string;
  preparedBy: string;
  dateOfPrepared: Date;
  obligor: number;
  obligations:number;
  status:string;
}

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.css']
})
export class TestcomponentComponent {
  rateInfoData: any;
  displayedColumns: string[] = ['customerName', 'preparedBy', 'dateOfPrepared', 'obligor' ,'obligations','status', 'edit','delete','view'];
  dataSource!: MatTableDataSource<RateInfoDataI>;
  columns: String[] = [
    'Country',
    'Area',
    'Population_Rural',
    'Population_Total',
    'GDP_Total'
];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterItems: any;
  
  

  constructor(private userService:UserService,private rateInfoService:RateinfoService) {
  
   


  }
  
  checked() {
    return this.filterItems.filter((item: any) => {
      console.log(item.checked)
      return item.checked; });
  }
  
}

