import { FormGroup } from '@angular/forms';

export function mfExtendForm(
  destination: FormGroup, source: FormGroup,
  override?: boolean,
): FormGroup{
  for(let name in source.controls){
    if(override && destination.contains(name)) destination.removeControl(name);
    destination.addControl(name, source.controls[name]);
  }

  return destination;
}

export abstract class ModelFormCreate<T> {
  abstract mfCreate(item?: T, existed?: FormGroup): FormGroup;

  static isValid<T>(obj: any): obj is ModelFormCreate<T> {
    return typeof obj.mfCreate !== 'function';
  }
}

export abstract class ModelFormAssignChanges {
  abstract mfAssignChanges(formGroup: FormGroup): FormGroup;

  static isValid(obj: any): obj is ModelFormAssignChanges {
    return typeof obj.mfAssignChanges === 'function';
  }
}

export abstract class FormControlProperties<T> {
  readonly value : T;
  readonly errors : {[key: string]: any};

  static isValid<T>(obj: any): obj is FormControlProperties<T> {
    return (typeof obj.value !== 'undefined') && (typeof obj.errors !== 'undefined');
  }
}

export abstract class FormServiceBase<T>
  implements ModelFormCreate<T> {
  mfCreate(item?: T, existed?: FormGroup): FormGroup {
    let formGroup = this._mfCreate(item);

    if(existed) formGroup = mfExtendForm(existed, formGroup);

    return (ModelFormAssignChanges.isValid(this))?
      this.mfAssignChanges(formGroup)
    :
      formGroup
    ;
  }

  protected abstract _mfCreate(item?: T): FormGroup;
}
