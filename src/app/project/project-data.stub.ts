import { personStubs } from '@consol/person/person-data.stub';
import { employeeStubs } from '@consol/employee/employee-data.stub';

import {
  addressStubs,
  contactStubs,
  bankAccountStubs,
} from '@consol/custom/custom-data.stub';

export let projectStubs = [
  {
    id: 1,
    code: 'PJ001',
    name: 'โครงการ โชว์รูมเฟอร์นิเจอร์',
    owner: personStubs[8],
    address: addressStubs[8],
    contacts: [
      contactStubs[8],
      contactStubs[11],
    ],
    bankAccounts: [
      bankAccountStubs[8],
      bankAccountStubs[11],
    ],
    workers: [
      employeeStubs[1],
      employeeStubs[3],
    ],
    remark: 'remark 1',
  },
  {
    id: 2,
    code: 'PJ002',
    name: 'โครงการ บ้านพักอาศัย 2 ชั้น',
    owner: personStubs[9],
    address: addressStubs[9],
    contacts: [
      contactStubs[9],
    ],
    workers: [
      employeeStubs[1],
    ],
    bankAccounts: [
      bankAccountStubs[9],
    ],
    remark: null,
  }
];
