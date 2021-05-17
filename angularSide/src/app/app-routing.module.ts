import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: '', redirectTo: 'nav', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path:'nav', component: NavComponent,
      children:[{path :'dashboard', 
                component: DashboardComponent
              },
              {
                path: 'dashboard/:id',
                component: DashboardComponent
              }
              ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
