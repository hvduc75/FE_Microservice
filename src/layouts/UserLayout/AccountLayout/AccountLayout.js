import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './AccountLayout.module.scss';
import Header from '../DefaultLayout/Header/Header';
import Footer from '../DefaultLayout/Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import { ChevronRight } from 'lucide-react';

const cx = classNames.bind(styles);

function AccountLayout(props) {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('tbox-container')}>
                    <div className={cx('header')}>
                        <span onClick={() => navigate("/")}>Trang chủ</span>
                        <ChevronRight size={14} color="rgb(166, 166, 176)" />
                        <span>cài đặt tài khoản</span>
                        <ChevronRight size={14} color="rgb(166, 166, 176)" />
                        <span className={cx('active')}>Thông tin tài khoản</span>
                    </div>
                    <div className={cx('content')}>
                        <Sidebar />
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccountLayout;
