import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { accountStubs } from '@consol/account/account-data.stub';
import { personStubs } from '@consol/person/person-data.stub';
import { vendorStubs } from '@consol/vendor/vendor-data.stub';
import { employeeStubs } from '@consol/employee/employee-data.stub';
import { projectStubs } from '@consol/project/project-data.stub';
import { projectBoqStubs } from '@consol/project/project-boq-data.stub';

import { costItemTypeRefStubs } from '@consol/cost-item/cost-item-type-ref-data.stub';
import { costItemStubs } from '@consol/cost-item/cost-item-data.stub';

import { purchaseRequestStubs } from '@consol/purchase-request/purchase-request-data.stub';
import { purchaseOrderStubs } from '@consol/purchase-order/purchase-order-data.stub';


import { settingStubs } from '@consol/setting/setting-data.stub';


@Injectable()
export class DataStub implements InMemoryDbService {
  constructor(){
console.debug('DataStub was created');
  }

  createDb() {
    let home = [
      {
        "id": 1,
        "code": "Pepper",
        "firstname": "Peper",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345",
        "details": [
          {
            "att1": '123',
            "att2": '456'
          },
          {
            "att1": '789',
            "att2": '012'
          }
        ],
        "addressEx": {
          "id": "1",
          "address": "address1\naddress2",
          "subdistrict": "a",
          "district": "b",
          "province": "c",
          "postalcode": "12345"
        },
      },
      {
        "id": 2,
        "code": "Salt",
        "firstname": "Salt",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345",
        "details": [
          {
            "att1": '123',
            "att2": '456'
          },
          {
            "att1": '789',
            "att2": '012'
          }
        ],
        "addressEx": {
          "id": "1",
          "address": "address1\naddress2",
          "subdistrict": "a",
          "district": "b",
          "province": "c",
          "postalcode": "12345"
        },
      },
      {
        "id": 3,
        "code": "Paprika",
        "firstname": "Paprika",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345",
        "details": [
          {
            "att1": '123',
            "att2": '456'
          },
          {
            "att1": '789',
            "att2": '012'
          }
        ],
        "addressEx": {
          "id": "1",
          "address": "address1\naddress2",
          "subdistrict": "a",
          "district": "b",
          "province": "c",
          "postalcode": "12345"
        },
      },
      {
        "id": 4,
        "code": "STUB04",
        "firstname": "Paprika",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345",
        "details": [
          {
            "att1": '123',
            "att2": '456'
          },
          {
            "att1": '789',
            "att2": '012'
          }
        ],
        "addressEx": {
          "id": "1",
          "address": "address1\naddress2",
          "subdistrict": "a",
          "district": "b",
          "province": "c",
          "postalcode": "12345"
        },
      }
    ];
    for(let i = 5; i <= 100; i++){
      home.push(this._generateData(i));
    }

    let aaa = [
      {
        "id": 1,
        "code": "Pepper",
        "firstname": "Peper",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345"
      }
    ];

    let account = accountStubs;
    let person = personStubs;
    let vendor = vendorStubs;
    let employee = employeeStubs;

    let cost_item = costItemStubs;
    let cost_item_type_ref = costItemTypeRefStubs;

    let purchase_request = purchaseRequestStubs;
    let purchase_order = purchaseOrderStubs;

    let subcontractor = [
      {
        "id": 1,
        "code": "Pepper",
        "matCode": "Pepper",
        "firstname": "Peper",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345"
      }
    ];

    let project = projectStubs;
    let project_boq = projectBoqStubs;

    let lab = [
      {
        "id": 1,
        "code": "Pepper",

        "labCode": "0101010101028",
        "labName": "ค่าแรงเทคอนกรีตโครงสร้าง",
        "labDescription": "ความสูงไม่เกิน 3 เมตร",
        "labUnit": "ลบ.ม.",
        "labPricePerUnit": "325"
      }
    ];

    let pr = [
      {
        "id": 1,
        "code": "PR-J020-6005001",
        "projectCode": "J020",
        "projectName": "โรงแรม",
        "address": "abcd\nefgh\n1234",
        "subdistrict": "xyz\nijk\n987",
        "district": "Chiang Mai",
        "province": "Northern",
        "postalcode": "12345",

        "personCode": "12345",
        "personName": "12345",
        "personContact": "12345",

        "vendorCode": "12345",
        "vendorName": "12345",
        "vendorContact": "12345",

        "requestDate": "12345",
        "wantDate": "12345",
        "details": [
          {
            matName: "abcd",
            matUnit: "yyyy",
            matPricePerUnit: 123,
            matQuantity: 10,
            totalPrice: 1230,
            boqCode: "1234",
            remark: "yyyyyy",
          },
          {
            matName: "efgh",
            matUnit: "yyyy",
            matPricePerUnit: 123,
            matQuantity: 10,
            totalPrice: 1230,
            boqCode: "1234",
            remark: "yyyyyy",
          },
          {
            matName: "tttt",
            matUnit: "yyyy",
            matPricePerUnit: 123,
            matQuantity: 10,
            totalPrice: 1230,
            boqCode: "1234",
            remark: "yyyyyy",
          },
        ],
      }
    ];

    let wr = [
      {
        "id": 1,
        "code": "Pepper",
        "firstname": "Peper",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345"
      }
    ];

    let ppo = [
      {
        "id": 1,
        "code": "Pepper",
        "firstname": "Peper",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345"
      }
    ];

    let pwo = [
      {
        "id": 1,
        "code": "Pepper",
        "firstname": "Peper",
        "lastname": "Description",
        "address": "abcd\nefgh\n1234",
        "address2": "xyz\nijk\n987",
        "city": "Chiang Mai",
        "state": "Northern",
        "postalcode": "12345"
      }
    ];

console.debug('created stub data');
    //home = [];


    let setting = settingStubs;

    return {
      home, account, aaa, person, vendor, employee, subcontractor,
      project, project_boq,

      cost_item, cost_item_type_ref,

      purchase_request,
      purchase_order,

      lab, pr, wr, ppo, pwo,

      setting,
    };
  }

  private _generateData(id: number): any {
    const padding = '00';
    let idCode = (padding + id).slice(-padding.length);
    return {
      "id": id,
      "code": `STUB${ idCode }`,
      "firstname": `Stub${ idCode }`,
      "lastname": `StubDataFor${ idCode }`,
      "address": `Stub${ idCode } address
aaa
bbb`,
      "address2": `Stub${ idCode } address2
line-2
line-3`,
      "city": 'Chiang Mai',
      "state": 'Northern',
      "postalcode": '12345',
      "details": [
        {
          "att1": '123',
          "att2": '456'
        },
        {
          "att1": '789',
          "att2": '012'
        }
      ],
      "addressEx": {
        "id": "1",
        "address": "address1\naddress2",
        "subdistrict": "a",
        "district": "b",
        "province": "c",
        "postalcode": "12345"
      },
    };
  }
}
