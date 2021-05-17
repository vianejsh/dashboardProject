import * as Highcharts from "highcharts";
import { chart, Options } from "highcharts";
import { title } from "process";

export class ChartOptions{

  constructor(){}
    
  public pieChartOpt = {   
    chart : {
       plotBorderWidth: null,
       plotShadow: false
    },
    title : {
       text: 'Browser market shares at a specific website, 2014'   
    },
    tooltip : {
       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
       pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
             enabled: true,
             format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
             style: {
                color: 
                'black'
             }
          }
       }
    },
    series : [{
       type: 'pie',
       name: 'Browser share',
       data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
          {
             name: 'Chrome',
             y: 12.8,
             sliced: true,
             selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',      0.7]
       ]
    }]
 };

  public lineChartOpt = {   
    chart: {
       type: "spline"
    },
    title: {
       text: "Monthly Average Temperature"
    },
    subtitle: {
       text: "Source: WorldClimate.com"
    },
    xAxis:{
       categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {          
       title:{
          text:"Temperature °C"
       } 
    },
    tooltip: {
       valueSuffix:" °C"
    },
    series: [{
       name: 'Tokyo',
       data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
    },
    {
       name: 'New York',
       data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
    },
    {
       name: 'Berlin',
       data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    },
    {
       name: 'London',
       data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
 };

    
    public barChartOpt  = {   
      chart: {
         type: 'bar'
      },
      title: {
         text: 'Historic World Population by Region'
      },
      subtitle : {
         text: 'Source: Wikipedia.org'  
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 250,
         y: 100,
         floating: true,
         borderWidth: 1,
        
         backgroundColor: (
             
              '#FFFFFF'), shadow: true
         },
         xAxis:{
            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
            text: null
         } 
      },
      yAxis : {
         min: 0, title: {
            text: 'Population (millions)', align: 'high'
         },
         labels: {
            overflow: 'justify'
         }
      },
      tooltip : {
         valueSuffix: ' millions'
      },
      plotOptions : {
         bar: {
            dataLabels: {
               enabled: true
            }
         }
      },
      credits:{
         enabled: false
      },
      series: [
         {
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
         }, 
         {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
         }, 
         {
            name: 'Year 2008',
            data: [973, 914, 4054, 732, 34]      
         }
      ]
   };
      
    columnChartOpt = {   
      chart: {
         type: 'column'
      },
      title: {
         text: 'Monthly Average Rainfall'
      },
      subtitle:{
         text: 'Source: WorldClimate.com' 
      },
      xAxis:{
         categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
         'Aug','Sep','Oct','Nov','Dec'],
         crosshair: true        
      },     
      yAxis : {
         min: 0,
         title: {
            text: 'Rainfall (mm)'         
         }      
      },
      tooltip : {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: [{
         name: 'Tokyo',
         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6,
            148.5, 216.4, 194.1, 95.6, 54.4]
      }, 
      {
         name: 'New York',
         data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3,
            91.2, 83.5, 106.6, 92.3]
      }, 
      {
         name: 'London',
         data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6,
            52.4, 65.2, 59.3, 51.2]
      }, 
      {
         name: 'Berlin',
         data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4,
            47.6, 39.1, 46.8, 51.1]
      }]
   };

    public chartMap : Map<string, any> = new Map<string, any>([
        ["barChart", this.barChartOpt],
        ["pieChart", this.pieChartOpt],
        ["lineChart", this.lineChartOpt],
        ["columnChart", this.columnChartOpt]]
    );



}