import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

import { ItemIndividualBase } from './item-individual.base';
import { ItemIndividualChildBase } from './item-individual-child.base';
import {
  ItemOnReadyMethod,
  ItemCreateFormMethod
} from './item-core.base';

import { Observable } from 'rxjs/Observable';

// RxJS static methods
import 'rxjs/add/observable/throw';

// RxJS operators
//import 'rxjs/add/operator/delay';

export abstract class ItemEditBase<T, C extends ItemIndividualBase<T>>
  extends ItemIndividualChildBase<T, C>
  implements ItemCreateFormMethod<T> {
  public form: FormGroup;

  constructor(
    itemComponent: C
  ) {
    super(itemComponent);

    Object.assign(this.operators, {
      save: () => this.save()
    });

    this.form = null;
  }

  protected _itemReady(item) {
    this.form = (item)? this.itemCreateForm(item) : null;

    if(ItemOnReadyMethod.isValid(this)) this.itemOnReady();
  }

  save(): Observable<any> {
    if(this.form.valid){
      let isNew = this.itemComponent.isNew;
      let observable = this.itemComponent.save$(<T>this.form.value);
      observable.subscribe(
        (obj) => {
          if(isNew){
            this.itemComponent.replace(obj);
          } else{
            this.itemComponent.reload();
            this.itemComponent.back();
          }
        },
        (err) => {
          // TODO: must use error log
          console.error(err);
        }
      );
      return observable;
    } else{
      return Observable.throw(new Error('Invalid Form Data.'));
    }
  }

  cancel(): void {
    this.itemComponent.back();
  }

  abstract itemCreateForm(item: T);
}
