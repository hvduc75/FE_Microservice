import React from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import images from '../../../../assets/images';
import styles from './Sidebar.module.scss';
import { MdChair } from 'react-icons/md';
import { PiCalendarStarFill } from 'react-icons/pi';
import { FaFolder } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { SiGoogleanalytics } from 'react-icons/si';
import { FaUserGroup } from 'react-icons/fa6';
import { updateItemActive } from '../../../../redux/action/eventAction';
import { ArrowLeft, Pencil, CircleCheck, BadgeDollarSign } from 'lucide-react';

const cx = classNames.bind(styles);

function Sidebar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeItem = useSelector((state) => state.event.itemActive);
    const { changeSidebar, eventId } = props;
    
    const handleClickItem = (item, link) => {
        dispatch(updateItemActive(item));
        navigate(link);
    };

    return (
        <div className="menu-wrapper sticky top-0 h-full flex flex-col bg-[#19261f]">
            <Link to={'/organizer/events'} onClick={() => dispatch(updateItemActive('event'))}>
                <div className="flex flex-row items-center justify-center w-[250px] cursor-pointer h-[72px]">
                    <div className="border border-gray-200 rounded-[8px] overflow-hidden mr-3">
                        <img src={images.logoOrganizer} alt="logo" className="w-[32px] h-[32px]" />
                    </div>
                    <span className="text-lg font-bold text-[#32ba7a]">Organizer Center</span>
                </div>
            </Link>
            {!changeSidebar ? (
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
            ) : (
                <div className={cx('list-item')} style={{ marginTop: '72px', overflowY: 'auto' }}>
                    <div
                        style={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            zIndex: '1000',
                            width: '100%',
                            marginTop: '72px',
                        }}
                        className={cx('item', { active: activeItem === 'event' })}
                        onClick={() => navigate('/organizer/events')}
                    >
                        <ArrowLeft size={24} />
                        <span className={cx('title', 'font-bold', 'text-[14px]')}>Quản trị sự kiện</span>
                    </div>
                    <div className={cx('custom_item')}>Báo cáo</div>
                    <div
                        className={cx('item', { active: activeItem === 'summary' })}
                        onClick={() => handleClickItem('summary', `/organizer/events/${eventId}/summary-revenue`)}
                    >
                        <PiCalendarStarFill style={{ height: '20px', width: '20px' }} />
                        <span className={cx('title')}>Tổng kết</span>
                    </div>
                    <div
                        className={cx('item', { active: activeItem === 'analyst' })}
                        onClick={() => dispatch(updateItemActive('analyst'))}
                    >
                        <SiGoogleanalytics style={{ height: '20px', width: '20px' }} />
                        <span className={cx('title')}>Phân tích</span>
                    </div>
                    <div
                        className={cx('item', { active: activeItem === 'listOrder' })}
                        onClick={() => dispatch(updateItemActive('listOrder'))}
                    >
                        <LuNotebookText style={{ height: '20px', width: '20px' }} />
                        <span className={cx('title')}>Danh sách đơn hàng</span>
                    </div>
                    <div
                        className={cx('item', { active: activeItem === 'CheckIn' })}
                        onClick={() => dispatch(updateItemActive('CheckIn'))}
                    >
                        <CircleCheck size={20} />
                        <span className={cx('title')}>Check-in</span>
                    </div>
                    <div className={cx('custom_item')}>Cài đặt sự kiện</div>
                    <div
                        className={cx('item', { active: activeItem === 'member' })}
                        onClick={() => dispatch(updateItemActive('member'))}
                    >
                        <FaUserGroup style={{ height: '20px', width: '20px' }} />
                        <span className={cx('title')}>Thành viên</span>
                    </div>
                    <div
                        className={cx('item', { active: activeItem === 'edit' })}
                        onClick={() => handleClickItem('edit', `/organizer/events/${eventId}/edit`)}
                    >
                        <Pencil size={20} />
                        <span className={cx('title')}>Chỉnh sửa</span>
                    </div>
                    <div
                        className={cx('item', { active: activeItem === 'SeatMap' })}
                        onClick={() => dispatch(updateItemActive('SeatMap'))}
                    >
                        <MdChair style={{ width: '20px', height: '20px' }} />
                        <span className={cx('title')}>SeatMap</span>
                    </div>
                    <div className={cx('custom_item')}>Marketing</div>
                    <div
                        className={cx('item', { active: activeItem === 'Voucher' })}
                        onClick={() => dispatch(updateItemActive('Voucher'))}
                    >
                        <BadgeDollarSign size={20} />
                        <span className={cx('title')}>Voucher</span>
                    </div>
                </div>
            )}
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
