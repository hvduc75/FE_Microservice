import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useParams, useOutletContext } from 'react-router-dom';

import styles from './SummaryRevenue.module.scss';
import TicketTable from './TicketTable/TicketTable';
import CustomLineChart from './Chart/Chart';
import { getEvent } from '../../../service/eventService';
import { getAllBookingByEventId } from '../../../service/bookingService';
import { formatDateCustom, formatPrice } from '../../../utils';
import { BiSolidCalendarStar } from 'react-icons/bi';

const cx = classNames.bind(styles);

function SummaryRevenue(props) {
    const eventId = useParams().eventId;
    const { setChangeSidebar, setEventId } = useOutletContext();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [booking, setBooking] = useState(null);

    const totalRevenue = tickets.reduce((acc, ticket) => acc + ticket.ticketPrice * ticket.soldQuantity, 0);
    const totalPrice = tickets.reduce((acc, ticket) => acc + ticket.ticketPrice * ticket.ticketAmount, 0);
    const totalTicketsSold = tickets.reduce((acc, ticket) => acc + ticket.soldQuantity, 0);
    const totalTickets = tickets.reduce((acc, ticket) => acc + ticket.ticketAmount + ticket.soldQuantity, 0);

    const percent = (top, bot) => {
        return ((top / bot) * 100).toFixed(2) + '%';
    };

    useEffect(() => {
        setChangeSidebar(true);
        setEventId(eventId);
        fetchEvent();
        fetchBooking();
    }, [eventId]);

    const fetchEvent = async () => {
        let data = await getEvent(eventId);
        if (data.EC === 0) {
            setEvent(data.DT);
            setTickets(data.DT.tickets);
        }
    };

    const fetchBooking = async () => {
        let data = await getAllBookingByEventId(eventId);
        if (data.EC === 0) {
            setBooking(data.DT);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className="flex flex-row items-center gap-2 mb-2"></div>
            <div className="flex flex-row items-center justify-between gap-2 border-b border-[#515158] pb-[18px]">
                <div className="flex flex-row items-center gap-2 text-white">
                    <BiSolidCalendarStar size={24} />
                    <p className="text-sm">{formatDateCustom(event?.startDate)}</p>
                </div>
            </div>
            <p className="pt-8 pb-8 text-[20px] font-semibold text-white">Doanh thu</p>
            <div className={cx('overview')}>
                <p className="text-base font-semibold text-white mb-[12px]">Tổng quan</p>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className={cx('card')}>
                        <div className={cx('card_body')}>
                            <div className="flex justify-between items-center gap-3">
                                <div className="flex flex-col gap-3">
                                    <p className="text-white text-base">Doanh thu</p>
                                    <p className="text-[18px] text-white font-bold">{formatPrice(totalRevenue)} đ</p>
                                    <p className="text-[14px] font-normal text-white">
                                        Tổng: {formatPrice(totalPrice)} đ
                                    </p>
                                </div>
                                <div className={cx('progress')} style={{ '--progress': (totalRevenue / totalPrice) * 100 }}>
                                    <span>{percent(totalRevenue, totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('card')}>
                        <div className={cx('card_body')}>
                            <div className="flex justify-between items-center gap-3">
                                <div className="flex flex-col gap-3">
                                    <p className="text-white text-base">Số vé đã bán</p>
                                    <p className="text-[18px] text-white font-bold">{totalTicketsSold} vé</p>
                                    <p className="text-[14px] font-normal text-white">Tổng: {totalTickets} vé</p>
                                </div>
                                <div className={cx('progress')} style={{ '--progress': (totalRevenue / totalPrice) * 100 }}>
                                    <span>{percent(totalTicketsSold, totalTickets)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('chart_container')}>
                <CustomLineChart booking={booking} event={event} />
            </div>
            <div className={cx('detail')}>
                <p className="pt-8 pb-3 text-base font-semibold text-white">Chi tiết</p>
                <p className="text-base font-semibold text-white mt-[12px] mb-[12px]">Vé đã bán</p>
                <div className={cx('container')}>
                    <TicketTable tickets={tickets} />
                </div>
            </div>
        </div>
    );
}

export default SummaryRevenue;
