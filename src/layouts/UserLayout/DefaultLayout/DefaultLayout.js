import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer/Footer';
import Header from './Header/Header';

function DefaultLayout(props) {
    return (
        <div className="">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default DefaultLayout;
