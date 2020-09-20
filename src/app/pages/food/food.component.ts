import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food.service';
import { AppState } from 'src/app/state/app.state';
import { LOADING } from 'src/app/state/appAction.action';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})

export class FoodComponent implements OnInit {
  displayedColumns: string[] = ['id', 'category', 'createAt', 'images', 'isDelete', 'status', 'action'];
  isLoading = false;
  actionEdit = {
    label: '⚒️',
    name: 'edit'
  };
  actionDelete = {
    label: '❌',
    name: 'remove'
  }
  dataFood = [];

  state = {
    isLoading: false
  }

  setState = (newState: any) => {
    this.state = { ...this.state, ...newState };
  }


  constructor(private store: Store<AppState>, private foodService: FoodService,private _snackBar: MatSnackBar, private snackBarService : SnackbarService) {
    store.subscribe({
      next : (state) => {
        if(this.isLoading !== state.appState.isLoading){
          this.isLoading = state.appState.isLoading;
        }
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  removeAction = (id, actionName) => {    
    console.log(id)

    if (actionName === 'remove') {
      this.store.dispatch(new LOADING())
      this.foodService.deleteFood(id).then(res => {
        this.refreshPage();
        // this.openSnackBar(`Xóa thành công một hàng hóa có tên là ${res.name}`,'success')
        this.snackBarService.show(` ( ✔ )  ${res.isDelete ? 'Khôi phục' : 'Xóa'} thành công một hàng hóa có tên là ${res.name}`,'success')
        console.log(res)
      })
    }
  }

  createNew = () => {
    const data = {}
    this.store.dispatch(new LOADING())
    this.foodService.createFood(data).then(res => {
      this.refreshPage();
      console.log(res)
    })
  }


  toggleTheme = (e) => {
    this.store.dispatch(new LOADING())
    this.foodService.deleteFood(e).then(res => {
      this.refreshPage();
      console.log(res)
    })

  }


  ngOnInit() {

    this.store.dispatch(new LOADING())
    setTimeout(() => this.refreshPage(), 0)
  }

  refreshPage = () => {

    this.foodService.findAllFoods().then(res => {
      this.dataFood = res;
      this.store.dispatch(new LOADING())
    }).catch(e => console.log(e))

  }



  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', },
  ];

  reloadData = () => {
    this.store.dispatch(new LOADING())
    setTimeout(() => {
      // this.setState({isLoading : false});
      this.store.dispatch(new LOADING())
    }, 2000)
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action?: any;
}


