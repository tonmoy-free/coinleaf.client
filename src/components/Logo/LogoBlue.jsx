import React from 'react';
import coinLeafBlue from '../../assets/logo/coinLeafBlue.png'
import { Link } from 'react-router';


const LogoBlue = () => {
    return (
        <>
            <Link to="/">
                <img className='w-40' src={coinLeafBlue} alt="" />
            </Link>
        </>
    );
};

export default LogoBlue;