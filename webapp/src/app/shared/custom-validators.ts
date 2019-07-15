import { AbstractControl } from '@angular/forms';

export function loginValidator(control: AbstractControl) {
  const loginRegExp: RegExp = /^[A-Za-z\d]*$/g;
  const isLoginCorrect = loginRegExp.test(control.value);

  return isLoginCorrect ? null : {login: {value: control.value}};
}

export function cyrillicNameValidator(control: AbstractControl) {
  const cyrillicNameRegExp: RegExp = /^[А-Я][А-Яа-я]*$/g;
  const isNameCorrect = cyrillicNameRegExp.test(control.value);

  return isNameCorrect ? null : {cyrillicName: {value: control.value}};
}
