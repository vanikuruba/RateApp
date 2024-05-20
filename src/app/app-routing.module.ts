import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreparerdashboardComponent } from './dashboard/preparerdashboard/preparerdashboard.component';
import { PrimeComponent } from './rateform/prime/prime.component';
import { SofrComponent } from './rateform/sofr/sofr.component';
import { LiborComponent } from './rateform/libor/libor.component';
import { FederalComponent } from './rateform/federal/federal.component';
import { CeilingComponent } from './rateform/ceiling/ceiling.component';
import { BsbyComponent } from './rateform/bsby/bsby.component';
import { SignupComponent } from './user/signup/signup.component';
import { RoleListComponent } from './role-list/role-list.component';
import { AllusersComponent } from './allusers/allusers.component';
// import { RoleassignmentComponent } from './roleassignment/roleassignment.component';
import { RateinfoComponent } from './rateform/rateinfo/rateinfo.component';

const routes: Routes = [ { path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: SignupComponent},
{path: 'rateinfo', component:RateinfoComponent},
{path: 'primeinfo', component:PrimeComponent},
{path: 'sofr', component:SofrComponent},
{path: 'libor',component:LiborComponent},
{path:'federal',component:FederalComponent},
{path: 'ceiling',component:CeilingComponent},
{path: 'bsby',component:BsbyComponent},
{path:'allroles',component:RoleListComponent},
{path:'allusers',component:AllusersComponent},
// {path:'roleassign',component:RoleassignmentComponent},
{ path: 'dashboard', component: PreparerdashboardComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
