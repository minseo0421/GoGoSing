import React from "react";
import { Link } from "react-router-dom";

interface TopbarProps {
  show: boolean;
  isMain: boolean; // isMain 프로퍼티 추가
}

const Topbar: React.FC<TopbarProps> = ({ show, isMain }) => {
  // isMain 프로퍼티도 구조 분해 할당으로 가져옴
  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img src="assets/logo.png" alt="" style={{ width: "20%" }} />
      {show && isMain && (
        <Link style={{ color: "white" }} to="/login">
          Login
        </Link>
      )}
      {/* 필요하다면 isMain을 여기서 사용할 수 있습니다. */}
    </div>
  );
};

export default Topbar;
