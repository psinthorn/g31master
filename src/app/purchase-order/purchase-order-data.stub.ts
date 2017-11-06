import { vendorStubs } from '@consol/vendor/vendor-data.stub';
import { projectStubs } from '@consol/project/project-data.stub';
import { employeeStubs } from '@consol/employee/employee-data.stub';
import { costItemStubs } from '@consol/cost-item/cost-item-data.stub';
import { projectBoqStubs } from '@consol/project/project-boq-data.stub';
import { purchaseRequestStubs } from '@consol/purchase-request/purchase-request-data.stub';

import { Address, Contact } from '@consol/custom';

const systemuserStub = {
  id: 1,
  code: 'PURCHASE',
  name: 'PURCHASE',
  dtype: 'systemUser',
  plainPassword: null,
  individualRoles: ['PURCHASE'],
  groups: [],
  remark: null,

};

export let purchaseOrderStubs = [
  {
    // Account
    id: 1,
    dtype: 'purchaseOrder',
    code: 'PO201708110001',
    name: 'PO P001',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: false,
    terminated: null,
    updateOf: null,
    updateTos: [
      {
        // Account
        id: 2,
        code: 'PO201708110002',
        name: 'PO P001',
        remark: null,
      },
    ],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: costItemStubs[0],
        statusChanged: {
          purchaseRequestDetail: {
            costItem: null,
            name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
            unit: 'งวด',
          },
          removed: false,
        },
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: null,
        statusChanged: {
          purchaseRequestDetail: {
            costItem: null,
            name: 'ค่าแรงงานโครงสร้าง งวดที่ 2',
            unit: 'งวด',
          },
          removed: true,
        },
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 2,
    dtype: 'purchaseOrder',
    code: 'PO201708110002',
    name: 'PO P001',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502438856259,
    approved: true,
    terminated: null,
    updateOf:   {
      // Account
      id: 1,
      code: 'PO201708110001',
      name: 'PO P001',
      remark: null,
    },
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: 'test change address',
    requester: employeeStubs[0],
    contactInformation: 'test change contact',
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[0],

    details: [
      {
        id: 1,
        costItem: costItemStubs[0],
        statusChanged: {
          purchaseRequestDetail: {
            costItem: costItemStubs[0],
            name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
            unit: 'งวด',
          },
          removed: false,
        },
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: null,
        statusChanged: {
          purchaseRequestDetail: {
            costItem: null,
            name: 'ค่าแรงงานโครงสร้าง งวดที่ 2',
            unit: 'งวด',
          },
          removed: true,
        },
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
      {
        id: 3,
        costItem: costItemStubs[1],
        statusChanged: null,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 3',
      },
    ],
  },
/*
  {
    // Account
    id: 3,
    dtype: 'purchaseRequest',
    code: 'PR201708110003',
    name: 'PR P003',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: false,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 4,
    dtype: 'purchaseOrder',
    code: 'PR201708110004',
    name: 'PR P004',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: false,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[1],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[1],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[1].individual.contact)).toString(),
    wantedDate: '2017-10-04',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 5,
    dtype: 'purchaseOrder',
    code: 'PR201708110005',
    name: 'PR P005',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: false,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 6,
    dtype: 'purchaseOrder',
    code: 'PR201708110006',
    name: 'PR P006',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: true,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 7,
    dtype: 'purchaseOrder',
    code: 'PR201708110007',
    name: 'PR P007',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: false,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 8,
    dtype: 'purchaseOrder',
    code: 'PR201708110008',
    name: 'PR P008',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: true,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 9,
    dtype: 'purchaseOrder',
    code: 'PR201708110009',
    name: 'PR P009',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: false,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 10,
    dtype: 'purchaseRequest',
    code: 'PR201708110010',
    name: 'PR P010',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: true,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 11,
    dtype: 'purchaseRequest',
    code: 'PR201708110011',
    name: 'PR P011',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: false,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
  {
    // Account
    id: 12,
    dtype: 'purchaseRequest',
    code: 'PR201708110012',
    name: 'PR P012',
    remark: null,

    // Document
    creator: systemuserStub,
    timestamp: 1502437076626,
    approved: true,
    terminated: null,
    updateOf: null,
    updateTos: [],

    // PurchaseRequest
    vendor: vendorStubs[0],
    project: projectStubs[0],
    shippingAddress: Address.convert(Object.assign({}, projectStubs[0].address)).toString(),
    requester: employeeStubs[0],
    contactInformation: Contact.convert(Object.assign({}, employeeStubs[0].individual.contact)).toString(),
    wantedDate: '2017-08-20',

    boq: projectBoqStubs[0],
    budgetType: projectBoqStubs[0].budgetTypes[1],

    details: [
      {
        id: 1,
        costItem: null,
        name: 'ค่าแรงงานโครงสร้าง งวดที่ 1',
        unit: 'งวด',
        price: '20000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[0],
        remark: null,
      },
      {
        id: 2,
        costItem: costItemStubs[0],
        name: costItemStubs[0].name,
        unit: costItemStubs[0].unit,
        price: '30000.00',
        quantity: 1,
        boqData: projectBoqStubs[0].children[0].children[1],
        remark: 'remark 2',
      },
    ],
  },
*/
];
