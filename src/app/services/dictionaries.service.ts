import { Injectable } from '@angular/core';
import { Dictionary } from '../models/dictionary';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {

  constructor(private httpClient: HttpClient) { }

  getBloodGroups(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/bloodgroups');
  }

  getDrugs(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/drugs');
  }

  getRepeats(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/repeats');
  }

  getPeriods(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/dictionaries/periods');
  }
}
