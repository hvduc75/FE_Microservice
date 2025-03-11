import React from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import style from './ModalAddTicket.module.scss';
import { addTicket, updateTicket } from '../../../service/ticketService';
import { IoClose } from 'react-icons/io5';
import { FiInbox } from 'react-icons/fi';

const cx = classNames.bind(style);

function ModalAddTicket(props) {
    const {   
        ticketId,
        setShowModal,
        eventId,
        ticketName,
        setTicketName,
        ticketPrice,
        setTicketPrice,
        ticketAmount,
        setTicketAmount,
        ticketMin,
        setTicketMin,
        ticketMax,
        setTicketMax,
        ticketDesc,
        setTicketDesc,
        ticketImage,
        setTicketImage,
        eventTicketSaleStartTime,
        setEventTicketSaleStartTime,
        eventTicketSaleEndTime,
        setEventTicketSaleEndTime,
        setImagePreview,
        imagePreview,
        eventEndDate,
        eventStartDate,
    } = props;

    const handleImageChange = (event, setPreview, setImage) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const formatDateTimeLocal = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);

        const offset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date - offset);

        return localDate.toISOString().slice(0, 16);
    };

    const getImageSrc = (image) => {
        if (image && image.data) {
            const binary = new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), '');
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const handleSave = async () => {
        const data = {
            ticketId,
            eventId,
            ticketName,
            ticketPrice,
            ticketAmount,
            ticketMin,
            ticketMax,
            ticketDesc,
            ticketImage,
            eventTicketSaleStartTime,
            eventTicketSaleEndTime,
        };

        if (!ticketId) {
            let res = await addTicket(data);
            if (res.EC === 0) {
                toast.success('Thêm vé thành công');
                setShowModal(false);
            } else {
                toast.error(res.EM);
            }
        } else {
            let res = await updateTicket(data);
            if (res.EC === 0) {
                toast.success('Cập nhật vé thành công');
                setShowModal(false);
            } else {
                toast.error(res.EM);
            }
        }
    };

    const handleChangeTicketSaleStartTime = async (event) => {
        setEventTicketSaleStartTime(event.target.value);
        let startTime = event.target.value;
        
        if (new Date(startTime) < new Date(eventStartDate)) {
            toast.error('Thời gian bắt đầu bán vé phải lớn hơn thời gian bắt đầu sự kiện');
            setEventTicketSaleStartTime('');
            return
        }
    };

    const handleChangeTicketSaleEndTime = async (event) => {
        setEventTicketSaleEndTime(event.target.value);
        let endDate = event.target.value;
        if (new Date(endDate) > new Date(eventEndDate)) {
            toast.error('Thời gian kết thúc bán vé phải nhỏ hơn thời gian kết thúc sự kiện');
            setEventTicketSaleEndTime('');
            return
        }
    };

    return (
        <div className={cx('modal_overlay')}>
            <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('modal_content')}>
                    <button className={cx('close_btn')} onClick={() => setShowModal(false)}>
                        <span>
                            <IoClose style={{ width: '24px', height: '24px' }} />
                        </span>
                    </button>
                    <div className={cx('modal_body')}>
                        <div className="pb-2 pl-6 pr-4">
                            <p class="text-center text-lg font-semibold text-white pt-4 pb-2 pl-6 pr-4 ">
                                Tạo loại thẻ mới
                            </p>
                            <form className={cx('form')}>
                                <div className="mb-6">
                                    <div className={cx('custom_title')}>Tên vé</div>
                                    <input
                                        style={{ height: '40px' }}
                                        className={cx('custom_input')}
                                        placeholder="Tên vé"
                                        value={ticketName}
                                        onChange={(e) => setTicketName(e.target.value)}
                                    />
                                </div>
                                <div className="flex md:flex-row flex-col gap-10 w-full justify-between mb-6">
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Giá vé</div>
                                        <input
                                            type="number"
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Giá vé"
                                            value={ticketPrice}
                                            onChange={(e) => setTicketPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Tổng số lượng vé</div>
                                        <input
                                            style={{ height: '40px', minWidth: '230px' }}
                                            className={cx('custom_input')}
                                            placeholder="Tổng số lượng vé"
                                            value={ticketAmount}
                                            onChange={(e) => setTicketAmount(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Số vé tối thiểu trong một đơn hàng</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Số vé tối thiểu trong một đơn hàng"
                                            value={ticketMin}
                                            onChange={(e) => setTicketMin(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Số vé tối đa trong một đơn hàng</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Số vé tối đa trong một đơn hàng"
                                            value={ticketMax}
                                            onChange={(e) => setTicketMax(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-10">
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Thời gian bắt đầu bán vé</div>
                                        <input
                                            type="datetime-local"
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Thời gian bắt đầu bán vé"
                                            value={formatDateTimeLocal(eventTicketSaleStartTime)}
                                            onChange={handleChangeTicketSaleStartTime}
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Thời gian kết thúc bán vé</div>
                                        <input
                                            type="datetime-local"
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Thời gian kết thúc bán vé"
                                            value={formatDateTimeLocal(eventTicketSaleEndTime)}
                                            onChange={handleChangeTicketSaleEndTime}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-[24px]">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="w-full">
                                            <div className={cx('custom_title')}>Thông tin vé</div>
                                            <textarea
                                                style={{ height: '170px' }}
                                                className={cx('custom_input', 'outline-none')}
                                                placeholder="Thông tin vé"
                                                value={ticketDesc}
                                                onChange={(e) => setTicketDesc(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-[350px] h-[170px]">
                                        <div className={cx('custom_title')}>Hình ảnh vé</div>
                                        <input
                                            type="file"
                                            id="event_logo"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleImageChange(e, setImagePreview, setTicketImage)}
                                        />
                                        <label
                                            htmlFor="event_logo"
                                            className="border border-dashed border-[#fff] text-[#fff] rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer h-full"
                                        >
                                            {imagePreview || ticketImage ? (
                                                <img
                                                    src={imagePreview || getImageSrc(ticketImage)}
                                                    alt="ticket Preview"
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            ) : (
                                                <>
                                                    <FiInbox
                                                        style={{ width: '40px', height: '40px', color: '#2dc275' }}
                                                    />
                                                    <p className="text-center">Thêm</p>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={cx('modal_footer')}>
                        <div className="flex justify-center pl-3 pr-3 pb-3">
                            <button onClick={() => handleSave()}>
                                <span>Lưu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddTicket;
