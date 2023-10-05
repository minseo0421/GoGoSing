import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const SocialLogin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

  useEffect(() => {
    const fetchSocialToken = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const AccessToken = params.get('Authorization')

      if (AccessToken) {
        localStorage.setItem('AccessToken',AccessToken)
        localStorage.setItem('RefreshToken',params.get('Authorization-Refresh')!)

        if (params.get('user_role')==='guest') {navigate('/socialsignup')} 
        else {
          navigate('/')
        }
      }

      
    };

    fetchSocialToken();

  }, [navigate, dispatch]);

  return (
    <></>
  );
};
export default SocialLogin;
