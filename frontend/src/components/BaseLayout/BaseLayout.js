import React, { useEffect } from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router';


const BaseLayout = () => {
    useEffect(() => {
        document.title = "Kekcoon Inc."
    });
    return (

        <React.StrictMode>
            {/* {window.innerWidth > 1200 ? <Header/> : <HeaderMobile/>} */}
            <Header />
            <Outlet />
        </React.StrictMode>
    )
};

export default BaseLayout;
