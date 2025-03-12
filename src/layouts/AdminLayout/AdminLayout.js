import React from 'react';
import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdminLayout(props) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <SideBar />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="h-full overflow-y-auto">
                    <div className="container px-6 mx-auto grid">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
