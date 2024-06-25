import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ListTeachersComponent } from './pages/institution/list-teachers/list-teachers.component';
import { AdmissionsComponent } from './pages/home/admissions/admissions.component';
import { AcaProgrsComponent } from './pages/home/aca-progrs/aca-progrs.component';
import { RolsComponent } from './pages/home/rols/rols.component';
import { ErrorComponent } from './pages/home/error/error.component';
import { SignupInstitutionComponent } from './auth/signup-institution/signup-institution.component';
import { SignupTeacherComponent } from './auth/signup-teacher/signup-teacher.component';
import { AuthGuard } from './auth.guard';


// Definición de rutas
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'register-institution', component: SignupInstitutionComponent},
  { path: 'register-teacher', component: SignupTeacherComponent},



  { path: 'academic-programs', component: AcaProgrsComponent},
  { path: 'admissions', component: AdmissionsComponent},
  { path: 'rols', component: RolsComponent},
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupInstitutionComponent },

  { path: 'list-teachers', component: ListTeachersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
