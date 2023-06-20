import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { SharedModule } from '@app-shared/shared.module';
import { ReadingSectionComponent } from './components/reading-section/reading-section.component';
import { FlexModule } from 'ngx-flexible-layout';
import {QRCodeModule} from "angularx-qrcode";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReadingOptionsTabComponent } from './components/reading-options-tab/reading-options-tab.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ReviewsSectionComponent } from './components/book-viewer/components/reviews-section/reviews-section.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRadioModule} from "@angular/material/radio";
import { StarRatingComponent } from './components/book-viewer/components/star-rating/star-rating.component';
import { AuthorComponent } from './components/author/author.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import { ReadingProgressComponent } from './components/reading-section/components/reading-progress/reading-progress.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    ContainerComponent,
    ReadingSectionComponent,
    BookViewerComponent,
    ReadingOptionsTabComponent,
    ReviewsSectionComponent,
    StarRatingComponent,
    AuthorComponent,
    ReadingProgressComponent
  ],
    imports: [
        QRCodeModule,
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
        MatInputModule,
        MatTooltipModule,
        MatRadioModule,
        MatChipsModule,
        MatCardModule,
        MatProgressBarModule
    ]
})
export class LibraryModule { }
