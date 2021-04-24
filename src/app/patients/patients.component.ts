import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})

export class PatientsComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'lastIncome',
    'lastSubject'
  ];
  patients: MatTableDataSource<Patient>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientsService: PatientsService, private router: Router) { 
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.patients.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patients.filter = filterValue.trim().toLowerCase();
  }
  
  refresh(): void {
    this.patientsService.getPatients().subscribe((res) => {
      this.patients = new MatTableDataSource(res);
    });
  }

  showPatient(id): void {
    this.router.navigate(['/patients', id]);
  }
}