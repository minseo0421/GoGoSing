import React from "react";
import { View } from "react-native";

import { useSelector } from "react-redux";
import { AppState } from "../../store/state";
import LoginModal from "../pages/loginmodal";
import MyPage from "../pages/accounts/mypage";
import GenreSelect from "../pages/genreselect";
import MusicDetail from "../pages/musicDetail";

const ModalOpen = () => {
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);
  const isGenreSel = useSelector((state: AppState) => state.isGenreSel);
  return (
    <View>
      {isModalOpen === "login" ? (
        <LoginModal />
      ) : isModalOpen === "mypage" ? (
        <MyPage />
      ) : isModalOpen === "musicDetail" ? (
        <MusicDetail />
      ) : null}
      {isGenreSel && <GenreSelect />}
    </View>
  );
};

export default ModalOpen;
