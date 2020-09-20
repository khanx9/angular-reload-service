import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
