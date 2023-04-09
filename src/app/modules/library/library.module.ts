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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContainerComponent,
    ReadingSectionComponent,
    BookViewerComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule,
    FlexModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ]
})
export class LibraryModule { }
