import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterItemComponentInterface, GridType } from 'angular-gridster2';
import { DashboardService } from '../dashboard.service';
import { DashboardConfig } from '../DashboardConfig';
import {Chart} from 'angular-highcharts';
import { chart, Options } from 'highcharts';
import {ChartOptions} from '../resources/ChartOptions';
import * as Highcharts from 'highcharts';
import * as ChartJS from 'chart.js';

import {ModalDirective} from 'angular-bootstrap-md';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { DashboardWidget } from '../DashboardWidget';
import { MatSelectChange } from '@angular/material/select';
import { $ } from 'protractor';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  @ViewChild(ModalDirective) modalChild: ModalDirective;
  @ViewChild('frameModalTop') frameModal : ElementRef;

  @ViewChild('frameEdit') frameEditModal : ModalDirective;
  @ViewChild('frameModalEditTop') modalElementEdit : ElementRef;

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  // @ViewChild("dialog") dialog:MatDialog

  @Output() itemChanged: EventEmitter<GridsterItem> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private route : ActivatedRoute,
    private dashboardService:DashboardService, 
    private router:Router,
    private breakpointObserver: BreakpointObserver) {}


  widgetsArray : string[] =[];
  highChartBar = Highcharts;
  lineChartData : Chart;
  barChartData : ChartJS;
  newDashboardWidget : DashboardWidget = new DashboardWidget();
  warningMessage : string = '';
  chartOptions : ChartOptions = new ChartOptions();
  chartTypes : any = [
    {
      value : "pieChart" , viewValue: "Pie Chart" 
    },
    {
      value : "barChart" , viewValue: "Bar Chart"
    },
    {
      value : "lineChart", viewValue: "Line Chart"
    },
    {
      value : "columnChart", viewValue: "Column Chart"
    }
  ]

  options: GridsterConfig = {
    itemChangeCallback : this.itemChange.bind(this),
    gridType: GridType.Fixed,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
  };

  id : number;
  dashboardConfig : DashboardConfig;
  widgets : GridsterItem[] = [];
  widgetToEdit : DashboardWidget = new DashboardWidget();
  widgetIndexToEdit : number;
  gridsterItemToEdit : GridsterItem ; 

  showModalEdit(locDashboardWidget : DashboardWidget){
    
  }

  openEditModal(locDashboardWidget : any, i : number){
    // let locWidget = new DashboardWidget();
    // locWidget.name = locDashboardWidget.name;
    // locWidget.chartType  = locDashboardWidget.chartType;
    // locWidget.xCoord = locDashboardWidget.xCoord;
    // locWidget.yCoord = locDashboardWidget.yCoord;
    //locWidget = locDashboardWidget;

    this.gridsterItemToEdit = Object.assign(locDashboardWidget);
    this.widgetToEdit = Object.assign({},locDashboardWidget.element);    
    this.widgetIndexToEdit = i;
    //this.oldWidget = locDashboardWidget;
    let frameElement = document.getElementById('frameModalEditTop');
    if(frameElement.parentElement != document.body)
      document.body.append(frameElement);
    this.frameEditModal.show();

  }

  findWidgetByName(item : any) : boolean{
    let isFound = false;
    this.widgets.find((v)=>{
      isFound = (v.element.name === item.name);
    })

    return isFound;
  }

  hideEditModal(){
    this.frameEditModal.hide();
  }

  saveConfiguration(){
    this.widgets.forEach((value, index) =>{
      this.dashboardConfig.widget.splice(index,1,value.element);
    });
    this.dashboardService.updateDashboard(this.id,this.dashboardConfig).subscribe(
      data => console.log(data), error => console.log(error)
    );
  }

  editWidget(){
    
    if(this.findWidgetByName(this.widgetToEdit)){
      this.warningMessage = "Widget with that name already exists, please try another name."; 
    }
    else{
      this.gridsterItemToEdit.element.name = this.widgetToEdit.name;
      this.gridsterItemToEdit.element.chartType = this.widgetToEdit.chartType;
      this.dashboardConfig.widget.splice(this.widgetIndexToEdit,1,this.widgetToEdit);
      this.widgets.splice(this.widgetIndexToEdit, 1 , this.gridsterItemToEdit);
      this.dashboardService.updateDashboard(this.dashboardConfig.id,this.dashboardConfig)
        .subscribe(data => {
          console.log(data);
          this.widgetToEdit = new DashboardWidget();
          this.widgetIndexToEdit =null;
          this.gridsterItemToEdit = null;
          this.frameEditModal.hide()
        },
          error => console.log(error));
    }
  }

  itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {

    console.info('itemChanged', item, itemComponent);
    this.updateWidgetCoords(item);

  }


  updateWidgetCoords(item: any){
    let locElement = item;
    locElement.element.xCoord = item.x;
    locElement.element.yCoord = item.y;
    if(this.widgets){
      this.widgets.splice(this.widgets.indexOf(item),1,locElement);
    }
  }

  selectedValue(event: MatSelectChange) {
    this.newDashboardWidget.chartType = event.value;
    console.log("selected value is", event.value);
  }

  showModal(){
    let element = document.getElementById('frameModalTop');
    if(element.parentElement != document.body)
      document.body.append(element);
    this.modalChild.show();
  }
 
  hideAdditionModal(){
    this.modalChild.hide();
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    let index : number = this.widgets.indexOf(item);
    console.log("deleted item index ", index);
    this.widgets.splice(index, 1);
    this.dashboardConfig.widget.splice(index, 1);
    console.log(this.dashboardConfig.widget);
    this.dashboardService.updateDashboard(this.dashboardConfig.id,this.dashboardConfig)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  
  addItem(){
    if(this.findWidgetByName(this.newDashboardWidget)){
      this.warningMessage = "Widget with that name already exists, please try another name."; 
    }
    else{
      let localnewWidget = this.newDashboardWidget;
      this.dashboardConfig.widget.push(localnewWidget);
      this.dashboardService.updateDashboard(this.id,this.dashboardConfig).subscribe(data =>{
        this.widgets.push({
          localnewWidget,
          cols : 4,
          rows : 4,
          x : 0,
          y :0
        });
        this.widgetsArray.push(localnewWidget.chartType);
        this.reloadCurrentRoute();
        this.modalChild.hide();
      }, error=>{
        this.warningMessage = "there was an error. please try again";
      })
    }
    
  }

  chartReflow(){
    
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  ngOnInit(){
  }
  ngAfterViewInit(){


    this.id = this.route.snapshot.params["id"];

    this.dashboardService.getDashboard(this.id).subscribe(
      data=>{

        this.dashboardConfig = data;

        this.dashboardConfig.widget.forEach(element => {
          this.widgets.push({
            element,
            cols: 4,
            rows: 4,
            x : element.xCoord ? element.xCoord : 0,
            y : element.yCoord ? element.yCoord : 0,
            
          });
          this.widgetsArray.push(element.chartType);
          console.log("in nav comp");
          console.log(element.chartType);
          console.log(this.widgets);
        });

      }
    )
  }

  //lineChartOpt;
  getLineChartOptions(){
    return this.chartOptions.lineChartOpt;
  }

  //barChartOpt;
  getBarChartOptions(){
    return this.chartOptions.barChartOpt;
  }

  //pieChartOpt;
  getPieChartOptions(){
    return this.chartOptions.pieChartOpt
  }

  //columnChartopt;
  getColumnChartOptions(){
    return this.chartOptions.columnChartOpt;
  }
    
  
}
