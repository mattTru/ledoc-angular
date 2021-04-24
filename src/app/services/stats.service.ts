import { Injectable } from '@angular/core';
import { Stat } from '../models/stat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private httpClient: HttpClient) { }

  getStats(param): Observable<any> {
    return this.httpClient.get('http://localhost:3000/stats?period=' + param);
  }
}
