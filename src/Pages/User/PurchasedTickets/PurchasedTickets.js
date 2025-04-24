import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '../../../assets/images';
import styles from './PurchasedTickets.module.scss';
import TicketInfo from '../../../Components/TicketInfo/TicketInfo';
import { getBookingByCondition } from '../../../service/bookingService';

const cx = classNames.bind(styles);

function PurchasedTickets(props) {
    const [active, setActive] = useState('ALL');
    const [condition, setCondition] = useState('START');
    const [bookings, setBookings] = useState([]);
    const [ticketEmpty, setTicketEmpty] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, [active, condition]);

    const fetchBookings = async () => {
        try {
            const response = await getBookingByCondition(active, condition);
            console.log(response);
            setBookings(response.DT?.bookings);
            // setTicketEmpty(response.data.length === 0);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Vé đã mua</div>
            <div className={cx('divider')}></div>
            <div className={cx('container')}>
                <div className={cx('list_item')}>
                    <div className={cx('item', active === 'ALL' && 'active')} onClick={() => setActive('ALL')}>
                        Tất cả
                    </div>
                    <div className={cx('item', { active: active === 'SUCCESS' })} onClick={() => setActive('SUCCESS')}>
                        Thành công
                    </div>
                    <div className={cx('item', { active: active === 'PENDING' })} onClick={() => setActive('PENDING')}>
                        Đang xử lý
                    </div>
                    <div
                        className={cx('item', { active: active === 'CANCELED' })}
                        onClick={() => setActive('CANCELED')}
                    >
                        Đã hủy
                    </div>
                </div>
                <div className={cx('list_condition')}>
                    <div
                        className={cx('condition', { active: condition === 'START' })}
                        onClick={() => setCondition('START')}
                    >
                        Sắp diễn ra
                    </div>
                    <div
                        className={cx('condition', { active: condition === 'END' })}
                        onClick={() => setCondition('END')}
                    >
                        Đã kết thúc
                    </div>
                </div>
                <div className={cx('content')}>
                    {bookings.length < 0 ? (
                        <>
                            <div className={cx('content_empty')}>
                                <img src={images.avatar} alt="image_none" />
                                <span>Bạn chưa có vé nào</span>
                            </div>
                            <div className="mt-[80px]">
                                <Link to="/">
                                    <button className={cx('btn')}>Mua vé ngay</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            {bookings?.map((item, index) => (
                                <TicketInfo key={index} item={item} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PurchasedTickets;
