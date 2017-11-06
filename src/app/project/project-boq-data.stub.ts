import { projectStubs } from './project-data.stub';

function projectBoqDataCalculator(codes: string[], data: any) {
  let budgets = codes.reduce((result, code, i) => {
    result[code] = {
      id: i + 1,
      budget: 0,
    };

    return result;
  }, {});

  if(data.children && (data.children.length > 0)) {
    for(let child of data.children) {
      projectBoqDataCalculator(codes, child);

      Object.keys(budgets).forEach((code) => {
        if(typeof child.budgets[code]['budget'] === 'number') {
          child.budgets[code]['budget'] = child.budgets[code]['budget'].toFixed(2);
        }
        budgets[code]['budget'] += +child.budgets[code]['budget'];
      });
    }

    Object.keys(budgets).forEach((code) => {
      if(typeof budgets[code]['budget'] === 'number') {
        budgets[code]['budget'] = budgets[code]['budget'].toFixed(2);
      }
    });
  } else {
    Object.keys(budgets).forEach((code) => {
      if(data.budgets && data.budgets[code]) {
        budgets[code] = data.budgets[code];
      }
    });
  }

  data.budgets = budgets;
}

export function projectBoqStubCalculator(projectBoq: any){
  let budgetCodes = projectBoq.budgetTypes.map((budgetType) => budgetType.code);

  projectBoqDataCalculator(budgetCodes, projectBoq);

  return projectBoq;
}

export let projectBoqStubs = [
  {
    id: 1,
    dtype: 'projectBoq',
    project: projectStubs[0],
    budgetTypes: [
      {
        id: 1,
        code: 'MATERIALCOST',
        name: 'ค่าวัสดุ',
      },
      {
        id: 2,
        code: 'LABORCOST',
        name: 'ค่าแรงงาน',
      },
      {
        id: 3,
        code: 'HIRECOST',
        name: 'ค่าจ้างเหมา',
      },
      {
        id: 4,
        code: 'RENTALCOST',
        name: 'ค่าเช่า',
      },
      {
        id: 5,
        code: 'ETCCOST',
        name: 'ค่าอื่นๆ',
      },
    ],
    name: 'BOQ หลัก',
    parent: null,
    children: [
      {
        id: 101,
        dtype: 'projectBoqData',
        name: 'หมวดงานเตรียมพื้นที่',
        parent: 1,
        children: [
          {
            id: 10101,
            dtype: 'projectBoqData',
            name: 'งานปรับดิน',
            parent: 101,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 0.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 5000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 30000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 0.00,
              },
            },
          },
          {
            id: 10102,
            dtype: 'projectBoqData',
            name: 'งานวางผัง',
            parent: 101,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 5000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 2000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 0.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 0.00,
              },
            },
          },
        ],
      },
      {
        id: 102,
        dtype: 'projectBoqData',
        name: 'หมวดงานโครงสร้าง',
        parent: 1,
        children: [
          {
            id: 10201,
            dtype: 'projectBoqData',
            name: 'งานคอนกรีต',
            parent: 102,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 200000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 60000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0,
              },
              'RENTALCOST': {
                id: 4,
                budget: 10000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 5000.00,
              },
            },
          },
          {
            id: 10202,
            dtype: 'projectBoqData',
            name: 'งานเหล็กเสริม',
            parent: 102,
            children: [
              {
                id: 1020201,
                dtype: 'projectBoqData',
                name: 'เหล็กเส้นข้ออ้อย RB6 SR24',
                parent: 102,
                children: [],
                budgets: {
                  'MATERIALCOST': {
                    id: 1,
                    budget: 60000.00,
                  },
                  'LABORCOST': {
                    id: 2,
                    budget: 30000.00,
                  },
                  'HIRECOST': {
                    id: 3,
                    budget: 0.00,
                  },
                  'RENTALCOST': {
                    id: 4,
                    budget: 0.00,
                  },
                  'ETCCOST': {
                    id: 5,
                    budget: 0.00,
                  },
                },
              },
              {
                id: 1020202,
                dtype: 'projectBoqData',
                name: 'เหล็กเส้นข้ออ้อย RB9 SR24',
                parent: 102,
                children: [],
                budgets: {
                  'MATERIALCOST': {
                    id: 1,
                    budget: 90000.00,
                  },
                  'LABORCOST': {
                    id: 2,
                    budget: 45000.00,
                  },
                  'HIRECOST': {
                    id: 3,
                    budget: 0.00,
                  },
                  'RENTALCOST': {
                    id: 4,
                    budget: 0.00,
                  },
                  'ETCCOST': {
                    id: 5,
                    budget: 0.00,
                  },
                },
              },
              {
                id: 1020203,
                dtype: 'projectBoqData',
                name: 'เหล็กเส้นข้ออ้อย DB12 SD40',
                parent: 102,
                children: [],
                budgets: {
                  'MATERIALCOST': {
                    id: 1,
                    budget: 120000.00,
                  },
                  'LABORCOST': {
                    id: 2,
                    budget: 60000.00,
                  },
                  'HIRECOST': {
                    id: 3,
                    budget: 0.00,
                  },
                  'RENTALCOST': {
                    id: 4,
                    budget: 0.00,
                  },
                  'ETCCOST': {
                    id: 5,
                    budget: 0.00,
                  },
                },
              },
              {
                id: 1020204,
                dtype: 'projectBoqData',
                name: 'เหล็กเส้นข้ออ้อย DB16 SD40',
                parent: 102,
                children: [],
                budgets: {
                  'MATERIALCOST': {
                    id: 1,
                    budget: 160000.00,
                  },
                  'LABORCOST': {
                    id: 2,
                    budget: 80000.00,
                  },
                  'HIRECOST': {
                    id: 3,
                    budget: 0.00,
                  },
                  'RENTALCOST': {
                    id: 4,
                    budget: 0.00,
                  },
                  'ETCCOST': {
                    id: 5,
                    budget: 0.00,
                  },
                },
              },
            ],
          },
          {
            id: 10203,
            dtype: 'projectBoqData',
            name: 'งานไม้แบบ',
            parent: 102,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 20000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 30000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 50000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 0.00,
              },
            },
          },
          {
            id: 10204,
            dtype: 'projectBoqData',
            name: 'งานลวดและตะปู',
            parent: 102,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 20000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 0.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 0.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 0.00,
              },
            },
          },
        ],
      },
      {
        id: 103,
        dtype: 'projectBoqData',
        name: 'หมวดงานสถาปัตยกรรม',
        parent: 1,
        children: [
          {
            id: 10301,
            dtype: 'projectBoqData',
            name: 'งานหลังคา',
            parent: 103,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 200000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 60000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 10000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 5000.00,
              },
            },
          },
          {
            id: 10302,
            dtype: 'projectBoqData',
            name: 'งานฝ้าเพดาน',
            parent: 103,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 120000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 45000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 0.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 5000.00,
              },
            },
          },
          {
            id: 10303,
            dtype: 'projectBoqData',
            name: 'งานผนัง',
            parent: 103,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 20000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 30000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 50000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 0.00,
              },
            },
          },
          {
            id: 10304,
            dtype: 'projectBoqData',
            name: 'งานพื้น',
            parent: 103,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 20000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 0.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 0.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 0.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 0.00,
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    dtype: 'projectBoq',
    project: projectStubs[0],
    budgetTypes: [
      {
        id: 11,
        code: 'MATERIALCOST',
        name: 'ค่าวัสดุ',
      },
      {
        id: 12,
        code: 'LABORCOST',
        name: 'ค่าแรงงาน',
      },
      {
        id: 13,
        code: 'HIRECOST',
        name: 'ค่าจ้างเหมา',
      },
    ],
    name: 'BOQ เพิ่มเติม',
    parent: null,
    children: [
      {
        id: 201,
        dtype: 'projectBoqData',
        name: 'หมวดงานไฟฟ้า',
        parent: 2,
        children: [
          {
            id: 20101,
            dtype: 'projectBoqData',
            name: 'งานเดินท่อไฟฟ้า',
            parent: 201,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 0.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 0.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 15000.00,
              },
            },
          },
          {
            id: 20102,
            dtype: 'projectBoqData',
            name: 'งานร้อยสายไฟฟ้า',
            parent: 201,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 0,
              },
              'LABORCOST': {
                id: 2,
                budget: 0,
              },
              'HIRECOST': {
                id: 3,
                budget: 25000.00,
              },
            },
          },
        ],
      },
      {
        id: 202,
        dtype: 'projectBoqData',
        name: 'หมวดงานประปา',
        parent: 2,
        children: [
          {
            id: 20201,
            dtype: 'projectBoqData',
            name: 'งานเดินท่อประปา',
            parent: 202,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 0.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 0.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 7500.00,
              },
            },
          },
          {
            id: 20202,
            dtype: 'projectBoqData',
            name: 'งานติดตั้งระบบน้ำดี',
            parent: 202,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 0.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 0.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 4500.00,
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    dtype: 'projectBoq',
    project: projectStubs[1],
    budgetTypes: [
      {
        id: 1,
        code: 'MATERIALCOST',
        name: 'ค่าวัสดุ',
      },
      {
        id: 2,
        code: 'LABORCOST',
        name: 'ค่าแรงงาน',
      },
      {
        id: 3,
        code: 'HIRECOST',
        name: 'ค่าจ้างเหมา',
      },
      {
        id: 4,
        code: 'RENTALCOST',
        name: 'ค่าเช่า',
      },
      {
        id: 5,
        code: 'ETCCOST',
        name: 'ค่าอื่นๆ',
      },
    ],
    name: 'BOQ โครงการ2',
    parent: null,
    children: [
      {
        id: 301,
        dtype: 'projectBoqData',
        name: 'งานเตรียมพื้นที่',
        parent: 3,
        children: [
          {
            id: 30101,
            dtype: 'projectBoqData',
            name: 'คอนกรีต',
            parent: 301,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 1000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 1000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 1000.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 1000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 1000.00,
              },
            },
          },
          {
            id: 30102,
            dtype: 'projectBoqData',
            name: 'งานเหล็กฐานราก',
            parent: 301,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 1000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 1000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 1000.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 1000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 1000.00,
              },
            },
          },
        ],
      },
      {
        id: 302,
        dtype: 'projectBoqData',
        name: 'งานโครงสร้าง',
        parent: 3,
        children: [
          {
            id: 30201,
            dtype: 'projectBoqData',
            name: 'ไม้แบบ',
            parent: 302,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 1000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 1000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 1000.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 1000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 1000.00,
              },
            },
          },
          {
            id: 30202,
            dtype: 'projectBoqData',
            name: 'งานเหล็กฐานราก',
            parent: 302,
            children: [],
            budgets: {
              'MATERIALCOST': {
                id: 1,
                budget: 1000.00,
              },
              'LABORCOST': {
                id: 2,
                budget: 1000.00,
              },
              'HIRECOST': {
                id: 3,
                budget: 1000.00,
              },
              'RENTALCOST': {
                id: 4,
                budget: 1000.00,
              },
              'ETCCOST': {
                id: 5,
                budget: 1000.00,
              },
            },
          },
        ],
      },
    ],
  },
];

projectBoqStubs.forEach((projectBoq) => projectBoqStubCalculator(projectBoq));
