import {ValidatorFn, AbstractControl} from '@angular/forms';

export function minValueValidator(min: Number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const input = control.value,
          isValid = input < min;
    return isValid ? {'minValue': {min}} : null;
  };
}
