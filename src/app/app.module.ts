import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Component
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientComponent, PatientDialog } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { VisitesComponent } from './visites/visites.component';

// Service
import { PatientsService } from './services/patients.service';
import { StatsService } from './services/stats.service';
import { MeetsService } from './services/meets.service';
import { UserService } from './services/user.service';
import { AppInterceptor } from './services/app.interceptor';
import { TokenStorageService } from './services/token-storage.service';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Token
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MeetsComponent } from './meets/meets.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientsComponent,
    PatientFormComponent,
    PatientComponent,
    LoginComponent,
    PatientDialog,
    VisitesComponent,
    MeetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    PatientsService,
    StatsService,
    MeetsService,
    UserService,
    TokenStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
