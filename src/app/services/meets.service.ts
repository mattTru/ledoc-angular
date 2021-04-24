import { Injectable } from '@angular/core';
import { Meet } from '../models/meet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetsService {
  constructor(private httpClient: HttpClient) { }

  getMeets(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/meets');
  }
}
