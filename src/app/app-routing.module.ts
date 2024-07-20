import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AdmissionsComponent } from './pages/home/admissions/admissions.component';
import { AcaProgrsComponent } from './pages/home/aca-progrs/aca-progrs.component';
import { RolsComponent } from './pages/home/rols/rols.component';
import { ErrorComponent } from './pages/home/error/error.component';
import { SignupInstitutionComponent } from './auth/signup-institution/signup-institution.component';
import { SignupTeacherComponent } from './auth/signup-teacher/signup-teacher.component';
import { SignupStudentComponent } from './auth/signup-student/signup-student.component';
import { DasboardInstitutionComponent } from './pages/institution/dasboard-institution/dasboard-institution.component';
import { ListTeachersComponent } from './pages/institution/list-teachers/list-teachers.component';
import { AuthGuard } from './auth.guard';

import { ListStudenstsComponent } from './pages/institution/list-students/list-students.component';
import { DashboardTeacherComponent } from './pages/teacher/dashboard-teacher/dashboard-teacher.component';
import { StudentProjectsComponent } from './pages/teacher/student-projects/student-projects.component';
import { CreateProjectComponent } from './pages/teacher/create-project/create-project.component';
import { DashboardStudentComponent } from './pages/student/dashboard-student/dashboard-student.component';
import { GetintoProjectComponent } from './pages/student/getinto-project/getinto-project.component';

// Definición de rutas
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'register-institution', component: SignupInstitutionComponent },
  { path: 'register-teacher', component: SignupTeacherComponent },
  { path: 'register-student', component: SignupStudentComponent },
  { path: 'academic-programs', component: AcaProgrsComponent },
  { path: 'admissions', component: AdmissionsComponent },
  { path: 'rols', component: RolsComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupInstitutionComponent },
  { path: 'teachers', component: ListTeachersComponent, canActivate: [AuthGuard]  },
  { path: 'students', component: ListStudenstsComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard-institution', component: DasboardInstitutionComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-teacher', component: DashboardTeacherComponent, canActivate: [AuthGuard] },
  { path: 'student-projects', component: StudentProjectsComponent, canActivate: [AuthGuard] },
  { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-student', component: DashboardStudentComponent, canActivate: [AuthGuard] },
  { path: 'getinto-project', component: GetintoProjectComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
