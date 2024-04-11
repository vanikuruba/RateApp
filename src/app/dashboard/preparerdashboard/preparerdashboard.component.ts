// import { Component } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';
import { RateinfoService } from 'src/app/services/rateinfo.service';


export interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  lanId: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-preparerdashboard',
  templateUrl: './preparerdashboard.component.html',
  styleUrls: ['./preparerdashboard.component.css']
})
export class PreparerdashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit' , 'edit'];
  dataSource: MatTableDataSource<UserData>;
  users:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(private userService:UserService,private rateinfoService:RateinfoService) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    
// userService.getPosts().subscribe((data)=>{
//   this.users =data
// console.log(data)
// this.dataSource = new MatTableDataSource(this.users);
// })
rateinfoService.getRates(2,0,"comments").subscribe((data: any)=>{
  this.users =data
console.log(data)

this.dataSource = new MatTableDataSource(this.users);
})
    // Assign the data to the data source for the table to render
    
    this.dataSource = new MatTableDataSource(this.users);


  }

  ngAfterViewInit() {
    console.log(this.dataSource)
    this.dataSource.paginator= this.paginator;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     fullName: name,
//     email: "hello",
//     role: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//     lanId:"7",
//   };
// }
