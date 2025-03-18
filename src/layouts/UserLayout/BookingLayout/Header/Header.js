import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { BsTicketDetailed } from 'react-icons/bs';
import Account from '../../../../Components/Account/Account';
import ModalLogin from '../../../../Components/Modal/ModalLogin/ModalLogin';
import Language from '../../../../Components/Language/Language';

const cx = classNames.bind(styles);

function Header(props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <Link to={'/'} className={cx('logo')}>
                        <img src={images.logo} alt="logo" style={{ width: '180px', height: 'auto' }} />
                    </Link>
                    <div className={cx('items')}>
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
                {showModal && <ModalLogin setShowModal={setShowModal} />}
            </div>
        </>
    );
}

export default Header;
