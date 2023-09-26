import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";


const SocialLogin: React.FC = () => {
    const navigate = useNavigate();

  useEffect(() => {
    // const xhr = new XMLHttpRequest();
    //     xhr.open('GET', '/sociallogin', true);

    //     xhr.onreadystatechange = function () {
    //     const headers = xhr.getAllResponseHeaders();
    //     console.log('응답 헤더 정보:', headers);
    //     //     if (xhr.readyState === 4 && xhr.status === 200) {
    //     // }
    //     };

    //     xhr.send();
    const fetchKakaoToken = async () => {
      const params = new URL(document.location.toString()).toJSON;
      console.log(params)
    };

    fetchKakaoToken();

  }, [navigate]);

  return (
    <></>
  );
};
export default SocialLogin;
