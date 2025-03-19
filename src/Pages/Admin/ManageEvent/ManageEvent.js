import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getEventByCondition } from '../../../service/eventService';
import { updateItemActive } from '../../../redux/action/eventAction';
import { getImageSrc } from '../../../utils';
import styles from './ManageEvent.module.scss';
import { IoSearch } from 'react-icons/io5';
import { FaCalendar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { RiUserFill } from 'react-icons/ri';
import { HiPencil } from 'react-icons/hi2';
import { MdChair } from 'react-icons/md';
import { LiaAtomSolid } from 'react-icons/lia';
import { CgNotes } from 'react-icons/cg';

const cx = classNames.bind(styles);

function ManageEvent(props) {
    const LIMIT = 5;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [listEvent, setListEvent] = useState([]);

    useEffect(() => {
        fetchEventByCondition(1);
    }, [page]);

    const fetchEventByCondition = async (condition) => {
        const data = await getEventByCondition(condition, page, LIMIT);
        if (data.EC === 0) {
            setListEvent(data.DT.events);
        }
    };

    const handleEditEvent = () => {
        dispatch(updateItemActive(''));
    };

    return (
        <div className="p-6 relative">
            <div className="flex flex-row w-full gap-6">
                <div className="w-full xl:w-[78%]">
                    <div className={cx('header')}>
                        <div className={cx('group_search')}>
                            <span style={{ color: '#868e99' }}>
                                <IoSearch
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        color: 'black',
                                    }}
                                />
                            </span>
                            <input type="text" placeholder="Tìm kiếm sự kiện" />
                            <button>Tìm kiếm</button>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('list_event')}>
                            {listEvent &&
                                listEvent.length > 0 &&
                                listEvent.map((event, index) => (
                                    <div className={cx('event')}>
                                        <div className={cx('event_desc')}>
                                            <div className={cx('avatar')}>
                                                <img src={getImageSrc(event.backgroundEvent)} alt="preview-image" />
                                            </div>
                                            <div className={cx('content')}>
                                                <p className="text-white text-base font-medium mb-4">
                                                    {event.eventName}
                                                </p>
                                                <div className={cx('group_desc')}>
                                                    <div className={cx('status')}>
                                                        <FaCalendar
                                                            style={{ width: '16px', color: 'white', height: '16px' }}
                                                        />
                                                        <span>Đang cập nhật</span>
                                                    </div>
                                                    <div className={cx('location')}>
                                                        <FaLocationDot
                                                            style={{
                                                                marginTop: '6px',
                                                                width: '16px',
                                                                color: 'white',
                                                                height: '16px',
                                                            }}
                                                        />
                                                        <div className={cx('detail')}>
                                                            <span className="text-white text-sm">
                                                                {event.locationName}
                                                            </span>
                                                            <p>{event.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('list_actions')}>
                                            <div className={cx('action')}>
                                                <Link to="/user/event/edit" className={cx('action_item')}>
                                                    <LiaAtomSolid
                                                        style={{ width: '20px', color: 'white', height: '20px' }}
                                                    />
                                                    <span>Tổng quan</span>
                                                </Link>
                                            </div>
                                            <div className={cx('action')}>
                                                <Link to="/user/event/edit" className={cx('action_item')}>
                                                    <RiUserFill
                                                        style={{ width: '20px', color: 'white', height: '20px' }}
                                                    />
                                                    <span>Thành viên</span>
                                                </Link>
                                            </div>
                                            <div className={cx('action')}>
                                                <Link to="/user/event/edit" className={cx('action_item')}>
                                                    <CgNotes
                                                        style={{ width: '20px', color: 'white', height: '20px' }}
                                                    />
                                                    <span>Đơn hàng</span>
                                                </Link>
                                            </div>
                                            <div className={cx('action')}>
                                                <Link to="/user/event/edit" className={cx('action_item')}>
                                                    <MdChair
                                                        style={{ width: '20px', color: 'white', height: '20px' }}
                                                    />
                                                    <span>Sơ đồ ghế</span>
                                                </Link>
                                            </div>
                                            <div className={cx('action')}>
                                                <Link
                                                    to={`/admin/confirm-event/${event._id}`}
                                                    onClick={handleEditEvent}
                                                    className={cx('action_item')}
                                                >
                                                    <HiPencil
                                                        style={{ width: '20px', color: 'white', height: '20px' }}
                                                    />
                                                    <span>Chỉnh sửa</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="w-[22%] hidden xl:block relative">
                    <div className={cx('sidebar')}>sidebar</div>
                </div>
            </div>
        </div>
    );
}

export default ManageEvent;
