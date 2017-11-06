import { Setting } from './setting';

export class SettingTax extends Setting {
  taxs: number[];

  static convert(obj: any): SettingTax {
    if(obj && !(obj instanceof SettingTax)) {
      Object.setPrototypeOf(Setting.convert(obj), SettingTax);
    }

    return obj;
  }
}
