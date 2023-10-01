export interface AppState {
  isPage: number;
  // 모달 오픈 (로그인 , 마이페이지, 음악 상세정보)
  isModalOpen: string | null;
  // 장르 설문 (마이페이지에서 설문 접근이 가능해서 따로해야함)
  isGenreSel: boolean;

  // 로그인 성공시 유저 정보
  isLogin: {
    socialType: string;
    nickname: string;
    gender: string;
    birth: string;
    profileImg: string | null;
  } | null;

  albumId:number|null;
}
