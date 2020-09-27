import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodService } from './services/food.service';
import { FoodComponent } from './pages/food/food.component';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { rootReducers } from './state/rootReducer.root';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './pages/snackbar/snackbar.service';
import {Snackbar} from '../app/pages/snackbar/snackbar.component';
import { FoodDetailComponent } from './pages/food-detail/food-detail.component';
import { ButtonComponent } from './pages/button/button.component';

const globalStateManagement = {};

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    Snackbar,
    FoodDetailComponent,
    ButtonComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { ...rootReducers },
      {
        initialState: globalStateManagement,
      }
    ),
    
  ],
  providers: [FoodService,SnackbarService,History],
  bootstrap: [AppComponent]
})
export class AppModule { }
