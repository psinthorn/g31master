import { Corporate } from '@consol/custom';

import { Setting } from './setting';

import { Address } from '@consol/custom';

export class SettingProfile extends Setting {
  profileData: Corporate;
  address: Address;
  phone: string;
  fax: string;

  static convert(obj: any): SettingProfile {
    if(obj && !(obj instanceof SettingProfile)) {
      Object.setPrototypeOf(Setting.convert(obj), SettingProfile);
      Corporate.convert(obj.profileData);
      Address.convert(obj.address);
    }

    return obj;
  }
}
