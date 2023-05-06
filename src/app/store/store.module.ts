import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";

import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import {LOGGER_CONFIG, STATES_MODULES} from "@app-store/store.config";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot(STATES_MODULES),
    NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
    NgxsStoragePluginModule.forRoot({
      key: ['sharedUserState']
    }),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class StoreModule { }
