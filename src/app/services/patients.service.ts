import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PatientsService {
  // patientsData: Patient[] = [
  //   {firstName: 'Test', lastName: 'Hydrogen', lastIncome: '18/10/2021', lastSubject: 'Consultation Générale'},
  //   {firstName: 'Test', lastName: 'Helium', lastIncome: '18/10/2021', lastSubject: 'Consultation Générale'},
  //   {firstName: 'Test', lastName: 'Lithium', lastIncome: '18/10/2021', lastSubject: 'Consultation Générale'},
  //   {firstName: 'Test', lastName: 'Beryllium', lastIncome: '18/10/2021', lastSubject: 'Consultation Générale'},
  //   {firstName: 'Test', lastName: 'Boron', lastIncome: '18/10/2021', lastSubject: 'Consultation Générale'},
  // ];

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<any> {
    // return this.patientsData;
    return this.httpClient.get('http://localhost:3000/patients');
  }

  getPatient(id: string): Observable<any> {
    // return this.patientsData;
    return this.httpClient.get('http://localhost:3000/patients/' + id);
  }

  addPatient(data: Patient) {
    // this.patientsData.push(data);
    return this.httpClient.post('http://localhost:3000/patients', data);
  }

  updatePatient(id, patient: Patient): Observable<any> {
    return this.httpClient.put('http://localhost:3000/patients/' + id, patient);
  }

  deletePatient(id): Observable<any> {
    return this.httpClient.delete('http://localhost:3000/patients/' + id);
  }
}
