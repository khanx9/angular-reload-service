import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food.service';
import { AppState } from 'src/app/state/app.state';
import { LOADING } from 'src/app/state/appAction.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar/snackbar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})

export class FoodComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['id', 'category', 'createAt', 'images', 'isDelete', 'status', 'action'];

  mySubscription: any;
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


  constructor(private store: Store<AppState>, private foodService: FoodService, private _snackBar: MatSnackBar, private snackBarService: SnackbarService, public router: Router) {
    console.log('init food component')
    store.subscribe({
      next: (state) => {
        if (this.isLoading !== state.appState.isLoading) {
          this.isLoading = state.appState.isLoading;
        }
      }
    })


    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        router.navigated = false;
      }
    });
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
        this.snackBarService.show(` ( ✔ )  ${res.isDelete ? 'Khôi phục' : 'Xóa'} thành công một hàng hóa có tên là ${res.name}`, 'success')
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

  onClick = (id, name) => {
    this.router.navigate(['/food-detail/'+id, ], {
      
      state : {
        value : name
      }
    })
  }

  update(value) {
    console.log(value)
    if(value) {
      this.router.navigate([this.router.url]);
    }
  }


  ngOnInit() {

    this.store.dispatch(new LOADING())
    setTimeout(() => this.refreshPage(), 0)
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      console.log('d')
      this.mySubscription.unsubscribe();
    }
  }

  refreshPage = () => {

    this.foodService.findAllFoods().then(res => {
      this.dataFood = res;
      this.store.dispatch(new LOADING())
    }).catch(e => console.log(e))


  }

  reloadData = () => {
    this.router.navigate([this.router.url]);
  }

}



