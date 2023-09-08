import React, { useEffect } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";

const MusicLike: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(4));
  }, [dispatch]);
  return (
    <div>
      <h1>MusicLike 입니당</h1>
    </div>
  );
};
export default MusicLike;
