export interface AppState {
  isPage: number;
  // 모달 오픈 (로그인 , 마이페이지, 음악 상세정보)
  isModalOpen: string | null;
  // 장르 설문 (마이페이지에서 설문 접근이 가능해서 따로해야함)
  isGenreSel: boolean;

  albumId:number|null;

  likelist:number[]|null;
}
