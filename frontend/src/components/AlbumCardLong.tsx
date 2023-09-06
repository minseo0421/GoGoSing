import React from "react";

const AlbumCardLong: React.FC = () => {
  // isMain 프로퍼티도 구조 분해 할당으로 가져옴
  return (
    <div
      style={{
        width: `${(window.innerWidth * 9) / 10}px`,
        margin: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      안ㄴㄴㄴㄴㄴㄴㄴㄴㄴ녕
    </div>
  );
};

export default AlbumCardLong;
