import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientsService } from './services/patients.service';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { VisitesComponent } from './visites/visites.component';
import { MeetsComponent } from './meets/meets.component';
import { AuthenticationGuard } from './guards/authentication.guard';


const routes: Routes = [
  {
    path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    component: DashboardComponent
  },
  {
    path: 'patients',
    children: [
      {
        path: '',
        canActivate: [AuthenticationGuard],
        component: PatientsComponent
      },
      {
        path: 'nouveau',
        canActivate: [AuthenticationGuard],
        component: PatientFormComponent
      },
      {
        path: ':id',
        canActivate: [AuthenticationGuard],
        component: PatientComponent
      },
      {
        path: ':id/edit',
        canActivate: [AuthenticationGuard],
        component: PatientFormComponent,
        data: {
          edit: true
        }
      }
    ]
  },
  {
    path: 'meets',
    canActivate: [AuthenticationGuard],
    component: MeetsComponent
  },
  {
    path: 'visites',
    canActivate: [AuthenticationGuard],
    component: VisitesComponent
  },
  {
    path: '**',
    canActivate: [AuthenticationGuard],
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
