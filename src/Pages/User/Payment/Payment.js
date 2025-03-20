import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import styles from './Payment.module.scss';
import images from '../../../assets/images';
import { getEvent } from '../../../service/eventService';
import { getBookingById } from '../../../service/bookingService';
import ModalProfile from '../../../Components/Modal/ModalProfile/ModalProfile';
import { formatPrice, formatDate, getImageSrc } from '../../../utils';
import { CircleCheck, Circle, Calendar, MapPin, CircleAlert } from 'lucide-react';

const paymentMethods = [
    { id: 'vn_pay', label: 'Ứng dụng ngân hàng (VNPAY)', img: images.pm_vnpay },
    { id: 'momo', label: 'Ví momo', img: images.pm_momo },
    { id: 'zalo_pay', label: 'Zalopay', img: images.pm_zalopay },
];

const cx = classNames.bind(styles);

function Payment(props) {
    const { eventId, bookingId } = useParams();
    const [event, setEvent] = useState(null);
    const [booking, setBooking] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('vn_pay');
    const [showModal, setShowModal] = useState(false);
    const [closeAttent, setCloseAttent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const timeout = 15 * 60;

    useEffect(() => {
        if (booking?.bookingTime) {
            const bookingTimestamp = new Date(booking.bookingTime).getTime();
            const expireTimestamp = bookingTimestamp + timeout * 1000;
            const remainingTime = Math.max((expireTimestamp - Date.now()) / 1000, 0);
            setCountdown(Math.floor(remainingTime));
        }
    }, [booking]);

    useEffect(() => {
        if (countdown <= 0) return;
        const interval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown]);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    useEffect(() => {
        fetchBooking();
    }, [bookingId]);

    useEffect(() => {
        if (booking && booking.tickets && booking.tickets.length > 0) {
            setTotalAmount(booking.tickets.reduce((sum, ticket) => sum + ticket.ticketPrice * ticket.quantity, 0));
        }
    }, [booking]);

    const fetchEvent = async () => {
        let data = await getEvent(eventId);
        if (data.EC === 0) {
            setEvent(data.DT);
        }
    };

    const fetchBooking = async () => {
        let data = await getBookingById(bookingId);
        if (data.EC === 0) {
            setBooking(data.DT);
        }
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleChangeInfo = () => {
        setShowModal(true);
    };

    const handlePayment = () => {
        alert('vien ngu', paymentMethod);
        console.log('vien ngu', paymentMethod);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('content')}>
                        <div className={cx('item_wrapper')}>
                            <div className={cx('item')}>
                                <div>
                                    <CircleCheck size={18} />
                                </div>
                                <div>Chọn vé</div>
                            </div>
                            <div className={cx('path_container')}>
                                <div className={cx('path')}></div>
                            </div>
                        </div>
                        <div className={cx('item_wrapper')}>
                            <div className={cx('item', 'active')}>
                                <div>
                                    <Circle size={18} />
                                </div>
                                <div>Thanh toán</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={cx('event_desc')}
                    style={{
                        backgroundImage: `url(${
                            getImageSrc(event?.backgroundEvent) ||
                            'https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761'
                        })`,
                    }}
                >
                    <div className={cx('banner_content')}>
                        <div className={cx('content_main')}>
                            <div className={cx('text_info')}>
                                <p className={cx('title')}>{event?.eventName}</p>
                                <div>
                                    <hr />
                                </div>
                                <div className={cx('venue')}>
                                    <MapPin size={24} />
                                    <span>{event?.locationName}</span>
                                </div>
                                <p className={cx('address')}>{event?.address}</p>
                                <div className={cx('datetime')}>
                                    <Calendar size={24} />
                                    <span>{formatDate(event?.startDate)}</span>
                                </div>
                            </div>
                            <div className={cx('count_info')}>
                                <div className={cx('count_container')}>
                                    <p>Hoàn tất đặt vé trong</p>
                                    <div className={cx('count_down')}>
                                        <span className={cx('cd_container')}>
                                            <span className={cx('cd_number')}>{String(minutes).padStart(2, '0')}</span>
                                            <span className={cx('cd_separator')}>:</span>
                                        </span>
                                        <span className={cx('cd_container')}>
                                            <span className={cx('cd_number')}>{String(seconds).padStart(2, '0')}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('payment_desc')}>
                    <div className={cx('payment_container')}>
                        <div className={cx('content_left')}>
                            <div className={cx('title')}>Thanh toán</div>
                            {!closeAttent && <div className={cx('attention')}>
                                <div className={cx('text_attent')}>
                                    <CircleAlert size={20} />
                                    Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi, vui lòng
                                    <span onClick={() => handleChangeInfo()}>cập nhật tại đây</span>
                                </div>
                                <button onClick={() => setCloseAttent(true)}>X</button>
                            </div>}
                            <div className={cx('user_info')}>
                                <div className={cx('title_user')}>
                                    <span>Thông tin nhận vé</span>
                                    <button onClick={() => handleChangeInfo()}>Sửa</button>
                                </div>
                                <div className={cx('user')}>
                                    <span className={cx('name')}>Đức Hoàng</span>
                                    <span>No phone</span>
                                </div>
                                <div className={cx('email')}>duch52362@gmail.com</div>
                            </div>
                            <div className={cx('payment_method')}>
                                <div className={cx('title_payment')}>
                                    <span>Phương thức thanh toán</span>
                                </div>
                                <div className={cx('method_container')}>
                                    {paymentMethods.map(({ id, label, img }) => (
                                        <div key={id} className={cx('method')}>
                                            <input
                                                type="radio"
                                                id={id}
                                                name="payment"
                                                value={id}
                                                checked={paymentMethod === id}
                                                onChange={handlePaymentMethodChange}
                                            />
                                            <label htmlFor={id}>
                                                <img src={img} alt={label} />
                                                <span>{label}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('content_right')}>
                            <div className={cx('payment_info')}>
                                <div className={cx('ticket_info')}>
                                    <div className={cx('title')}>
                                        <div className={cx('left_node')}>Thông tin đặt vé</div>
                                        <div className={cx('right_node')}>Chọn lại vé</div>
                                    </div>
                                    <div className={cx('content')}>
                                        <div className={cx('header')}>
                                            <div className={cx('left_node')}>Loại vé</div>
                                            <div className={cx('right_node')}>Số lượng</div>
                                        </div>
                                        {booking?.tickets.length > 0 &&
                                            booking?.tickets.map((ticket, index) => (
                                                <div className={cx('ticket')} key={index}>
                                                    <div className={cx('content_top')}>
                                                        <div className={cx('left_node')}>{ticket.ticketName}</div>
                                                        <div className={cx('right_node')}>{ticket.quantity}</div>
                                                    </div>
                                                    <div className={cx('content_bot')}>
                                                        <div className={cx('left_node')}>
                                                            {formatPrice(ticket.ticketPrice)} đ
                                                        </div>
                                                        <div className={cx('right_node')}>
                                                            {formatPrice(ticket.ticketPrice * ticket.quantity)} đ
                                                        </div>
                                                    </div>
                                                    {index + 1 !== booking.tickets.length && (
                                                        <div className={cx('separator')}></div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className={cx('order_info')}>
                                    <div className={cx('title')}>
                                        <div className={cx('left_node')}>Thông tin đơn hàng</div>
                                    </div>
                                    <div className={cx('content')}>
                                        <div className={cx('header')}>
                                            <div className={cx('left_node')}>Tạm tính</div>
                                            <div className={cx('right_node')}>{formatPrice(totalAmount)} đ</div>
                                        </div>
                                        <div className={cx('separator')}></div>
                                        <div className={cx('total_price')}>
                                            <div className={cx('left_node')}>Tổng tiền</div>
                                            <div className={cx('right_node')}>{formatPrice(totalAmount)} đ</div>
                                        </div>
                                        <div className={cx('node')}>
                                            Bằng việc tiến hành đặt mua, bạn đã đồng ý với{' '}
                                            <span>Điều Kiện Giao Dịch Chung</span>
                                        </div>
                                        <button onClick={() => handlePayment()}>Thanh toán</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <ModalProfile setShowModal={setShowModal} />}
        </>
    );
}

export default Payment;
