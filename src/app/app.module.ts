import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { I3eModule } from '@i3e';

// in momory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataStub } from './data.stub';

import { SharedModule } from './shared';
import { CoreModule } from './core';
import { CustomModule } from './custom';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentInfoService } from './shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    // in momory web api
    InMemoryWebApiModule.forRoot(DataStub, {
      delay: 300,
      apiBase: 'api/',
    }),
    ReactiveFormsModule,
    FlexLayoutModule,
    I3eModule.forRoot(),
    SharedModule,
    CoreModule.forRoot({
      REST_SERVER_CONFIG: {
        default: {
          host: '',
          path: 'api/'
        }
      }
    }),
    CustomModule.forRoot(),
    AppMaterialModule,
    AppRoutingModule,
  ],
  providers: [
    ComponentInfoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
