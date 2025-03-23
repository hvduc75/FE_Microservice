import React from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { deleteBooking } from '../../../service/bookingService';

import styles from './ModalConfirmBooking.module.scss';
import { BellRing } from 'lucide-react';

const cx = classNames.bind(styles);

function ModalConfirmBooking({ setShowModal, eventId, booking }) {
    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate(`/event-booking/${eventId}`);
        setShowModal(false);
    };

    const handleReturn = () => {
        navigate(`/event-booking/${booking.eventId}/payment/${booking._id}`);
        setShowModal(false);
    };

    const handleCancel = async () => {
        await deleteBooking(booking._id);
        setShowModal(false);
    };

    return (
        <div className={cx('modal_overlay')}>
            {booking ? (
                <div className={cx('modal_booking')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('header')}>
                        <span>Đơn hàng chưa hoàn thành</span>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('notice')}>
                            <p>
                                Bạn đang có đơn hàng chưa hoàn tất. <br />
                                Bạn có muốn tiếp tục?
                            </p>
                        </div>
                        <button className={cx('btn_confirm')} onClick={() => handleReturn()}>
                            Quay lại đơn cũ
                        </button>
                        <button className={cx('btn_cancel')} onClick={handleCancel}>
                            Hủy đơn, Mua vé mới
                        </button>
                    </div>
                </div>
            ) : (
                <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('header')}>
                        <span>Hết thời gian giữ vé!</span>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('notice')}>
                            <BellRing size={24} />
                            <p>Đã hết thời gian giữ vé. Vui lòng đặt lại vé mới.</p>
                        </div>
                        <button className={cx('btn_confirm')} onClick={handleConfirm}>
                            Đặt vé mới
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalConfirmBooking;
