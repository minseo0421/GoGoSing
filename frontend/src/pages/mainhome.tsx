import React from 'react';
import NavBar from '../components/navbar';
import { Link } from 'react-router-dom';

const MainHome: React.FC = () => {
    return (
      <div>
        <div style={{margin:'20px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <img src="assets/logo.png" alt="" style={{width:'20%'}}/>
          <Link style={{color:'white'}} to='/login'>Login</Link>        
        </div>
        <NavBar />
      </div>
    );
}
export default MainHome;
  