import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDataPageRoutingModule } from './movie-data-routing.module';

import { MovieDataPage } from './movie-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDataPageRoutingModule
  ],
  declarations: [MovieDataPage]
})
export class MovieDataPageModule {}
