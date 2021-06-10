import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food.service';
import { AppState } from 'src/app/state/app.state';
import { LOADING } from 'src/app/state/appAction.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-food-detail',
  template:`<p>Hello from food detail {{name}}</p>`
})

export class FoodDetailComponent implements OnInit {

    name : string
    constructor(private router : Router,public location : Location) {
        console.log('init food detail component');
    }
    ngOnInit() {
        console.log(history.state.value)
        this.name = history.state.value
    }
}


