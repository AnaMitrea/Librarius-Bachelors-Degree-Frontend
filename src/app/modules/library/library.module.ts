import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { SharedModule } from '../../shared/shared.module';
import { ReadingSectionComponent } from './components/reading-section/reading-section.component';
import { FlexModule } from 'ngx-flexible-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReadingOptionsTabComponent } from './components/reading-options-tab/reading-options-tab.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  declarations: [
    ContainerComponent,
    ReadingSectionComponent,
    BookViewerComponent,
    ReadingOptionsTabComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule,
    FlexModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ]
})
export class LibraryModule { }
