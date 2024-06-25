import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InstitutionService } from '../../services/institution.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {

  public formLoginTeacher: FormGroup;
  isAlertVisible: boolean = false;

  institutions: any[] = [];
  selectedInstitution: string = '';

  constructor(private institutionService: InstitutionService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.formLoginTeacher = this.formBuilder.group({
      name: ['', [Validators.required]],
      asignature: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      id_institution: ['', [Validators.required]]
    });
  }

  loading: boolean = false;

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
    if (this.formLoginTeacher.invalid) {
      this.isAlertVisible = true;
      this.formLoginTeacher.markAllAsTouched();
      setTimeout(() => {
        this.closeAlert();
      }, 2000); 
      return;
    }

    this.isAlertVisible = false;
    this.authService.signUpTeacher(this.formLoginTeacher.value).subscribe(
      res => {
        console.log(res);
        // Redireccionar a la página de inicio
        this.router.navigate(['/home']);
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

  closeAlert() {
    this.isAlertVisible = false;
  }
}