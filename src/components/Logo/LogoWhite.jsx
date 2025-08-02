import React from 'react';
import coinLeafWhite from '../../assets/logo/coinLeafWhite.png'
import { Link } from 'react-router';


const LogoWhite = () => {
    return (
        <>
            <Link to="/">
                <img className='w-40' src={coinLeafWhite} alt="" />
            </Link>
        </>
    );
};

export default LogoWhite;