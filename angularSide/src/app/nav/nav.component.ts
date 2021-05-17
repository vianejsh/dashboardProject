import { Component, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { DashboardConfig } from '../DashboardConfig';
import { DashboardWidget } from '../DashboardWidget';
import {ModalDirective} from 'angular-bootstrap-md';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import * as EventEmitter from 'events';
import { MatSidenav } from '@angular/material/sidenav';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


  @ViewChild(ModalDirective) modal: ModalDirective;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  @ViewChild('drawer') drawer : MatSidenav;
  @ViewChild('frame2') editModal : ModalDirective;
  selectedId: number = null;
  successMessage : string ='';
  warningMessage : string = '';
  opened : boolean = false;
  newDashboardConfig :DashboardConfig = new DashboardConfig();
  editDashboardConfig : DashboardConfig = new DashboardConfig()
  dashboardConfigs : DashboardConfig[] = [];
  dashboardMap : Map<number, any[]>;
  widgetLoc : any[] = [];
  menuItems = [];
  newDashboardWidget : DashboardWidget= new DashboardWidget();


  constructor(private breakpointObserver: BreakpointObserver, private router:Router, private dashboardService:DashboardService) {}


  addConfiguration(){
    this.dashboardService.createDashboard(this.newDashboardConfig).subscribe(data =>{
      this.successMessage = "Successfully added Dashboard Configuration";
      this.modal.hide();
      this.populateDashboardList();
    });

  }
  ngOnInit(){
    this.populateDashboardList();
  }

  populateDashboardList(){
    this.dashboardService.getDashboardList().subscribe(
      data => {
        this.dashboardConfigs = data;
        console.log(this.dashboardConfigs);
        this.menuItems = data;
        this.dashboardMap = new Map<number, any[]>();
        this.dashboardConfigs.forEach(element =>{
          // this.widgetLoc = element.widget;
          // this.widgetLoc.map(values => {
          //   console.log("this is the widgetLoc", values.name);
          // });
          this.dashboardMap.set(element.id, element.widget)
          console.log(element.widget);
        });
        console.log(this.dashboardMap);
      }
    )
  }

  navigateToDashboard(id : any){
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['nav/dashboard',id]);
    
  }


  editSelectedConfiguration(){
    if(this.selectedId && this.editDashboardConfig){
      this.dashboardService.updateDashboard(this.selectedId, this.editDashboardConfig).subscribe(data=>{
        console.log(data);
        this.successMessage = "Successfully edited Dashboard Configuration";
        this.populateDashboardList();
        this.drawer.toggle();
        this.editModal.hide();
        
      }, error =>{
        console.log(error)
        this.warningMessage = "Couldn't edit dashboard configuration."
      })
    }
  }
  

  openEditModal(id:number){
    this.selectedId = id;
    this.dashboardService.getDashboard(this.selectedId).subscribe(data=>{
      this.editDashboardConfig = data;
      this.editModal.show();
    })
  }

  onHideEditModal(){
    this.selectedId = null;
    this.editDashboardConfig = new DashboardConfig();
  }
  
}
