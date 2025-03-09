import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import style from './AddEvent.module.scss';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import { addEvent, getEvent } from '../../../service/eventService';

const cx = classNames.bind(style);

function AddEvent(props) {
    const [active, setActive] = useState(1);
    const [eventLogo, setEventLogo] = useState(null);
    const [backgroundEvent, setBackgroundEvent] = useState(null);
    const [eventName, setEventName] = useState('');
    const [locationType, setLocationType] = useState('');
    const [locationName, setLocationName] = useState('');
    const [address, setAddress] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [organizerDesc, setOrganizerDesc] = useState('');
    const [organizerLogo, setOrganizerLogo] = useState(null);

    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventTicketType, setEventTicketType] = useState('');
    const [eventTicketPrice, setEventTicketPrice] = useState('');
    const [eventTicketQuantity, setEventTicketQuantity] = useState('');
    const [eventTicketDescription, setEventTicketDescription] = useState('');
    const [eventTicketSaleStartDate, setEventTicketSaleStartDate] = useState('');
    const [eventTicketSaleEndDate, setEventTicketSaleEndDate] = useState('');

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        let eventId = '67cc5b3e56f5e8752fd3f10c';
        let data = await getEvent(eventId);
        if (data.EC === 0) {
            let event = data.DT;
            setEventName(event.eventName);
            setLocationType(event.locationType);
            setLocationName(event.locationName);
            setAddress(event.address);
            setEventType(event.eventType);
            setEventDescription(event.eventDescription);
            setOrganizerName(event.organizerName);
            setOrganizerDesc(event.organizerDesc);
            setEventLogo(event.eventLogo);
            setBackgroundEvent(event.backgroundEvent);
            setOrganizerLogo(event.organizerLogo);
        }
    };

    const handleContinue = () => {
        if (active < 4) {
            setActive(active + 1);
            console.log();
        }
    };

    const handleSave = async () => {
        const data = {
            eventName,
            locationType,
            locationName,
            address,
            eventType,
            eventDescription,
            organizerName,
            organizerDesc,
            eventLogo,
            backgroundEvent,
            organizerLogo,
        };

        const res = await addEvent(data);
        console.log(res);
    };

    return (
        <>
            <div
                style={{ background: 'background: rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(30px)' }}
                className="flex flex-row items-center justify-center px-1 mb-2 border-b border-[#38383D] pt-2 fixed top-[64px] z-10 bg-black-30 backdrop-blur-50 w-[calc(100%-250px)] "
            >
                <div className={cx('group_item')}>
                    <div className={cx('item_container')}>
                        <div className={cx('item', 1 === active && 'item_active')}>
                            <div className={cx('item_icon')}>
                                <span>1</span>
                            </div>
                            <div className={cx('item_content')}>Thông tin sự kiện</div>
                        </div>
                    </div>
                    <div className={cx('item_container')}>
                        <div className={cx('item', 2 === active && 'item_active')}>
                            <div className={cx('item_icon')}>
                                <span>2</span>
                            </div>
                            <div className={cx('item_content')}>Thời gian & loại vé</div>
                        </div>
                    </div>
                    <div className={cx('item_container')}>
                        <div className={cx('item', 3 === active && 'item_active')}>
                            <div className={cx('item_icon')}>
                                <span>3</span>
                            </div>
                            <div className={cx('item_content')}>Cài đặt</div>
                        </div>
                    </div>
                    <div className={cx('item_container')}>
                        <div className={cx('item', 4 === active && 'item_active')}>
                            <div className={cx('item_icon')}>
                                <span>4</span>
                            </div>
                            <div className={cx('item_content')}>Thông tin thanh toán</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-2 ">
                    <button className={cx('btn', 'w-full')} onClick={() => handleSave()}>
                        <span>Lưu</span>
                    </button>
                    <button className={cx('btn', 'btn_continue', 'w-full')}>
                        <span onClick={() => handleContinue()}>Tiếp tục</span>
                    </button>
                </div>
            </div>
            {active === 1 && (
                <StepOne
                    address={address}
                    setAddress={setAddress}
                    eventLogo={eventLogo}
                    setEventLogo={setEventLogo}
                    backgroundEvent={backgroundEvent}
                    setBackgroundEvent={setBackgroundEvent}
                    eventName={eventName}
                    setEventName={setEventName}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    setLocationName={setLocationName}
                    locationName={locationName}
                    eventType={eventType}
                    setEventType={setEventType}
                    eventDescription={eventDescription}
                    setEventDescription={setEventDescription}
                    organizerName={organizerName}
                    setOrganizerName={setOrganizerName}
                    organizerDesc={organizerDesc}
                    setOrganizerDesc={setOrganizerDesc}
                    organizerLogo={organizerLogo}
                    setOrganizerLogo={setOrganizerLogo}
                />
            )}
            {active === 2 && <StepTwo />}
        </>
    );
}

export default AddEvent;
