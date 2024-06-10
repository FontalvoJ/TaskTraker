import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupInstitutionsComponent } from './auth/signup-institutions/signup-institutions.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ListTeachersComponent } from './teachers/list-teachers/list-teachers.component';
import { HomeComponent } from './view/home/home.component';
import { RolsComponent } from './view/home/rols/rols.component';


import { AdmissionsComponent } from './view/home/admissions/admissions.component';
import { AcaProgrsComponent } from './view/home/aca-progrs/aca-progrs.component';

//Nabvars de cada Rol
import { NavbarHomeComponent } from './view/home/navbar-home/navbar-home.component';
import { NavbarVisComponent } from './view/Navbars/navbar-vis/navbar-vis.component';


import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { SignupTeacherComponent } from './auth/signup-teacher/signup-teacher.component';
import { SignupInstitutionComponent } from './auth/signup-institution/signup-institution.component';
import { SignupStudentComponent } from './auth/signup-student/signup-student.component';
import { ErrorComponent } from './view/home/error/error.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarVisComponent,
    SignupInstitutionsComponent,
    SigninComponent,
    ListTeachersComponent,
    HomeComponent,
    NavbarHomeComponent,
    AdmissionsComponent,
    AcaProgrsComponent,
    RolsComponent,
    SignupTeacherComponent,
    SignupInstitutionComponent,
    SignupStudentComponent,
    ErrorComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
