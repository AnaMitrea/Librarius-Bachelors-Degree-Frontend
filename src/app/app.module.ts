import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {StoreModule} from "@app-store/store.module";
import { SharedModule } from "./shared/shared.module";
import { AuthInterceptorProvider, CacheRequestProvider } from "@app-core/interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    StoreModule
  ],
  providers: [
    AuthInterceptorProvider,
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    CacheRequestProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
