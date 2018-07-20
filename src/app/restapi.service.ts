import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { JsonResponse } from './jsonresponse';
import { ApplicationProperties } from './application-properties';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private urlGetStats = ApplicationProperties.serverUrl + '/' + ApplicationProperties.serverApplicationContext + '/fe/stats';
  private urlPostTopologyData = ApplicationProperties.serverUrl + '/' + ApplicationProperties.serverApplicationContext 
                                + '/fe/topology-data';
    private urlPostPcapFile = ApplicationProperties.serverUrl + '/' + ApplicationProperties.serverApplicationContext 
                                + '/fe/pcap-file';
  
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
    
  postPcapFile(pcapFile: File): Observable<JsonResponse> {
      console.log('uploading pcap file');
      let formData = new FormData();
      formData.append('file', pcapFile);
      return this.http.post<JsonResponse>(this.urlPostPcapFile, formData);
  }
  
  deleteTopologyData(): Observable<JsonResponse> {
    console.log('deleting topology data');
    return this.http.delete<JsonResponse>(this.urlPostTopologyData);
  }
  
  exportTopologyData(): Observable<any> {
    return this.http.get(this.urlPostTopologyData);
  }
}
