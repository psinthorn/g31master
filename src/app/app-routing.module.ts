import { NgModule, Component }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'cs-dummy-component',
  template: '',
})
export class DummyComponent { }

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: '@consol/home/home-routing.module#HomeRoutingModule', data: {label: 'HOME', icon: 'home'}},
  { path: 'request', loadChildren: '@consol/purchase-request/purchase-request-routing.module#PurchaseRequestRoutingModule', data: {label: 'Request', icon: 'add_shopping_cart'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Quotation', icon: 'shopping_basket'}},
  { path: 'order', loadChildren: '@consol/purchase-order/purchase-order-routing.module#PurchaseOrderRoutingModule', data: {label: 'Order', icon: 'shopping_cart'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Receive', icon: 'archive'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Invoice', icon: 'payment'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Account', icon: 'description'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Finance', icon: 'monetization_on'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Report', icon: 'computer'}},
  { path: 'master', loadChildren: '@consol/master/master-routing.module#MasterRoutingModule', data: {label: 'Master', icon: 'library_add'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Admin', icon: 'supervisor_account'}},
  { path: 'setting', loadChildren: '@consol/setting/setting-routing.module#SettingRoutingModule', data: {label: 'Setting', icon: 'settings'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Help & Feedback', icon: 'feedback'}},
  { path: 'dummy', component: DummyComponent, data: {label: 'Dummy', icon: 'insert_emoticon'}},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [DummyComponent],
})
export class AppRoutingModule {}
