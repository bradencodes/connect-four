import React from 'react';
import logo from '../assets/logo.svg';

const Header = (props) => {
    return (
        <div className='header-container' >
            <img className='logo' src={logo} alt='logo' />
        </div>
    )
}

export default Header;