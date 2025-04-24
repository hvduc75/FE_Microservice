import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './TicketInfo.module.scss';
import { ReceiptText, Clock4, MapPin } from 'lucide-react';
import { formatDate } from '../../utils';

const cx = classNames.bind(styles);

function TicketInfo({ item }) {
    const eventDate = new Date(item.event.startDate);

    const day = String(eventDate.getDate()).padStart(2, '0');
    const month = `Tháng ${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
    const year = eventDate.getFullYear();

    return (
        <div className={cx('ticket')}>
            <div className={cx('ticket_time')}>
                <div className={cx('day')}>{day}</div>
                <div className={cx('text')}>{month}</div>
                <div className={cx('text')}>{year}</div>
            </div>
            <div className={cx('circle_1')}></div>
            <div className={cx('circle_2')}></div>
            <div className={cx('ticket_info')}>
                <Link to={`/event-detail/${item.event._id}`} className={cx('title')}>{item.event.eventName}</Link>
                <div className={cx('group')}>
                    <span className={cx('group_item', 'cancel')}>
                        {item.booking.status === 'CONFIRMED' ? 'Thành công' : item.booking.status === 'PENDING' ? "Đang xử lý" : item.booking.status === "CANCELED" ? "Đã hủy" : 'Đang Test'}
                    </span>
                    <span className={cx('group_item', 'ticket_type')}>Vé điện tử</span>
                </div>
                <div className="flex items-center gap-2">
                    <ReceiptText size={16} />
                    <span className="text-[#b3b2b8]">Order code: {item.booking._id}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock4 size={16} />
                    <span className="text-[#b3b2b8]">{formatDate(item.event.startDate)}</span>
                </div>

                <div className="flex items-start gap-2">
                    <MapPin size={16} className="mt-[5px]" />
                    <div className="flex flex-col">
                        <span className="text-[#b3b2b8]">{item.event.locationName}</span>
                        <span className="text-[#b3b2b8]">{item.event.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;
