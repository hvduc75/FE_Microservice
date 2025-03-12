import React, { useState } from 'react';
import classNames from 'classnames/bind';

import style from './OrganizerLayout.module.scss';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(style);

function OrganizerLayout(props) {
    const [changeSidebar, setChangeSidebar] = useState(false);
    const [eventId, setEventId] = useState('');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar changeSidebar={changeSidebar} eventId={eventId} />
            </div>
            <div className={cx('content')}>
                <Header />
                <div className="mt-[64px]">
                    <Outlet context={{ setChangeSidebar, setEventId }} />
                </div>
            </div>
        </div>
    );
}

export default OrganizerLayout;
