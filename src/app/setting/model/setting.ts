import { ExtendableProperty } from '@consol/custom';

export class Setting implements ExtendableProperty {
  id: string;
  code: string;
  name: string;
  dtype: string;
  ordet: number;

  static convert(obj: any): Setting {
    if(obj && !(obj instanceof Setting)) {
      Object.setPrototypeOf(obj, Setting.prototype);
    }

    return obj;
  }
}
