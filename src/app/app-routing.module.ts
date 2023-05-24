import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsAuthenticatedGuard} from "@app-core/guard/is-authenticated/is-authenticated.guard";
const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () => import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'home',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'library',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./modules/library/library.module').then((m) => m.LibraryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
