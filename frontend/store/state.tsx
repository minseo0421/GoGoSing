export interface AppState {
  isModalOpen: string | null;
  isGenreSel: boolean;
  isLogin: boolean;
  album: {
    id: number;
    title: string;
    singer: string;
    image: any;
    url: string;
    lyrics: string;
  };
}
