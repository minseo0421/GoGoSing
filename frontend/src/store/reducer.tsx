import { AppState } from "./state";

const initialState: AppState = {
  isPage: 1,
  isModalOpen: null,
  isGenreSel: false,
  albumId: null,
};

const reducer = (
  state: AppState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, isPage: action.payload };
    case "SET_MODAL":
      return { ...state, isModalOpen: action.payload };
    case "SET_GENRE":
      return { ...state, isGenreSel: action.payload };
    case "SET_ALBUM":
      return { ...state, albumId: action.payload };
    default:
      return state;
  }
};
export default reducer;
