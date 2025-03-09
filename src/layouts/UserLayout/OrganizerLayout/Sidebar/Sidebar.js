import React from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import images from '../../../../assets/images';
import styles from './Sidebar.module.scss';
import { PiCalendarStarFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { updateItemActive } from '../../../../redux/action/eventAction';

const cx = classNames.bind(styles);

function Sidebar(props) {
    const dispatch = useDispatch();
    const activeItem = useSelector((state) => state.event.itemActive);

    return (
        <div className="menu-wrapper sticky top-0 h-full flex flex-col bg-[#19261f]">
            <Link to={'/organizer/events'} onClick={() => dispatch(updateItemActive('event'))}>
                <div className="flex flex-row items-center justify-center w-full cursor-pointer h-[72px]">
                    <div className="border border-gray-200 rounded-[8px] overflow-hidden mr-3">
                        <img src={images.logoOrganizer} alt="logo" className="w-[32px] h-[32px]" />
                    </div>
                    <span className="text-lg font-bold text-[#32ba7a]">Organizer Center</span>
                </div>
            </Link>
            <div className={cx('list-item')}>
                <Link to={'/organizer/events'}>
                    <div
                        className={cx('item', { active: activeItem === 'event' })}
                        onClick={() => dispatch(updateItemActive('event'))}
                    >
                        <PiCalendarStarFill style={{ height: '24px', width: '24px' }} />
                        <span className={cx('title')}>Sự kiện của tôi</span>
                    </div>
                </Link>
                <Link to={'/organizer/report'}>
                    <div
                        className={cx('item', { active: activeItem === 'report' })}
                        onClick={() => dispatch(updateItemActive('report'))}
                    >
                        <FaFolder style={{ height: '24px', width: '24px' }} />
                        <span className={cx('title')}>Quản lý báo cáo</span>
                    </div>
                </Link>
                <Link to={'/organizer/term-of-use'}>
                    <div
                        className={cx('item', { active: activeItem === 'law' })}
                        onClick={() => dispatch(updateItemActive('law'))}
                    >
                        <LuNotebookText style={{ height: '24px', width: '24px' }} />
                        <span className={cx('title')}>Điều khoản cho ban tổ chức</span>
                    </div>
                </Link>
            </div>
            <div className="flex-shrink-0 flex flex-row justify-between p-4">
                <p className="text-[#fff]">Ngôn ngữ</p>
                <div className="relative flex items-center w-20 h-8 bg-gray-600 rounded-full cursor-pointer p-2">
                    <div className="absolute right-3 w-7 rounded-full bg-center bg-cover">
                        <img src={images.flag_vn} alt="flag" className="w-6 h-6 object-cover rounded-full" />
                    </div>
                    <span className="absolute left-2 text-white transition-opacity duration-300 opacity-100">Vie</span>
                    <span className="absolute right-2 text-white transition-opacity duration-300 opacity-0">Eng</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
