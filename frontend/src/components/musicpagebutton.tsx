import React from 'react';
// import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import MusicPlay from '../components/musicrecord/musicplay';

const MusicPageButton: React.FC = () => {
    const buttonStyle: React.CSSProperties = {
        position: 'absolute',
        width: '158px',
        height: '58px',
        left: '201px',
        top: '623px',
        background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',
        borderRadius: '50px',
        border: 'none', // Optional: Remove button border
        color: '#fff', // Optional: Text color
        cursor: 'pointer',
      };
    
      return (
        <button style={buttonStyle}>
          Click Me
        </button>
      );
}
export default MusicPageButton;