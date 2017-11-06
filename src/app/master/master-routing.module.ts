import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { MasterComponent, MasterListComponent } from './routing-component';

export const masterRoutes: Routes = [
  { path: '', component: MasterComponent,
    children: [
      { path: '', component: MasterListComponent},
      { path: 'person',
        loadChildren: '@consol/person/person-routing.module#PersonRoutingModule',
        data: {
          label: 'Person', description: 'ข้อมูลบุคคล', icon: 'account_circle',
          selectedType: 'submodule',
        }
      },
      { path: 'employee',
        loadChildren: '@consol/employee/employee-routing.module#EmployeeRoutingModule',
        data: {
          label: 'พนักงาน', description: 'ข้อมูลพนักงาน', icon: 'person',
          selectedType: 'submodule',
        },
      },
      { path: 'vendor',
        loadChildren: '@consol/vendor/vendor-routing.module#VendorRoutingModule',
        data: {
          label: 'ผู้ขาย', description: 'ข้อมูลผู้ขาย', icon: 'recent_actors',
          selectedType: 'submodule',
        },
      },
    //  { path: 'subcontractor', loadChildren: '../subcontractor/subcontractor.module#SubcontractorModule', data: {label: 'ผู้รับจ้าง', description: 'ข้อมูลผู้รับจ้าง'}},
      //{ path: 'person', loadChildren: '../person/person.module#PersonModule', data: {label: 'บุคคลธรรมดา', description: 'ข้อมูลบุคคลธรรมดา'}},
      { path: 'cost-item',
        loadChildren: '@consol/cost-item/cost-item-routing.module#CostItemRoutingModule',
        data: {
          label: 'สินค้า', description: 'ข้อมูลสินค้า', icon: 'shop_two',
          selectedType: 'submodule',
        },
      },
      { path: 'project',
        loadChildren: '@consol/project/project-routing.module#ProjectRoutingModule',
        data: {
          label: 'Project', description: 'ข้อมูลโครงการ', icon: 'location_city',
          selectedType: 'submodule',
        }
      },
      //{ path: 'lab', loadChildren: '../lab/lab.module#LabModule', data: {label: 'แรงงาน', description: 'ข้อมูลแรงงาน'}},
    //  { path: 'aaa', loadChildren: '../aaa/aaa.module#AaaModule', data: {label: 'aaa', description: 'ต้นแบบ1 (ไม่ซ้อนfloder)'}},
    //  { path: 'bbb', loadChildren: './bbb/bbb.module#BbbModule', data: {label: 'bbb', description: 'ต้นแบบ2 (ซ้อนfloder)'}},
    ],
  },
];

@NgModule({
  imports: [
    SharedModule,
    CustomModule,
    RouterModule.forChild(masterRoutes),
  ],
  exports: [RouterModule],
  declarations: [MasterComponent, MasterListComponent],
})
export class MasterRoutingModule {}
