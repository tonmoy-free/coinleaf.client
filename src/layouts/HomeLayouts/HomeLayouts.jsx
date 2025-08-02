import React, { useEffect } from 'react';
import Navbar from '../../components/Home/Navbar';
import { Outlet } from 'react-router';
import FooterOne from '../../components/Footer/FooterOne';

const HomeLayouts = () => {
    
    return (
        <div className='dark:bg-black'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <FooterOne></FooterOne>
        </div>
    );
};

export default HomeLayouts;