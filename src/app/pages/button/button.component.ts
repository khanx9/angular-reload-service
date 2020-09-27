import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food.service';
import { AppState } from 'src/app/state/app.state';
import { LOADING } from 'src/app/state/appAction.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-button',
  template:`<button (click)="reload()">Reload</button>`
})

export class ButtonComponent implements OnInit {

    name : string
    @Output() forceUpdate = new EventEmitter();
    constructor(private router : Router,public location : Location) {
        console.log('init button component')
    }
    ngOnInit() {
        console.log(history.state.value)
        this.name = history.state.value
    }

    reload() {
        console.log('dô')
        this.forceUpdate.emit(true)
    }
}


