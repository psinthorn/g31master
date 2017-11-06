import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { SettingProfile } from '../model';

import { SettingFormService } from '../setting-form.service';
import { CorporateFormService } from '@consol/custom';
import { AddressFormService } from '@consol/custom';

@Injectable()
export class SettingProfileFormService extends FormService<SettingProfile> {
  constructor(
    fb: FormBuilder,
    private settingFormService: SettingFormService,
    private corporateFormService: CorporateFormService,
    private addressFormService: AddressFormService,
  ) {
    super(fb);
  }

  formConfig(item?: SettingProfile): {[name: string]: any} {
    item = item || new SettingProfile();

    return Object.assign(this.settingFormService.formConfig(item), {
      profileData: this.corporateFormService.formBuild(item.profileData),
      address: this.addressFormService.formBuild(item.address),
      phone: [item.phone || null, [Validators.required]],
      fax: [item.phone || null, [Validators.required]],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.settingFormService.formAssignChanges(formGroup);
    this.corporateFormService.formAssignChanges(formGroup.get('profileData') as FormGroup);
    this.addressFormService.formAssignChanges(formGroup.get('address') as FormGroup)

    return formGroup;
  }
}
