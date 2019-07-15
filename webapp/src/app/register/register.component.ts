import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { loginValidator, cyrillicNameValidator } from '../shared/custom-validators';
import { RegisterModel } from './dto/registerModel';
import { RegisterResponse } from './dto/registerResponse';
import { RegisterRequest } from './dto/registerRequest';
import { BaseModelItem } from '../shared/dto/BaseModelItem';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private baseUrl = environment.wcfUrl;

  registerForm: FormGroup;
  registerModel: RegisterModel;

  responseMessage: string;
  responseHasError: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initRegisterForm();
    this.initRegisterModel();
  }

  updateLoginError() {
    const loginControl = this.registerForm.controls.login;
    const errors = loginControl.errors;

    if (errors) {
      if (errors.required) {
        this.registerModel.login.errorText = 'Введите логин';
      } else if (errors.login) {
        this.registerModel.login.errorText = 'Разрешены только латинские символы или цифры';
      }
    }

    this.registerModel.login.showError = loginControl.invalid;
  }

  updateLastNameError() {
    const lastNameControl = this.registerForm.controls.lastName;

    if (lastNameControl.dirty || lastNameControl.touched) {
      const errors = lastNameControl.errors;

      if (errors) {
        if (errors.required) {
          this.registerModel.lastName.errorText = 'Введите фамилию';
        } else if (errors.cyrillicName) {
          this.registerModel.lastName.errorText = 'Заполните с заглавной буквы русскими символами';
        }
      }
    }

    this.registerModel.lastName.showError = lastNameControl.invalid;
  }

  updateFirstNameError() {
    const firstNameControl = this.registerForm.controls.firstName;

    if (firstNameControl.dirty || firstNameControl.touched) {
      const errors = firstNameControl.errors;

      if (errors) {
        if (errors.required) {
          this.registerModel.firstName.errorText = 'Введите имя';
        } else if (errors.cyrillicName) {
          this.registerModel.firstName.errorText = 'Заполните с заглавной буквы русскими символами';
        }
      }
    }

    this.registerModel.firstName.showError = firstNameControl.invalid;
  }

  showResponseMessage() {
    return this.registerForm && !this.registerForm.touched && this.responseMessage;
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    const request: RegisterRequest = this.createRegisterRequest();

    this.http.post(this.baseUrl + 'register', request).toPromise()
    .then((response: RegisterResponse) => {
      this.responseHasError = response.hasError;
      this.responseMessage = response.message;
      this.registerForm.reset();
    });
  }

  private initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required, loginValidator]],
      lastName: ['', [Validators.required, cyrillicNameValidator]],
      firstName: ['', [Validators.required, cyrillicNameValidator]]
    });
  }

  private initRegisterModel() {
    this.registerModel = new RegisterModel({
      login: new BaseModelItem({
        formControlName: 'login',
        description: 'Логин'
      }),
      lastName: new BaseModelItem({
        formControlName: 'lastName',
        description: 'Фамилия'
      }),
      firstName: new BaseModelItem({
        formControlName: 'firstName',
        description: 'Имя'
      })
    });
  }

  private createRegisterRequest(): RegisterRequest {
    const controls = this.registerForm.controls;
    const request = new RegisterRequest();

    Object.keys(controls).map(key => {
      if (controls[key].valid) {
        request[key] = controls[key].value;
      }
    });

    return request;
  }
}
