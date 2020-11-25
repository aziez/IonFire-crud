import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KaryawanPageRoutingModule } from './karyawan-routing.module';

import { KaryawanPage } from './karyawan.page';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    KaryawanPageRoutingModule
  ],
  declarations: [KaryawanPage]
})
export class KaryawanPageModule {}
