import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, PageUnderConstructionComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ],
  exports: [HeaderComponent, PageNotFoundComponent, PageUnderConstructionComponent]
})
export class LayoutModule { }
