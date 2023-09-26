import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/actions";


const SocialLogin: React.FC = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchSocialToken = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const AccessToken = params.get('Authorization')
      localStorage.setItem('AccessToken',AccessToken!)
      localStorage.setItem('RefreshToken',params.get('Authorization-Refresh')!)

      if (params.get('user_role')==='guest') {
        navigate('/socialsignup')
      } else {
        axiosInstance({
          method:'get',
          url:`${process.env.REACT_APP_API_URL}/user/detail`,
          headers:{
            Authorization: 'Bearer ' + AccessToken,
          }
        }).then(res=>{
          console.log(res)
          dispatch(setLogin(res.data))
          navigate('/')
        }).catch(err=>{
          console.log(err)
        })
      }
    };

    fetchSocialToken();

  }, [navigate, dispatch]);

  return (
    <></>
  );
};
export default SocialLogin;
