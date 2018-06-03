import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { JsonResponse } from './jsonresponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private urlGetStats = 'http://localhost:8095/ENINetworkSimulator/fe/stats';
  private urlPostTopologyData = 'http://localhost:8095/ENINetworkSimulator/fe/topology-data';
  
  constructor(private http: HttpClient) {
    console.log('starting restapi service');
  }

  getStats(): Observable<{}> {
    console.log('getting stats');
    return this.http.get(this.urlGetStats);
  }
  
  postTopologyData(topologyData): Observable<JsonResponse> {
    console.log('posting topology data');
    return this.http.post<JsonResponse>(this.urlPostTopologyData, topologyData);
  }
  
  deleteTopologyData(): Observable<JsonResponse> {
    console.log('deleting topology data');
    return this.http.delete<JsonResponse>(this.urlPostTopologyData);
  }
}
