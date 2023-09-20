import { AppState } from './state';

const initialState: AppState = {
    isPage : 1,
};

const reducer = (state: AppState = initialState, action: { type: string; payload: number }) => {
  switch (action.type) {
    case 'SET_PAGE':
      if (state.isPage===action.payload) {
        return {...state, isPage: action.payload}
        ;}
      else {return {...state, isPage: action.payload,}}
          
    default:
      return state;
  }
};

export default reducer;