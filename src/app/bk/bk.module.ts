import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BkRoutingModule } from './bk-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BkRoutingModule,
    HttpClientModule,
    RouterModule
  ]
})
export class BkModule { }
