import { personStubs } from '@consol/person/person-data.stub';

export let employeeStubs = [
  {
    id: 1,
    code: 'E001',
    name: `${personStubs[0].name}`,
    individual: personStubs[0],
    remark: 'remark 1',
  },
  {
    id: 2,
    code: 'E002',
    name: `${personStubs[1].name}`,
    individual: personStubs[1],
    remark: null,
  },
  {
    id: 3,
    code: 'E003',
    name: `${personStubs[2].name}`,
    individual: personStubs[2],
    remark: null,
  },
  {
    id: 4,
    code: 'E004',
    name: `${personStubs[3].name}`,
    individual: personStubs[3],
    remark: null,
  },
];
