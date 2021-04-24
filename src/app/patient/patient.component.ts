import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../models/patient';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PatientTreatment } from '../models/patient-treatment';
import { DictionariesService } from '../services/dictionaries.service';
import { Dictionary } from '../models/dictionary';

export interface DialogData {
  id: string;
  firstName: string;
  lastName: string;
  bloodGroup: number;
  treatments: PatientTreatment[];
}
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @Input() patient: Patient;
  listBloodGroups: Dictionary[] = [];
  listDrugs: Dictionary[] = [];
  listRepeats: Dictionary[] = [];
  listPeriods: Dictionary[] = [];

  constructor(private patientsService: PatientsService, private dictionariesService: DictionariesService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.getBloodGroups();
    this.getDrugs();
    this.getRepeats();
    this.getPeriods();
  }

  getData() {
    this.patientsService
      .getPatient(this.route.snapshot.paramMap.get('id'))
      .subscribe(response => {
        this.patient = response;
    });
  }

  getBloodGroups() {
    this.dictionariesService.getBloodGroups().subscribe(response => {
      this.listBloodGroups = response;
    })
  }

  getDrugs() {
    this.dictionariesService.getDrugs().subscribe(response => {
      this.listDrugs = response;
    })
  }

  getRepeats() {
    this.dictionariesService.getRepeats().subscribe(response => {
      this.listRepeats = response;
    })
  }

  getPeriods() {
    this.dictionariesService.getPeriods().subscribe(response => {
      this.listPeriods = response;
    })
  }

  delete() {
    this.patientsService.deletePatient(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.router.navigate(['/patients']);
    })
  }

  openDialogAddTreatment(): void {
    const dialogRef = this.dialog.open(PatientDialog, {
      width: '400px',
      data: { id: this.route.snapshot.paramMap.get('id'), firstName: this.patient.firstName, lastName: this.patient.lastName, bloodGroup: this.patient.bloodGroup, treatments: this.patient.treatments }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'patient-dialog',
  templateUrl: './patient-dialog.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientDialog {
  form: FormGroup;
  listDrugs: Dictionary[] = [];
  listRepeats: Dictionary[] = [];
  listPeriods: Dictionary[] = [];
  
  constructor(public dialogRef: MatDialogRef<PatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private patientsService: PatientsService, private dictionariesService: DictionariesService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.getDrugs();
    this.getRepeats();
    this.getPeriods();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(id) {
    // var treatment: PatientTreatment = this.form.value;
    // var patientOld = { bloodGroup: this.data.bloodGroup, firstName: this.data.firstName, lastName: this.data.lastName, treatments: [treatment]};
    this.form.value.drug = parseInt(this.form.value.drug);
    this.form.value.repeat = parseInt(this.form.value.repeat);
    this.form.value.duration = parseInt(this.form.value.duration);
    var patient = {
      id: this.data.id,
      bloodGroup: this.data.bloodGroup,
      lastName: this.data.lastName,
      firstName: this.data.firstName,
      treatments: this.data.treatments.concat(this.form.value),
    };
    this.dialogRef.close();
    this.patientsService.updatePatient(id, patient).subscribe(response => {
      // this.router.navigate(['/patients/', id]);
      window.location.reload()
    })
  }

  onSubmit(id) {
    this.edit(id);
  }

  initForm() {
    this.form = this.fb.group({
      drug: ['', Validators.required],
      repeat: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  getDrugs() {
    this.dictionariesService.getDrugs().subscribe(response => {
      this.listDrugs = response;
    })
  }

  getRepeats() {
    this.dictionariesService.getRepeats().subscribe(response => {
      this.listRepeats = response;
    })
  }

  getPeriods() {
    this.dictionariesService.getPeriods().subscribe(response => {
      this.listPeriods = response;
    })
  }
}
