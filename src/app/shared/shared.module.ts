import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EntryPipe } from './entry.pipe';

import { SharedMaterialModule } from './shared-material.module';
import {
  NavigationBackDirective, NavigationBackComponent
} from './navigation-back.component';
import { ActiveMediaDirective } from './active-media.directive';
import { FormControlHtmlErrorDirective } from './form-control-html-error.directive';
import { ItemNotFoundComponent } from './item-not-found.component';
import { SearchTermComponent } from './search-term.component';
import { PaginationComponent } from './pagination.component';
import { SearchableControlComponent } from './searchable-control.component';
import { ArraySourceControlComponent } from './array-source-control.component';
import { FormControlErrorDirective } from './form-control-error.component';
import { ItemDeleteConfirmComponent } from './item-delete-confirm.component';

import { RouterDividerComponent } from './router-divider.component';

import { ItemDataArrayComponent, ItemDataArrayItemComponent } from './item-data-array.component';

import { ItemListComponent } from './item-list.component';
import { ItemViewComponent } from './item-view.component';
import { ItemEditComponent } from './item-edit.component';

// new
import {
  ContextProcessorEngineDirective,
  FormRoutingProcessorEngineDirective, FormSimpleProcessorEngineDirective,
  ItemFunctionProcessorEngineDirective, ItemRoutingProcessorEngineDirective,
} from './processor';
import {
  DefaultValueDirective,
  SearchableItemControlComponent, SearchableArrayControlComponent,
} from './data-control';
import { DialogOpenDirective } from './dialog';
import {
  DataListComponent, DataViewComponent, DataFormComponent,
  DataListSelectedDirective,
} from './data-presentation';
import { RoutingStateDirective } from './global-state';

import { ProcessDescriptionService } from './processor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NavigationBackDirective, NavigationBackComponent,
    ActiveMediaDirective,
    FormControlHtmlErrorDirective,
    ItemNotFoundComponent,
    SearchTermComponent, PaginationComponent,
    SearchableControlComponent, ArraySourceControlComponent,
    FormControlErrorDirective,
    ItemDeleteConfirmComponent,
    RouterDividerComponent,
    ItemDataArrayComponent, ItemDataArrayItemComponent,
    ItemListComponent, ItemViewComponent, ItemEditComponent,
    SharedMaterialModule, // for convinion use

    ContextProcessorEngineDirective,
    FormRoutingProcessorEngineDirective, FormSimpleProcessorEngineDirective,
    ItemFunctionProcessorEngineDirective, ItemRoutingProcessorEngineDirective,

    DefaultValueDirective,
    SearchableItemControlComponent, SearchableArrayControlComponent,

    DialogOpenDirective,

    DataListComponent, DataViewComponent, DataFormComponent,
    DataListSelectedDirective,

    RoutingStateDirective,
  ],
  declarations: [
    EntryPipe,
    NavigationBackDirective, NavigationBackComponent,
    ActiveMediaDirective,
    FormControlHtmlErrorDirective,
    ItemNotFoundComponent,
    SearchTermComponent, PaginationComponent,
    SearchableControlComponent, ArraySourceControlComponent,
    FormControlErrorDirective,
    ItemDeleteConfirmComponent,
    RouterDividerComponent,
    ItemDataArrayComponent, ItemDataArrayItemComponent,
    ItemListComponent, ItemViewComponent, ItemEditComponent,

    ContextProcessorEngineDirective,
    FormRoutingProcessorEngineDirective, FormSimpleProcessorEngineDirective,
    ItemFunctionProcessorEngineDirective, ItemRoutingProcessorEngineDirective,

    DefaultValueDirective,
    SearchableItemControlComponent, SearchableArrayControlComponent,

    DialogOpenDirective,

    DataListComponent, DataViewComponent, DataFormComponent,
    DataListSelectedDirective,

    RoutingStateDirective,
  ],
  entryComponents: [ ItemDeleteConfirmComponent ],
  providers: [
    ProcessDescriptionService,
  ],
})
export class SharedModule { }
