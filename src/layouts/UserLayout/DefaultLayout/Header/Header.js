import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { BsTicketDetailed } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import ModalLogin from '../../../../Components/Modal/ModalLogin';

const cx = classNames.bind(styles);

function Header(props) {
    const [showModal, setShowModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();

    const handleAddEvent = () => {
        navigate('/organizer');
    };

    return (
        <p>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <Link to={'/'} className={cx('logo')}>
                        <img src={images.logo} alt="logo" style={{ width: '180px', height: 'auto' }} />
                    </Link>
                    <div className={cx('items')}>
                        <div className={cx('group_left')}>
                            <div className={cx('group_search')}>
                                <span style={{ color: '#868e99' }}>
                                    <IoSearch style={{ width: '24px', height: '24px' }} />
                                </span>
                                <input type="text" placeholder="Bạn tìm gì hôm nay?" />
                                <button>Tìm kiếm</button>
                            </div>
                            <div className={cx('add_event')} onClick={() => handleAddEvent()}>
                                Tạo sự kiện
                            </div>
                        </div>
                        <div className={cx('group_right')}>
                            <div className={cx('ticket_buy')}>
                                <Link>
                                    <BsTicketDetailed style={{ width: '24px', height: '24px' }} />
                                    <span>Vé đã mua</span>
                                </Link>
                            </div>
                            {!isAuthenticated ? (
                                <div className={cx('auth')} onClick={() => setShowModal(true)}>
                                    <span>Đăng nhập | Đăng ký</span>
                                </div>
                            ) : (
                                <div className={cx('user')}>
                                    <div className={cx('user_info')}>
                                        <img src={images.avatar} style={{width: "24px", height: "24px"}} alt='avatar'/>
                                        Tài khoản
                                        <img src={images.dropdown} style={{width: "8px", height: "8px"}} alt='dropdown-icon'/>
                                    </div>
                                </div>
                            )}
                            <div className={cx('location')}>
                                <div className={cx('languages')}>
                                    <div className={cx('flag-icon-container')}>
                                        <img src={images.flag_vn} alt='flag_vn'/>
                                    </div>
                                    <img src={images.dropdown} style={{width: "8px", height: "8px", marginLeft: "8px"}} alt='dropdown-icon'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <ModalLogin setShowModal={setShowModal} />}
        </p>
    );
}

export default Header;
