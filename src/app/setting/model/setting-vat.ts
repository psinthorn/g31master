import { Setting } from './setting';

export class SettingVat extends Setting {
  vat: number;

  static convert(obj: any): SettingVat {
    if(obj && !(obj instanceof SettingVat)) {
      Object.setPrototypeOf(Setting.convert(obj), SettingVat);
    }

    return obj;
  }
}
