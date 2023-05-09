import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { SharedModule } from '@app-shared/shared.module';
import { ReadingSectionComponent } from './components/reading-section/reading-section.component';
import { FlexModule } from 'ngx-flexible-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReadingOptionsTabComponent } from './components/reading-options-tab/reading-options-tab.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { BookmarkDialogComponent } from './components/reading-section/components/bookmark-dialog/bookmark-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    ContainerComponent,
    ReadingSectionComponent,
    BookViewerComponent,
    ReadingOptionsTabComponent,
    BookmarkDialogComponent
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
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class LibraryModule { }
