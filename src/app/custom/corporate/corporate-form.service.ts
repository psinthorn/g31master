import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

/// RxJS static methods
import 'rxjs/add/observable/merge';

import { FormService } from '@i3e/form-service';

import { Corporate } from '../model';

import { PersonDataFormService } from '../person-data';

@Injectable()
export class CorporateFormService extends FormService<Corporate> {
  constructor(
    fb: FormBuilder,
    private personDataFormService: PersonDataFormService,
  ) {
    super(fb);
  }

  formConfig(item?: Corporate): {[name: string]: any} {
    item = item || new Corporate();

    return Object.assign(this.personDataFormService.formConfig(item), {
      registrationDate: [item.registrationDate || null, [Validators.required]],
      category: [item.category || null, [Validators.required]],
      corporateName: [item.corporateName || null, [Validators.required]],
      main: [item.main || null, [Validators.required]],
      branch: [{ value: item.branch || null , disabled: item.main }, [Validators.required]],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.personDataFormService.formAssignChanges(formGroup);

    Observable.merge(
      formGroup.get('category').valueChanges,
      formGroup.get('corporateName').valueChanges,
    ).subscribe(() => {
      const category = formGroup.get('category').value;
      const corporateMame = formGroup.get('corporateName').value;
      formGroup.get('name').setValue(`${category}${corporateMame}`.trim());
    });

    formGroup.get('main').valueChanges.subscribe((value)=>{
      const branchControl = formGroup.get('branch');

      if(value){
        branchControl.setValue(null);
        branchControl.disable();
      }
      else branchControl.enable();

      //branchControl.markAsTouched();
      branchControl.updateValueAndValidity();
    });

    return formGroup;
  }
}
