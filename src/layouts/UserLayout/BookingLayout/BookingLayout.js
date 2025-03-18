import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header/Header';

function BookingLayout(props) {
    return (
        <div className="">
            <Header />
            <Outlet />
        </div>
    );
}

export default BookingLayout;
