import React, { useEffect } from "react";
import MainContainer from "../components/MainContainer/MainContainer";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";

const MainHome: React.FC = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch]);

  return <MainContainer></MainContainer>;
};
export default MainHome;
