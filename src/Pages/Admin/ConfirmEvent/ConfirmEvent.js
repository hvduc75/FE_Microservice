import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getEvent, confirmEvent } from '../../../service/eventService';
import classNames from 'classnames/bind';
import style from './ConfirmEvent.module.scss';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree';
import StepFour from './StepFour/StepFour';

const cx = classNames.bind(style);

const steps = [
    { id: 1, label: 'Thông tin sự kiện' },
    { id: 2, label: 'Thời gian & loại vé' },
    { id: 3, label: 'Cài đặt' },
    { id: 4, label: 'Thông tin thanh toán' },
];

function ConfirmEvent(props) {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [active, setActive] = useState(1);
    const [eventLogo, setEventLogo] = useState(null);
    const [backgroundEvent, setBackgroundEvent] = useState(null);
    const [eventName, setEventName] = useState('');
    const [locationType, setLocationType] = useState('');
    const [locationName, setLocationName] = useState('');
    const [address, setAddress] = useState('');
    const [eventType, setEventType] = useState('1');
    const [eventDescription, setEventDescription] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [organizerDesc, setOrganizerDesc] = useState('');
    const [organizerLogo, setOrganizerLogo] = useState(null);

    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [contentEmail, setContentEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');

    useEffect(() => {
        if (eventId) {
            fetchEvent(eventId);
        } else {
            setEventName('');
            setLocationType('');
            setLocationName('');
            setAddress('');
            setEventType(1);
            setEventDescription('');
            setOrganizerName('');
            setOrganizerDesc('');
            setEventLogo(null);
            setBackgroundEvent(null);
            setOrganizerLogo(null);
            setEventStartDate('');
            setEventEndDate('');
            setContentEmail('');
            setBranch('');
            setAccountName('');
            setAccountNumber('');
            setBankName('');
        }
    }, [eventId]);

    const fetchEvent = async (eventId) => {
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
            setContentEmail(event.contentEmail);
            setBranch(event.branch);
            setAccountName(event.accountName);
            setAccountNumber(event.accountNumber);
            setBankName(event.bankName);
        }
    };

    const handleContinue = async () => {
        if (active < 4) {
            setActive(active + 1);
        }
    };

    const handleConfirm = async () => {
        let data = await confirmEvent(eventId);
        if (data.EC === 0) {
            toast.success('Xác nhận sự kiện thành công');
            navigate('/Admin/manage-event');
        }
    };

    return (
        <>
            <div
                style={{ background: 'black', backdropFilter: 'blur(30px)' }}
                className="flex flex-row items-center justify-center px-1 mb-2 border-b border-[#38383D] pt-2 fixed top-[70px] z-10 bg-black-30 backdrop-blur-50 w-[calc(100%-320px)] "
            >
                <div className={cx('group_item')}>
                    {steps.map((step) => (
                        <div key={step.id} className={cx('item_container')} onClick={() => setActive(step.id)}>
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
                    <button className={cx('btn', 'w-full')} onClick={() => handleConfirm()}>
                        <span>Xác nhận</span>
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
            {active === 3 && <StepThree contentEmail={contentEmail} setContentEmail={setContentEmail} />}
            {active === 4 && (
                <StepFour
                    branch={branch}
                    setBranch={setBranch}
                    accountName={accountName}
                    setAccountName={setAccountName}
                    accountNumber={accountNumber}
                    setAccountNumber={setAccountNumber}
                    bankName={bankName}
                    setBankName={setBankName}
                />
            )}
        </>
    );
}

export default ConfirmEvent;
