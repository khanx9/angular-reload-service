import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodDetailComponent } from './pages/food-detail/food-detail.component';
import { FoodComponent } from './pages/food/food.component';


const routes: Routes = [
  {
    path : '',
    redirectTo : 'food',
    pathMatch : 'full'
  },
  {
    path : 'food',
    component : FoodComponent
  },
  {
    path : 'food-detail/:id',
    component : FoodDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
