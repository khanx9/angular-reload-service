import { Action } from '@ngrx/store';


export enum ActionTypes {
    isLoading = '[App] App Loading'
}

export class LOADING implements Action {
  readonly type = ActionTypes.isLoading;
}

