import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './EventBooking.module.scss';
import { getEvent } from '../../../service/eventService';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { formatPrice, formatDate } from '../../../utils';

const cx = classNames.bind(styles);

function EventBooking(props) {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    const fetchEvent = async () => {
        let data = await getEvent(eventId);
        if (data.EC === 0) {
            setEvent(data.DT);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content_left')}>
                    <div className={cx('title_page')}>
                        <div className={cx('header')}>
                            <div className={cx('icon')} onClick={() => navigate(-1)}>
                                <ArrowLeft size={22} color="white" />
                                Trở về
                            </div>
                            <div className={cx('content')}>Chọn vé</div>
                        </div>
                    </div>
                    <div className={cx('tbox-container')}>
                        <div className={cx('tbox-row')}>
                            <div className={cx('tbox_col_lg_2')}></div>
                            <div className={cx('tbox_col_lg_8')}>
                                <div className={cx('header')}>
                                    <div className={cx('title')}>Loại vé</div>
                                    <div className={cx('quantity')}>Số lượng</div>
                                </div>
                                <div className={cx('content')}>
                                    {event?.tickets.map((ticket, index) => (
                                        <div className={cx('item')} key={index}>
                                            <div className={cx('event')}>
                                                <div className={cx('name')}>{ticket?.ticketName}</div>
                                                <div className={cx('price')}>{formatPrice(ticket?.ticketPrice)} đ</div>
                                            </div>
                                            <div className={cx('wrapper_quantity')}>
                                                <div className={cx('control_quantity')}>
                                                    <button className={cx('btn_minus')}>-</button>
                                                    <input type="text" value="1" />
                                                    <button className={cx('btn_plus')}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('tbox_col_lg_2')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('content_right')}>
                    <div className={cx('content_desc')}>
                        <div className={cx('name')}>{event?.eventName}</div>
                        <div className={cx('description')}>
                            <div className={cx('date')}>
                                <Calendar />
                                {formatDate(event?.startDate)}
                            </div>
                            <div className={cx('location')}>
                                <MapPin />
                                {event?.locationName}
                            </div>
                        </div>
                        <div className={cx('separator')}></div>
                        <div className={cx('price')}>
                            <div className={cx('header')}>Giá vé</div>
                            <div className={cx('content')}>
                                {event?.tickets.map((ticket, index) => (
                                    <div className={cx('ticket')} key={index}>
                                        <div className={cx('ticket_name')}>{ticket?.ticketName}</div>
                                        <div className={cx('ticket_price')}>{formatPrice(ticket?.ticketPrice)} đ</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('bottom_booking')}>
                        <div className={cx('booking_container')}>
                            <div className={cx('fix')}></div>
                            <button>Vui lòng chọn vé</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventBooking;
