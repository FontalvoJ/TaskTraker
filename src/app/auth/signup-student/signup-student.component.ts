import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InstitutionService } from 'src/app/services/institution.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {

  public formLoginStudent: FormGroup;
  public isAlertVisible: boolean = false;
  public loading: boolean = false;
  public institutions: any[] = [];
  public selectedInstitution: string = '';
  public registrationSuccess: boolean = false;

  constructor(
    private institutionService: InstitutionService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLoginStudent = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      id_institution: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getInstitutions();
  }

  getInstitutions(): void {
    this.loading = true;
    this.institutionService.getAllInstitutions()
      .subscribe(
        (data: any[]) => {
          this.institutions = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching institutions', error);
          this.loading = false;
        }
      );
  }

  send(): void {
    if (this.formLoginStudent.invalid) {
      this.isAlertVisible = true;
      this.formLoginStudent.markAllAsTouched();
      setTimeout(() => {
        this.closeAlert();
      }, 2000); 
      return;
    }

    this.isAlertVisible = false;
    this.authService.signUpStudent(this.formLoginStudent.value).subscribe(
      res => {
        this.registrationSuccess = true;
        this.formLoginStudent.reset();
        setTimeout(() => {
          this.registrationSuccess = false;
          this.router.navigate(['/register-student']);
        }, 2000);
      },
      err => {
        console.error(err);
        this.isAlertVisible = true;
        setTimeout(() => {
          this.closeAlert();
        }, 2000); 
      }
    );
  }

  closeAlert(): void {
    this.isAlertVisible = false;
  }
}
