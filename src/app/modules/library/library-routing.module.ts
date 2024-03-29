import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { ReadingSectionComponent } from './components/reading-section/reading-section.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { AuthorComponent } from "@app-modules/library/components/author/author.component";

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'author/:id',
        component: AuthorComponent
      },
      {
        path: 'book/:id',
        component: BookViewerComponent
      },
      {
        path: 'book/:id/read',
        component: ReadingSectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
