import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup-institution',
  templateUrl: './signup-institution.component.html',
  styleUrls: ['./signup-institution.component.css']
})
export class SignupInstitutionComponent implements OnInit {

  public formLoginInstitution: FormGroup;
  isAlertVisible: boolean = false;
  registrationSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLoginInstitution = this.formBuilder.group({
      institutionName: ['', Validators.required],
      nit: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  send(): void {
    if (this.formLoginInstitution.invalid) {
      this.isAlertVisible = true;
      setTimeout(() => {
        this.closeAlert();
      }, 2000); 
      return;
    }

    this.isAlertVisible = false;
    this.authService.signUp(this.formLoginInstitution.value).subscribe(
      res => {
        console.log(res);
        this.registrationSuccess = true;
        setTimeout(() => {
          this.registrationSuccess = false;
          //this.router.navigate(['/register-institution']); 
          this.router.navigate(['/login']); 

        }, 5000); 
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
