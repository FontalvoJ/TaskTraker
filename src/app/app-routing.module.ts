import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './view/home/home.component';
import { SignupInstitutionsComponent } from './auth/signup-institutions/signup-institutions.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ListTeachersComponent } from './teachers/list-teachers/list-teachers.component';
import { AdmissionsComponent } from './view/home/admissions/admissions.component';
import { AcaProgrsComponent } from './view/home/aca-progrs/aca-progrs.component';
import { RolsComponent } from './view/home/rols/rols.component';
import { ErrorComponent } from './view/home/error/error.component';
import { SignupInstitutionComponent } from './auth/signup-institution/signup-institution.component';
import { AuthGuard } from './auth.guard';


// Definición de rutas
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'register-institution', component: SignupInstitutionComponent},

  { path: 'academic-programs', component: AcaProgrsComponent},
  { path: 'admissions', component: AdmissionsComponent},
  { path: 'rols', component: RolsComponent},
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupInstitutionsComponent },

  { path: 'list-teachers', component: ListTeachersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
