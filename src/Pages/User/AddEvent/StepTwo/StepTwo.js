import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './StepTwo.module.scss';
import { toast } from 'react-toastify';

import ModalAddTicket from '../../../../Components/Modal/ModalAddTicket/ModalAddTicket';
import { getTicketByEventId } from '../../../../service/ticketService';
import { updateEventDate } from '../../../../service/eventService';
import { FaAngleUp, FaCirclePlus } from 'react-icons/fa6';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTicketDetailed } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { PiPencilSimpleLineLight } from 'react-icons/pi';

const cx = classNames.bind(styles);

function StepTwo(props) {
    const { eventId, eventStartDate, setEventStartDate, eventEndDate, setEventEndDate, setCheckStepTwo } = props;
    const [ticketId, setTicketId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [listTicket, setListTicket] = useState([]);
    const [ticketName, setTicketName] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [ticketAmount, setTicketAmount] = useState('');
    const [ticketMin, setTicketMin] = useState('');
    const [ticketMax, setTicketMax] = useState('');
    const [ticketDesc, setTicketDesc] = useState('');
    const [ticketImage, setTicketImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [eventTicketSaleStartTime, setEventTicketSaleStartTime] = useState('');
    const [eventTicketSaleEndTime, setEventTicketSaleEndTime] = useState('');

    useEffect(() => {
        if (eventId) {
            fetchListTicket();
        }
    }, [eventId, showModal]);

    const fetchListTicket = async () => {
        let data = await getTicketByEventId(eventId);
        if (data.EC === 0) {
            setListTicket(data.DT);
            if (data.DT.length > 0) {
                setCheckStepTwo(true);
            }
        }
    };

    const handleAddTicket = () => {
        if(!eventStartDate || !eventEndDate) {
            toast.error('Vui lòng chọn thời gian bắt đầu và kết thúc');
            return;
        }
        setShowModal(true);
    };

    const handleOnchangeStartDate = async (event) => {
        setEventStartDate(event.target.value);
        let startDate = event.target.value;
        let checkDate = true;
        listTicket.map((ticket) => {
            console.log(new Date(ticket.eventTicketSaleStartTime), new Date(startDate));
            if (new Date(ticket.eventTicketSaleStartTime) < new Date(startDate)) {
                checkDate = false;
            }
        })
        if (!checkDate) {
            toast.error('Thời gian bắt đầu sự kiện phải lớn hơn thời gian bắt đầu bán vé');
            setEventStartDate('');
            return
        }
        if (new Date(startDate) > new Date(eventEndDate)) {
            toast.error('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc');
            setEventStartDate('');
            setEventEndDate('');
            return
        }

        await updateEventDate(eventId, startDate, eventEndDate);
    };

    const handleOnchangeEndDate = async (event) => {
        setEventEndDate(event.target.value);
        let endDate = event.target.value;
        let checkDate = true;
        listTicket.map((ticket) => {
            if (new Date(ticket.eventTicketSaleEndTime) > new Date(endDate)) {
                checkDate = false;
            }
        })
        if (!checkDate) {
            toast.error('Thời gian kết thúc bán vé phải nhỏ hơn thời gian kết thúc sự kiện');
            setEventEndDate('');
            return
        }
        if (new Date(endDate) < new Date(eventStartDate)) {
            toast.error('Thời gian kết thúc phải lớn hơn thời gian bắt đầu');
            setEventStartDate('');
            setEventEndDate('');
            return
        }
        await updateEventDate(eventId, eventStartDate, endDate);
    };

    const handleUpdateTicket = (ticket) => {
        setShowModal(true);
        setTicketId(ticket._id);
        setTicketName(ticket.ticketName);
        setTicketPrice(ticket.ticketPrice);
        setTicketAmount(ticket.ticketAmount);
        setTicketMin(ticket.ticketMin);
        setTicketMax(ticket.ticketMax);
        setTicketDesc(ticket.ticketDesc);
        setTicketImage(ticket.ticketImage);
        setEventTicketSaleStartTime(ticket.eventTicketSaleStartTime);
        setEventTicketSaleEndTime(ticket.eventTicketSaleEndTime);
    };

    const handleDeleteTicket = (ticket) => {
        toast.error('Delete ticket');
    };

    const formatDateTimeLocal = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);

        const offset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date - offset);

        return localDate.toISOString().slice(0, 16);
    };

    return (
        <>
            <div style={{ padding: '72px 16px' }}>
                <div className="max-w-screen-2xl mx-auto rounded-lg p-6">
                    <div className={cx('dynamic_form')}>
                        <div className={cx('header')}>
                            <div className="flex items-center">
                                <div className={cx('icon')}>
                                    <FaAngleUp style={{ width: '24px', height: '24px' }} />
                                </div>
                                <span class="text-white 1px solid #FF424E">
                                    <p class="text-base font-semibold">Ngày sự kiện</p>
                                </span>
                            </div>
                            <div className={cx('action')}>
                                <button>
                                    <AiOutlineClose style={{ width: '16px', height: '16px' }} />
                                </button>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className="flex gap-6">
                                <div className="w-full mb-[24px]">
                                    <div className={cx('custom_title')}>Thời gian bắt đầu</div>
                                    <input
                                        type="datetime-local"
                                        style={{ height: '40px' }}
                                        className={cx('custom_input')}
                                        placeholder="Thời gian bắt đầu"
                                        onChange={handleOnchangeStartDate}
                                        value={formatDateTimeLocal(eventStartDate)}
                                    />
                                </div>
                                <div className="w-full mb-[24px]">
                                    <div className={cx('custom_title')}>Thời gian kết thúc</div>
                                    <input
                                        type="datetime-local"
                                        style={{ height: '40px' }}
                                        className={cx('custom_input')}
                                        placeholder="Thời gian kết thúc"
                                        onChange={handleOnchangeEndDate}
                                        value={formatDateTimeLocal(eventEndDate)}
                                    />
                                </div>
                            </div>
                            <div className={cx('ticket_type')}>
                                <div className={cx('custom_title', 'text-lg font-bold')}>Loại vé</div>
                                <div className="flex flex-col gap-y-4">
                                    {listTicket &&
                                        listTicket.length > 0 &&
                                        listTicket.map((ticket, index) => (
                                            <div key={index} className="bg-[#424652] rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <FaEquals
                                                            style={{ color: 'white', width: '17px', height: '17px' }}
                                                        />
                                                        <BsTicketDetailed
                                                            style={{ color: 'white', width: '18px', height: '18px' }}
                                                        />
                                                        <span
                                                            style={{
                                                                color: 'white',
                                                                fontSize: '16px',
                                                                marginBottom: '2px',
                                                            }}
                                                        >
                                                            {ticket.ticketName}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-row gap-2">
                                                        <button
                                                            className="bg-[#fff] rounded p-2"
                                                            onClick={() => {
                                                                handleUpdateTicket(ticket);
                                                            }}
                                                        >
                                                            <PiPencilSimpleLineLight
                                                                style={{
                                                                    color: 'black',
                                                                    width: '18px',
                                                                    height: '18px',
                                                                }}
                                                            />
                                                        </button>
                                                        <button
                                                            className="bg-[red] rounded p-2 "
                                                            onClick={() => {
                                                                handleDeleteTicket(ticket);
                                                            }}
                                                        >
                                                            <FiTrash
                                                                style={{
                                                                    color: 'white',
                                                                    width: '18px',
                                                                    height: '18px',
                                                                }}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className={cx('ticket_group')}>
                                    <button
                                        className="mt-[16px] py-[4px] px-[15px] w-full"
                                        onClick={() => handleAddTicket()}
                                    >
                                        <div className="flex items-center gap-2 justify-center text-[#2DC275]">
                                            <FaCirclePlus style={{ width: '24px', height: '24px' }} />
                                            <span className="text-sm font-bold">Tạo loại vé mới</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <ModalAddTicket
                    eventId={eventId}
                    ticketId={ticketId}
                    setShowModal={setShowModal}
                    ticketName={ticketName}
                    setTicketName={setTicketName}
                    ticketPrice={ticketPrice}
                    setTicketPrice={setTicketPrice}
                    ticketAmount={ticketAmount}
                    setTicketAmount={setTicketAmount}
                    ticketMin={ticketMin}
                    setTicketMin={setTicketMin}
                    ticketMax={ticketMax}
                    setTicketMax={setTicketMax}
                    ticketDesc={ticketDesc}
                    setTicketDesc={setTicketDesc}
                    ticketImage={ticketImage}
                    setTicketImage={setTicketImage}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    eventTicketSaleStartTime={eventTicketSaleStartTime}
                    setEventTicketSaleStartTime={setEventTicketSaleStartTime}
                    eventTicketSaleEndTime={eventTicketSaleEndTime}
                    setEventTicketSaleEndTime={setEventTicketSaleEndTime}
                    eventEndDate={eventEndDate}
                    eventStartDate={eventStartDate}
                />
            )}
        </>
    );
}

export default StepTwo;
