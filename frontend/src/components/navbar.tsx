import React from 'react';
import '../App.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/state';
import { setPage } from '../store/actions';

const NavBar: React.FC = () => {
    const isPage = useSelector((state: AppState) => state.isPage);
    const dispatch = useDispatch()

    const pagemove = (nextpage:number) => {
        if (isPage===nextpage) {
            return
        }
        else {
            dispatch(setPage(nextpage))
        }
    }
    return (
      <div className='Navbar'>
        <div className='icon'>
            <div onClick={()=>{pagemove(1)}}>
                1
            </div>
            <div onClick={()=>{pagemove(2)}}>
                2
            </div>
            <div onClick={()=>{pagemove(3)}}>
                3
            </div>
            <div onClick={()=>{pagemove(4)}}>
                4
            </div>

        </div>
      </div>
    );
}
export default NavBar;
  