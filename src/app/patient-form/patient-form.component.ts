import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { DictionariesService } from '../services/dictionaries.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary } from '../models/dictionary';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  isEditMode = '';
  form: FormGroup;
  listBloodGroups: Dictionary[] = [];
  listDrugs: Dictionary[] = [];
  listRepeats: Dictionary[] = [];
  listPeriods: Dictionary[] = [];

  constructor(private patientsService: PatientsService, private dictionariesService: DictionariesService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.getBloodGroups();
    this.getDrugs();
    this.getRepeats();
    this.getPeriods();
    this.isEditMode = this.route.snapshot.data.edit;
    if(this.route.snapshot.data.edit) {
      this.getData();
    }
  }

  getBloodGroups() {
    // this.patients = this.patientsService.getPatients();
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

  get treatments(): FormArray {
    return this.form.get('treatments') as FormArray;
  }

  get documents(): FormArray {
    return this.form.get('documents') as FormArray;
  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      gender: ['', Validators.required],
      allergies: [''],
      lastIncome: ['', Validators.required],
      lastSubject: ['', Validators.required],
      socialNumber: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      notes: ['', Validators.required],
      treatments: this.fb.array([]),
      documents: this.fb.array([])
    });
  }

  add() {
    this.form.value.bloodGroup = parseInt(this.form.value.bloodGroup);
    this.form.value.treatments.map(obj => {
      obj.drug = parseInt(obj.drug);
      obj.repeat = parseInt(obj.repeat);
      obj.duration = parseInt(obj.duration);
    });
    this.patientsService.addPatient(this.form.value).subscribe(response => {
      this.router.navigate(['/patients']);
    });
  }

  edit() {
    this.form.value.bloodGroup = parseInt(this.form.value.bloodGroup);
    this.form.value.treatments.map(obj => {
      obj.drug = parseInt(obj.drug);
      obj.repeat = parseInt(obj.repeat);
      obj.duration = parseInt(obj.duration);
    });
    this.patientsService.updatePatient(this.route.snapshot.paramMap.get('id') , this.form.value).subscribe(response => {
      this.router.navigate(['/patients/', this.route.snapshot.paramMap.get('id')]);
    })
  }

  delete() {
    this.patientsService.deletePatient(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.router.navigate(['/patients']);
    })
  }
  
  onSubmit() {
    if (this.isEditMode) {
      this.edit();
    } else {
      this.add();
    }
  }

  newTreatment(): FormGroup {
    return this.fb.group({
      drug: '',
      repeat: '',
      duration: ''
    })
  }

  addTreatment() {
    this.treatments.push(this.newTreatment());
  }


  removeTreatment(index) {
      this.treatments.removeAt(index);
  }

  newDocument(): FormGroup {
    return this.fb.group({
      name: '',
      extension: '',
      uploadAt: ''
    })
  }

  addDocument() {
    this.documents.push(this.newDocument());
  }


  removeDocument(index) {
      this.documents.removeAt(index);
  }

  getData() {
    this.patientsService.getPatient(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.form.patchValue(response);
      response.treatments.forEach((treatment, index) => {
        this.addTreatment();
        this.treatments.at(index).patchValue(treatment);
      });
      response.documents.forEach((document, index) => {
        this.addDocument();
        this.documents.at(index).patchValue(document);
      })
    });
  }
}
