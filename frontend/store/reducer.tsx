import { AppState } from "./state";

const initialState: AppState = {
isModalOpen : null,
isGenreSel : false,
isLogin:null,
  album: {
    id: 1,
    title: "",
    singer: "",
    image: null,
    url: "",
    lyrics: "",
  },
};

const reducer = (
  state: AppState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_MODAL":
      return { ...state, isModalOpen: action.payload };
    case "SET_GENRE":
      return { ...state, isGenreSel: action.payload };
    case "SET_LOGIN":
      return { ...state, isLogin: action.payload };
    case "SELECT_ALBUM":
      return { ...state, album: action.payload };
    default:
      return state;
  }
};

export default reducer;
