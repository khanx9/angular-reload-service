import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud';
  isLoading = false;
  constructor(public store : Store<AppState>){
    store.subscribe({
      next : (state) => {
        if(this.isLoading !== state.appState.isLoading){
          this.isLoading = !this.isLoading;
        }
      }
    })
  }
}
