import { AppState } from './state';

const initialState: AppState = {
    isModalOpen : null,
    isGenreSel : false,
    isLogin:false,
};

const reducer = (state: AppState = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_MODAL':
      return {...state, isModalOpen: action.payload}
    case 'SET_GENRE':
      return {...state, isGenreSel: action.payload}
    case 'SET_LOGIN':
      return {...state, isLogin: action.payload}
    default:
      return state;
  }
};

export default reducer;