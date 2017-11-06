import { NgModule, ModuleWithProviders } from '@angular/core';

import { I3eModule } from '@i3e';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

//import { CustomMaterialModule } from './custom-material.module';

import { SectionBlockComponent} from './section-block';

import { FormControlErrorComponent, ErrorMessageComponent } from './form-control-error';

import {
  AddressFormService,
  AddressComponent
} from './address';

import {
  BankAccountFormService,
  BankAccountComponent, BankAccountArrayComponent
} from './bank-account';

import {
  ContactPhoneFormService,
  ContactPhoneComponent, ContactPhoneArrayComponent
} from './contact-phone';

import {
  ContactFormService,
  ContactComponent, ContactArrayComponent
} from './contact';

import {
  PersonDataFormService,
} from './person-data';

import {
  CitizenFormService,
  CitizenComponent
} from './citizen';

import {
  CorporateFormService,
  CustomCorporateComponent
} from './corporate';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    //CustomMaterialModule, // now use from shared module
  ],
  exports: [
    // Layout Component
    SectionBlockComponent,

    // Util Component
    FormControlErrorComponent, ErrorMessageComponent,

    // Form Component
    AddressComponent,
    BankAccountComponent, BankAccountArrayComponent,
    ContactPhoneComponent, ContactPhoneArrayComponent,
    ContactComponent, ContactArrayComponent,
    CitizenComponent,
    CustomCorporateComponent,
  ],
  declarations: [
    // Layout Component
    SectionBlockComponent,

    // Util Component
    FormControlErrorComponent, ErrorMessageComponent,

    // Form Component
    AddressComponent,
    BankAccountComponent, BankAccountArrayComponent,
    ContactPhoneComponent, ContactPhoneArrayComponent,
    ContactComponent, ContactArrayComponent,
    CitizenComponent,
    CustomCorporateComponent,
  ]
})
export class CustomModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomModule,
      providers: [
        AddressFormService,
        ContactPhoneFormService, ContactFormService,
        BankAccountFormService,
        PersonDataFormService,
        CitizenFormService, CorporateFormService
      ]
    };
  }
}
