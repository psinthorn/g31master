import { personStubs } from '@consol/person/person-data.stub';

export let vendorStubs = [
  {
    id: 1,
    code: 'V001',
    name: personStubs[4].name,
    owner: personStubs[4],
    remark: 'Remark 1',
  },
  {
    id: 2,
    code: 'V002',
    name: personStubs[5].name,
    owner: personStubs[5],
    remark: null,
  },
  {
    id: 3,
    code: 'V003',
    name: personStubs[6].name,
    owner: personStubs[6],
    remark: null,
  },
  {
    id: 4,
    code: 'V004',
    name: personStubs[7].name,
    owner: personStubs[7],
    remark: null,
  },
];
