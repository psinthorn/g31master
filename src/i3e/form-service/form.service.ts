import { FormGroup, FormArray } from '@angular/forms';

// For Test
import { FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';


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

export abstract class FormService<T> {
  constructor(private _fb: FormBuilder) { }

  protected get fb() { return this._fb; }

  abstract formConfig(item: T): {[name: string]: any};

  abstract formAssignChanges(formGroup: FormGroup);

  protected formBuildFromConfig(config: {[name: string]: any}): FormGroup {
    return this.fb.group(config);
  }

  formBuild(item: T): FormGroup {
    return this.formBuildFromConfig(this.formConfig(item));
  }

  formCreate(item?: T): FormGroup {
    const formGroup = this.formBuild(item);

    return this.formAssignChanges(formGroup);
  }

}

export class TestItem {
  id: string;
  code: string;
  name: string
}
export class TestItemFormService extends FormService<TestItem> {
  constructor(fb: FormBuilder) {
    super(fb);
  }

  formConfig(item: TestItem): {[name: string]: any} {
    item = item || new TestItem();

    return {
      id: [item.id || null, []],
      code: [item.code || null, []],
      name: [item.name || null, []],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    formGroup.get('name').valueChanges.subscribe((value) => {
      formGroup.get('code').setValue(value);
    });

    return formGroup;
  }
}

export class Test2Item extends TestItem {
  description: string;
}
export class Test2ItemFormService extends FormService<Test2Item> {
  constructor(
    fb: FormBuilder,
    private testItemFormService: TestItemFormService,
  ) {
    super(fb);
  }

  formConfig(item: Test2Item): {[name: string]: any} {
    item = item || new Test2Item();

    return Object.assign(this.testItemFormService.formConfig(item), {
      description: [item.description || null, []],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.testItemFormService.formAssignChanges(formGroup);

    return formGroup
  }
}

export class Test1Detail {
  code: string;
  name: string;
}
export class Test1DetailFormService extends FormService<Test1Detail> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item: Test1Detail): {[name: string]: any} {
    item = item || new Test1Detail();

    return {
      code: [item.code || null, []],
      name: [item.name || null, []],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    formGroup.get('name').valueChanges.subscribe((value) => {
      formGroup.get('code').setValue(value);
    });

    return formGroup;
  }
}

export class Test3Item<D extends Test1Detail> extends Test2Item {
  parent: TestItem;
  details: D[];
}
export class Test3ItemFormService<D extends Test1Detail> extends FormService<Test3Item<D>> {
  constructor(
    fb: FormBuilder,
    private testItemFormService: TestItemFormService,
    private test2ItemFormService: Test2ItemFormService,
    private test1DetailFormService: Test1DetailFormService,
  ) {
    super(fb);
  }

  formConfig(item: Test3Item<D>): {[name: string]: any} {
    item = item || new Test3Item<D>();

    return Object.assign(this.test2ItemFormService.formConfig(item), {
      parent: this.testItemFormService.formBuild(item.parent),
      details: this.fb.array((item.details || [null]).map((data) => {
        return this.test1DetailFormService.formBuild(data);
      })),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.test2ItemFormService.formAssignChanges(formGroup);
    this.testItemFormService.formAssignChanges(formGroup.get('parent') as FormGroup);
    (formGroup.get('details') as FormArray).controls.forEach((fg: FormGroup) => {
      this.test1DetailFormService.formAssignChanges(fg)
    });

    return formGroup;
  }
}

export class Test2Detail extends Test1Detail {
  price: number;
  quantity: number;
}
export class Test2DetailFormService extends FormService<Test2Detail> {
  constructor(
    fb: FormBuilder,
    private test1DetailFormService: Test1DetailFormService,
  ) {
    super(fb);
  }

  formConfig(item: Test2Detail): {[name: string]: any} {
    item = item || new Test2Detail();

    return Object.assign(this.test1DetailFormService.formConfig(item), {
      price: [item.price || null, []],
      quantity: [item.quantity || null, []],
      _total: [(item.price && item.quantity)? item.price * item.quantity : 0, []],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.test1DetailFormService.formAssignChanges(formGroup);

    Observable.merge(
      formGroup.get('price').valueChanges,
      formGroup.get('quantity').valueChanges,
    ).subscribe(() => {
      const price = formGroup.get('price').value || 0;
      const quantity = formGroup.get('quantity').value || 0;

      formGroup.get('_total').setValue(price * quantity);
    });

    return formGroup;
  }
}

export class Test4Item extends Test3Item<Test2Detail> {
  details: Test2Detail[];
}

export class Test4ItemFormService extends FormService<Test4Item> {
  constructor(
    fb: FormBuilder,
    private test3ItemFormService: Test3ItemFormService<Test2Detail>,
    private test2DetailFormService: Test2DetailFormService,
  ) {
    super(fb);
  }
  formConfig(item: Test4Item): {[name: string]: any} {
    item = item || new Test4Item();

    return Object.assign(this.test3ItemFormService.formConfig(item), {
      details: this.fb.array((item.details || []).map((data) => {
        return this.test2DetailFormService.formBuild(data);
      }))
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.test3ItemFormService.formAssignChanges(formGroup);

    (formGroup.get('details') as FormArray).controls.forEach((fg: FormGroup) => {
      this.test2DetailFormService.formAssignChanges(fg);
    });

    return formGroup;
  }
}
