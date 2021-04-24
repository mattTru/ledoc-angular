import { Component, OnInit } from '@angular/core';
import { Meet } from '../models/meet';
import { MeetsService } from '../services/meets.service';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.scss']
})
export class MeetsComponent implements OnInit {
  meets: Meet[] = [];
  
  constructor(private meetsService: MeetsService) { }

  ngOnInit(): void {
    this.getMeets();
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
}
