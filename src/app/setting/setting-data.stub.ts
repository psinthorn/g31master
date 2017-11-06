export let settingStubs = [
  {
    id: 1,
    code: 'PROFILE',
    name: 'Profile',
    dtype: 'settingProfile',
    order: 1,
    profileData: {
      id: 100000,
      code: '0505555009033',
      dtype: 'corporate',
      category: 'บจก.',
      name: '31 คอนสตรัคชั่น แอนด์ เอ็นจิเนียริ่ง',
      main: true,
      branch: null,
      address: {
        id: 10000,
        address: `499/12 หมู่ที่ 5 ถ.เชียงใหม่-พร้าว`,
        subdistrict: 'หนองหาร',
        district: 'สันทราย',
        province: 'เชียงใหม่',
        postalcode: '50290',
      },
      phone: '053353853',
      fax: '053353853',
    },
  },
  {
    id: 2,
    code: 'VAT',
    name: 'Vat',
    dtype: 'settingVat',
    order: 101,
    vat: '7',
  },
  {
    id: 3,
    code: 'TAX',
    name: 'Tax',
    dtype: 'settingTax',
    taxs: [0.75, 1, 2, 3, 5, 10, 15],
  },
];