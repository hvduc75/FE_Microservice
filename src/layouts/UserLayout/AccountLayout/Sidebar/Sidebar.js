import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './SideBar.module.scss';
import images from '../../../../assets/images';
import { FaUser } from 'react-icons/fa';
import { Calendar1, Ticket  } from 'lucide-react';

const cx = classNames.bind(styles);

function Sidebar(props) {
    const navigate = useNavigate();
    const [active, setActive] = useState('')

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user_account')}>
                <img src={images.avatar} alt="user_avatar" />
                <div className={cx('user_info')}>
                    <span>Tài khoản của</span>
                    <span className={cx('user_name')}>ducsaga</span>
                </div>
            </div>
            <div className={cx('list_item')}>
                <div className={cx('item','custom_item', active === 'account' && 'active')} onClick={() => setActive('account')}>
                    <div className='flex gap-[10px] items-center'>
                        <FaUser size={22}/>
                        <span>Cài đặt tài khoản</span>
                    </div>
                    <span className={cx('account_info')}>Thông tin tài khoản</span>
                </div>
                <div className={cx('item', active === 'ticket' && 'active')} onClick={() => setActive('ticket')}>
                    <Ticket  size={22}/>
                    <span>Vé đã mua</span>
                </div>
                <div className={cx('item')} onClick={() => navigate('/organizer/events')}>
                    <Calendar1 size={22}/>
                    <span>Sự kiện của tôi</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
