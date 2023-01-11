import React, { useEffect } from 'react';
import Header from './Header/Header';

import { Outlet } from 'react-router';


const BaseLayout = () => {
    useEffect(() => {
        document.title = "Kekcoon Inc."
    });
    return (
        
        <React.StrictMode>
            {/* <Navbar /> */}
            <Outlet />
            <Header />
     
        </React.StrictMode>
    )
};

export default BaseLayout;
