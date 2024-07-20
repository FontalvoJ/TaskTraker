import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Root Component
import { AppComponent } from './app.component';

// Auth Components
import { SigninComponent } from './auth/signin/signin.component';
import { SignupTeacherComponent } from './auth/signup-teacher/signup-teacher.component';
import { SignupInstitutionComponent } from './auth/signup-institution/signup-institution.component';
import { SignupStudentComponent } from './auth/signup-student/signup-student.component';

// Pages Components
import { HomeComponent } from './pages/home/home.component';
import { RolsComponent } from './pages/home/rols/rols.component';
import { AdmissionsComponent } from './pages/home/admissions/admissions.component';
import { AcaProgrsComponent } from './pages/home/aca-progrs/aca-progrs.component';
import { ErrorComponent } from './pages/home/error/error.component';

// Institution Components
import { DasboardInstitutionComponent } from './pages/institution/dasboard-institution/dasboard-institution.component';
import { ListTeachersComponent } from './pages/institution/list-teachers/list-teachers.component';
import { ListStudenstsComponent } from './pages/institution/list-students/list-students.component';

// Teacher Components
import { DashboardTeacherComponent } from './pages/teacher/dashboard-teacher/dashboard-teacher.component';
import { StudentProjectsComponent } from './pages/teacher/student-projects/student-projects.component';
import { CreateProjectComponent } from './pages/teacher/create-project/create-project.component';

// Student Components
import { DashboardStudentComponent } from './pages/student/dashboard-student/dashboard-student.component';
import { GetintoProjectComponent } from './pages/student/getinto-project/getinto-project.component';

// Navbar Components
import { NavbarHomeComponent } from './pages/Navbars/navbar-home/navbar-home.component';
import { NavbarInstitutionComponent } from './pages/Navbars/navbar-institution/navbar-institution.component';
import { NavbarTeacherComponent } from './pages/Navbars/navbar-teacher/navbar-teacher.component';
import { NavbarStudentComponent } from './pages/Navbars/navbar-student/navbar-student.component';

// Services and Guards
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupTeacherComponent,
    SignupInstitutionComponent,
    SignupStudentComponent,
    HomeComponent,
    RolsComponent,
    AdmissionsComponent,
    AcaProgrsComponent,
    ErrorComponent,
    DasboardInstitutionComponent,
    ListTeachersComponent,
    ListStudenstsComponent,
    DashboardTeacherComponent,
    StudentProjectsComponent,
    CreateProjectComponent,
    DashboardStudentComponent,
    GetintoProjectComponent,
    NavbarHomeComponent,
    NavbarInstitutionComponent,
    NavbarTeacherComponent,
    NavbarStudentComponent
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
