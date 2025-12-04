import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
  CommonModule,
  SettingsRoutingModule,
  MatCardModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule
]

})
export class SettingsModule { }
