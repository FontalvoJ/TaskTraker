import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup-institution',
  templateUrl: './signup-institution.component.html',
  styleUrls: ['./signup-institution.component.css']
})

export class SignupInstitutionComponent implements OnInit {

  public formLoginInstitution: FormGroup;
  isAlertVisible: boolean = true;

  constructor(private formBuilder: FormBuilder) { this.formLoginInstitution = this.formBuilder.group({});
}

  ngOnInit(): void {
    this.formLoginInstitution = this.formBuilder.group({
      institutionName: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  send(): void {
    console.log(this.formLoginInstitution.value);
    // Aquí se puede agregar la lógica para enviar el formulario
  }
  closeAlert() {
    this.isAlertVisible = false;
  }
}