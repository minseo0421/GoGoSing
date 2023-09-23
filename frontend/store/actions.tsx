export const setModal = (value: string|null) => ({
  type: "SET_MODAL",
  payload: value,
});
export const setGenreSel = (value: boolean) => ({
  type: "SET_GENRE",
  payload: value,
});
export const setLogin = (value: boolean) => ({
  type: "SET_LOGIN",
  payload: value,
});