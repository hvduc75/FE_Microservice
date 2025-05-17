import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { BsTicketDetailed } from 'react-icons/bs';
import ModalLogin from '../../../../Components/Modal/ModalLogin/ModalLogin';
import Account from '../../../../Components/Account/Account';
import Language from '../../../../Components/Language/Language';
import { updateProfileItemActive } from '../../../../redux/action/eventAction';
import Search from '../../../../Components/Search/Search';

const cx = classNames.bind(styles);
// const contents = ['Nhạc sống', 'Sân khấu & Nghệ thuật', 'Thể Thao', 'Khác'];

function Header(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation('home');
    const contents = t('header.contents', { returnObjects: true });
    const isHomePage = location.pathname === '/' || location.pathname.startsWith('/event-detail');
    const [showModal, setShowModal] = useState(false);

    const handleAddEvent = () => {
        window.open('/organizer/create-event', '_blank');
    };

    const handleSearchByCategory = (content) => {
        if (content === 'Nhạc sống') {
            navigate('/search?category=music');
        } else if (content === 'Sân khấu & Nghệ thuật') {
            navigate('/search?category=theatersandart');    
        } else if (content === 'Thể Thao') {
            navigate('/search?category=sport');
        } else if (content === 'Khác') {
            navigate('/search?category=others');
        }
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
                            {/* <div className={cx('group_search')}>
                                <span style={{ color: '#868e99' }}>
                                    <IoSearch style={{ width: '24px', height: '24px' }} />
                                </span>
                                <input type="text" placeholder={t("header.search.placeholder")} />
                                <button>{t("header.search.button")}</button>
                            </div> */}
                            <Search />
                            <div className={cx('add_event')} onClick={() => handleAddEvent()}>
                                {t('header.event')}
                            </div>
                        </div>
                        <div className={cx('group_right')}>
                            <div className={cx('ticket_buy')}>
                                <Link
                                    to="/my-account/tickets"
                                    onClick={() => dispatch(updateProfileItemActive('ticket'))}
                                >
                                    <BsTicketDetailed style={{ width: '24px', height: '24px' }} />
                                    <span>{t('header.ticket')}</span>
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
                                <div
                                    className={cx('content')}
                                    key={index}
                                    onClick={() => handleSearchByCategory(content)}
                                >
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
