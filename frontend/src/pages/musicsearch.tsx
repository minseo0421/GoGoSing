import React, { useEffect } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";

const MusicSearch: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(3));
  }, [dispatch]);
  return (
    <div>
      <h1>MusicSearch 입니당</h1>
    </div>
  );
};
export default MusicSearch;
