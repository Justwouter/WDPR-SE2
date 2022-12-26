import React, { useEffect } from 'react';
import Footer from './Footer/Footer';

import { Outlet } from 'react-router';


const BaseLayout = () => {
    useEffect(() => {
        document.title = "Kekcoon Inc."
    });
    return (
        
        <React.StrictMode>
            {/* <Navbar /> */}
            <Outlet />
            <Footer />
        </React.StrictMode>
    )
};

export default BaseLayout;
