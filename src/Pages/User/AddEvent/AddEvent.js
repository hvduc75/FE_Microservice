import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import style from './AddEvent.module.scss';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import { addEvent, getEvent } from '../../../service/eventService';

const cx = classNames.bind(style);

function AddEvent(props) {
    const { eventId } = useParams();
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

    useEffect(() => {
        if (eventId) {
            fetchEvent();
        } else {
            setEventName('');
            setLocationType('');
            setLocationName('');
            setAddress('');
            setEventType('');
            setEventDescription('');
            setOrganizerName('');
            setOrganizerDesc('');
            setEventLogo(null);
            setBackgroundEvent(null);
            setOrganizerLogo(null);
            setEventStartDate('');
            setEventEndDate('');
        }
    }, [eventId]);

    const fetchEvent = async () => {
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
            setEventEndDate(event.endDate);
            setEventStartDate(event.startDate);
        }
    };

    const handleContinue = () => {
        if (active < 4) {
            setActive(active + 1);
            console.log();
        }
    };

    const handleSave = async () => {
        if (active === 1) {
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
            if (!eventId) {
                await addEvent(data);
            }
        } else if (active === 2) {
            const data = {
                eventStartDate,
                eventEndDate,
            };

            console.log(data);

            // await addEvent(data);
        }
    };

    const steps = [
        { id: 1, label: 'Thông tin sự kiện' },
        { id: 2, label: 'Thời gian & loại vé' },
        { id: 3, label: 'Cài đặt' },
        { id: 4, label: 'Thông tin thanh toán' },
    ];

    return (
        <>
            <div
                style={{ background: 'background: rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(30px)' }}
                className="flex flex-row items-center justify-center px-1 mb-2 border-b border-[#38383D] pt-2 fixed top-[64px] z-10 bg-black-30 backdrop-blur-50 w-[calc(100%-250px)] "
            >
                <div className={cx('group_item')}>
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={cx('item_container')}
                            onClick={() => step.id <= active && setActive(step.id)}
                            style={{ cursor: step.id <= active ? 'pointer' : 'not-allowed' }}
                        >
                            <div className={cx('item', step.id === active && 'item_active')}>
                                <div className={cx('item_icon')}>
                                    <span>{step.id}</span>
                                </div>
                                <div className={cx('item_content')}>{step.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row gap-2 ">
                    <button className={cx('btn', 'w-full')} onClick={() => handleSave()}>
                        <span>Lưu</span>
                    </button>
                    <button className={cx('btn', 'btn_continue', 'w-full')} onClick={() => handleContinue()}>
                        <span>Tiếp tục</span>
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
            {active === 2 && (
                <StepTwo
                    eventId={eventId}
                    eventStartDate={eventStartDate}
                    setEventStartDate={setEventStartDate}
                    eventEndDate={eventEndDate}
                    setEventEndDate={setEventEndDate}
                />
            )}
        </>
    );
}

export default AddEvent;
