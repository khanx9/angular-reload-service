import * as appAction from './appAction.action';
const initialState = {
    isLoading : false
}

export const appReducer = (state = initialState,action : any) => {
    // console.log(`[Action ${action.type}] | payload : ${action.payload} | currentState : ${state}`)
    switch(action.type) {
        case appAction.ActionTypes.isLoading:
            console.log(`[Action ${action.type}] | payload : ${action.payload} | currentState : ${JSON.stringify(state)}`)
            return {
                ...state,
                isLoading : !state.isLoading
            }
        default : 
        return state;
    }
    
}