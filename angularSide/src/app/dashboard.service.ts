import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8080/api/dashboards';

  
  constructor(private http: HttpClient) { }




  getDashboard(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDashboard(dashboard: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, dashboard);
  }

  updateDashboard(id: number, dashboard: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, dashboard);
  }

  deleteDashboard(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDashboardList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
