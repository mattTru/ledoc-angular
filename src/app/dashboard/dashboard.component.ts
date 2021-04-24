import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { Stat } from '../models/stat';
import { Meet } from '../models/meet';
import { PatientsService } from '../services/patients.service';
import { StatsService } from '../services/stats.service';
import { MeetsService } from '../services/meets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patients: Patient[] = [];
  @Input() stats: Stat;
  meets: Meet[] = [];
  displayedColumns: string[] = ['lastName', 'firstName', 'lastIncome', 'lastSubject'];
  listMeetsToday: Meet[] = [];
  param: string = 'day';

  constructor(private patientsService: PatientsService, private router: Router, private statsService: StatsService, private meetsService: MeetsService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getMeets();
    this.getStats(this.param);
  }

  getPatients() {
    // this.patients = this.patientsService.getPatients();
    this.patientsService.getPatients().subscribe(response => {
      this.patients = response.reverse().slice(0, 4);
    })
  }

  getStats(param) {
    this.statsService.getStats(param).subscribe(response => {
      this.stats = response;
    });
    switch(param) {
      case 'day':
        document.getElementById('stats-day').classList.add("active");
        document.getElementById('stats-week').classList.remove("active");
        document.getElementById('stats-month').classList.remove("active");
      break;
      case 'week':
        document.getElementById('stats-day').classList.remove("active");
        document.getElementById('stats-week').classList.add("active");
        document.getElementById('stats-month').classList.remove("active");
      break;
      case 'month':
        document.getElementById('stats-day').classList.remove("active");
        document.getElementById('stats-week').classList.remove("active");
        document.getElementById('stats-month').classList.add("active");
      break;
    }
  }

  getMeets() {
    // date du jour
    var date = new Date();
    var dateToday = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
    // on initialise la variable qui va contenir les rendez-vous
    var listMeetsToday = [];
    // traitement pour chaque objet du tableau des rendez-vous
    this.meetsService.getMeets().subscribe(response => {
      this.meets = response;
      this.meets.map(obj => {
        // date du rendez-vous
        const date = new Date(obj.date);
        var dateMeet = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
        // si la date correspond bien à la date du jour, alors on l'ajoute dans le tableau des rendez-vous
        if (dateToday == dateMeet) {
          listMeetsToday.push({
            date: obj.date,
            subject: obj.subject,
            patient: {
              id: obj.patient.id,
              firstName: obj.patient.firstName,
              lastName: obj.patient.lastName
            }
          });
        }
      });
      this.meets = listMeetsToday;
    });
  }

  showPatient(id): void {
    this.router.navigate(['/patients', id]);
  }
}
