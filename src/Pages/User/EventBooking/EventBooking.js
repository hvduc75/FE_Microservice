import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './EventBooking.module.scss';
import { getEvent } from '../../../service/eventService';
import { createBooking } from '../../../service/bookingService';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { formatPrice, formatDate } from '../../../utils';

const cx = classNames.bind(styles);

function EventBooking(props) {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [checkBooking, setCheckBooking] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    useEffect(() => {
        if (event?.tickets) {
            setSelectedTickets(
                event.tickets.map((ticket) => ({
                    ticketId: ticket._id,
                    ticketName: ticket.ticketName,
                    ticketPrice: ticket.ticketPrice,
                    quantity: 0,
                    maxQuantity: ticket.ticketMax,
                })),
            );
        }
    }, [event]);

    const fetchEvent = async () => {
        let data = await getEvent(eventId);
        if (data.EC === 0) {
            setEvent(data.DT);
        }
    };

    const updateTotal = (tickets) => {
        const total = tickets.reduce((sum, ticket) => sum + ticket.ticketPrice * ticket.quantity, 0);
        setTotalAmount(total);
        setCheckBooking(total > 0);
    };

    const increaseQuantity = (index) => {
        setSelectedTickets((prevTickets) => {
            const newTickets = [...prevTickets];
            if (newTickets[index].quantity < newTickets[index].maxQuantity) {
                newTickets[index].quantity += 1;
            }
            updateTotal(newTickets);
            return newTickets;
        });
    };

    const decreaseQuantity = (index) => {
        setSelectedTickets((prevTickets) => {
            const newTickets = [...prevTickets];
            if (newTickets[index].quantity > 0) {
                newTickets[index].quantity -= 1;
            }
            updateTotal(newTickets);
            return newTickets;
        });
    };

    const handleBooking = async () => {
        let data = await createBooking({
            eventId: eventId,
            totalAmount: totalAmount,
            tickets: selectedTickets.filter((ticket) => ticket.quantity > 0),
        });

        if(data.EC === 0) {
            navigate(`booking/${data.DT._id}`);
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
                                    {selectedTickets.map((ticket, index) => (
                                        <div className={cx('item')} key={index}>
                                            <div className={cx('event')}>
                                                <div className={cx('name')}>{ticket?.ticketName}</div>
                                                <div className={cx('price')}>{formatPrice(ticket?.ticketPrice)} đ</div>
                                            </div>
                                            <div className={cx('wrapper_quantity')}>
                                                <div className={cx('control_quantity')}>
                                                    <button
                                                        className={
                                                            ticket.quantity === 0
                                                                ? cx('btn', 'disabled')
                                                                : cx('btn', 'btn_minus')
                                                        }
                                                        onClick={() => decreaseQuantity(index)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={ticket.quantity}
                                                        readOnly
                                                        style={{ color: 'black' }}
                                                    />
                                                    <button
                                                        className={
                                                            selectedTickets[index].quantity ===
                                                            selectedTickets[index].maxQuantity
                                                                ? cx('btn', 'disabled')
                                                                : cx('btn', 'btn_plus')
                                                        }
                                                        onClick={() => increaseQuantity(index)}
                                                    >
                                                        +
                                                    </button>
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
                            <div className={cx('ticket_quantity')}></div>
                            {checkBooking ? (
                                <button className={cx('btn_booking')} onClick={() => handleBooking()}>
                                    Tiếp tục - {formatPrice(totalAmount)} đ
                                </button>
                            ) : (
                                <button className={cx('btn_booking', 'disabled')}>Vui lòng chọn vé</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventBooking;
