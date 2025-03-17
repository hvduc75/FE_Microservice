import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import 'tippy.js/dist/tippy.css';
import styles from './Account.module.scss';
import images from '../../assets/images';
import { UserLogoutSuccess } from '../../redux/action/userAction';
import { logout } from '../../service/authService';
import { LogOut, TicketMinus, CalendarPlus2, CircleUserRound } from 'lucide-react';
import { getImageSrc } from '../../utils';

const cx = classNames.bind(styles);

function Account(props) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const { setShowModal } = props;

    const handleLogout = async () => {
        localStorage.removeItem('isLogged');
        dispatch(UserLogoutSuccess());
        await logout();
    };

    const handlePageChange = (page) => {
        sessionStorage.removeItem('activeTab');
        sessionStorage.setItem('pageItem', page);
    };

    return (
        <div className={cx('wrapper')}>
            {!isAuthenticated ? (
                <div className={cx('auth')} onClick={() => setShowModal(true)}>
                    <span>Đăng nhập | Đăng ký</span>
                </div>
            ) : (
                <Tippy
                    interactive
                    // delay={[0, 700]}
                    offset={[0, 1]}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cx('account-content')} tabIndex="-1" {...attrs}>
                            <Link
                                to="/account/info"
                                onClick={() => handlePageChange('account-info')}
                                className={cx('menu-item')}
                            >
                                <TicketMinus size={22} className='mr-2' />
                                Vé đã mua
                            </Link>
                            <Link
                                to="/order/history"
                                onClick={() => handlePageChange('order-history')}
                                className={cx('menu-item')}
                            >
                                <CalendarPlus2 size={22} className='mr-2'/>
                                Sự kiện của tôi
                            </Link>
                            <Link to="/help-center" className={cx('menu-item')}>
                                <CircleUserRound size={22} className='mr-2'/>
                                Tài khoản của tôi
                            </Link>
                            <div
                                onClick={() => {
                                    handleLogout();
                                }}
                                className={cx('menu-item')}
                            >
                                <LogOut size={22} className='mr-2' />
                                Đăng xuất
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('user')}>
                        <div className={cx('user_info')}>
                            <img src={images.avatar} style={{ width: '24px', height: '24px' }} alt="avatar" />
                            Tài khoản
                            <img src={images.dropdown} style={{ width: '8px', height: '8px' }} alt="dropdown-icon" />
                        </div>
                    </div>
                </Tippy>
            )}
        </div>
    );
}

export default Account;
