import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './SideBar.module.scss';
import images from '../../../../assets/images';
import { FaUser } from 'react-icons/fa';
import { Calendar1, Ticket } from 'lucide-react';
import { getImageSrc } from '../../../../utils';
import { updateProfileItemActive } from '../../../../redux/action/eventAction';

const cx = classNames.bind(styles);

function Sidebar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.account);
    const profileItemActive = useSelector((state) => state.event.profileItemActive);
    const [active, setActive] = useState('');

    useEffect(() => {
        setActive(profileItemActive);
    }, [profileItemActive]);

    const handleClickSideBar = (item, link) => {
        dispatch(updateProfileItemActive(item));
        navigate(link);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user_account')}>
                <img src={getImageSrc(user.avatar) || images.avatar} alt="user_avatar" />
                <div className={cx('user_info')}>
                    <span>Tài khoản của</span>
                    <span className={cx('user_name')}>{user.username}</span>
                </div>
            </div>
            <div className={cx('list_item')}>
                <div
                    className={cx('item', 'custom_item', active === 'account' && 'active')}
                    onClick={() => handleClickSideBar('account', '/my-account/my-profile')}
                >
                    <div className="flex gap-[10px] items-center">
                        <FaUser size={22} />
                        <span>Cài đặt tài khoản</span>
                    </div>
                    <span className={cx('account_info')}>Thông tin tài khoản</span>
                </div>
                <div
                    className={cx('item', active === 'ticket' && 'active')}
                    onClick={() => handleClickSideBar('ticket', '/my-account/tickets')}
                >
                    <Ticket size={22} />
                    <span>Vé đã mua</span>
                </div>
                <div className={cx('item')} onClick={() => navigate('/organizer/events')}>
                    <Calendar1 size={22} />
                    <span>Sự kiện của tôi</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
