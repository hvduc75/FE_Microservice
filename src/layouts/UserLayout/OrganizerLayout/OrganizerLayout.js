import React from 'react';
import classNames from 'classnames/bind';

import style from './OrganizerLayout.module.scss';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(style);

function OrganizerLayout(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}><Sidebar /></div>
            <div className={cx('content')}>
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default OrganizerLayout;