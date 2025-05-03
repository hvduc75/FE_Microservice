import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import 'tippy.js/dist/tippy.css';
import styles from './Account.module.scss';
import images from '../../assets/images';
import { UserLogoutSuccess } from '../../redux/action/userAction';
import { updateItemActive, updateProfileItemActive } from '../../redux/action/eventAction';
import { logout } from '../../service/authService';
import { LogOut, TicketMinus, CalendarPlus2, CircleUserRound } from 'lucide-react';
import { getImageSrc } from '../../utils';

const cx = classNames.bind(styles);

function Account(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('home');
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user.account);
    const { setShowModal } = props;

    const handleLogout = async () => {
        await logout();
        dispatch(UserLogoutSuccess());
    };

    const handleClickMyEvents = () => {
        dispatch(updateItemActive('event'));
        navigate('/organizer/events');
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
                    offset={[0, 1]}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cx('account-content')} tabIndex="-1" {...attrs}>
                            <Link
                                to="/my-account/tickets"
                                onClick={() => dispatch(updateProfileItemActive('ticket'))}
                                className={cx('menu-item')}
                            >
                                <TicketMinus size={22} className="mr-2" />
                                {t('header.ticket')}
                            </Link>
                            <div onClick={() => handleClickMyEvents()} className={cx('menu-item')}>
                                <CalendarPlus2 size={22} className="mr-2" />
                                {t('header.myEvents')}
                            </div>
                            <Link
                                to="/my-account/my-profile"
                                onClick={() => dispatch(updateProfileItemActive('account'))}
                                className={cx('menu-item')}
                            >
                                <CircleUserRound size={22} className="mr-2" />
                                {t('header.myAccount')}
                            </Link>
                            <div
                                onClick={() => {
                                    handleLogout();
                                }}
                                className={cx('menu-item')}
                            >
                                <LogOut size={22} className="mr-2" />
                                {t('header.logout')}
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('user')}>
                        <div className={cx('user_info')}>
                            <img
                                src={getImageSrc(user.avatar) || images.avatar}
                                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                                alt="avatar"
                            />
                            {t('header.account')}
                            <img src={images.dropdown} style={{ width: '8px', height: '8px' }} alt="dropdown-icon" />
                        </div>
                    </div>
                </Tippy>
            )}
        </div>
    );
}

export default Account;
