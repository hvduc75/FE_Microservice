import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { BsTicketDetailed } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import ModalLogin from '../../../../Components/Modal/ModalLogin/ModalLogin';
import Account from '../../../../Components/Account/Account';
import Language from '../../../../Components/Language/Language';

const cx = classNames.bind(styles);
const contents = ["Nhạc sống", "Sân khấu & Nghệ thuật", "Thể Thao", "Khác"];

function Header(props) {
    const location = useLocation();
    const isHomePage = location.pathname === '/' || location.pathname.startsWith('/event-detail');
    const [showModal, setShowModal] = useState(false);

    const handleAddEvent = () => {
        window.open('/organizer/create-event', '_blank');
    };

    return (
        <>
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
                            <Account setShowModal={setShowModal} />
                            <Language />
                        </div>
                    </div>
                </div>
            </div>
            {isHomePage && (
                <div className={cx('event_type')}>
                    <div className={cx('tbox-container')}>
                        <div className={cx('categories_content')}>
                            {contents.map((content, index) => (
                                <div className={cx('content')} key={index}>
                                    <span>{content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {showModal && <ModalLogin setShowModal={setShowModal} />}
        </>
    );
}

export default Header;
