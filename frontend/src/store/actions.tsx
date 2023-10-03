export const setPage = (value: number) => ({
  type: "SET_PAGE",
  payload: value,
});
export const setModal = (value: string | null) => ({
  type: "SET_MODAL",
  payload: value,
});
export const setGenreSel = (value: boolean) => ({
  type: "SET_GENRE",
  payload: value,
});
export const setAlbum = (value: number|null) => ({
  type: "SET_ALBUM",
  payload: value,
});
