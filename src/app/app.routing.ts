import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  }, {
    path: '',
    component: MainLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/main-layout/main-layout.module').then(m => m.MainLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
