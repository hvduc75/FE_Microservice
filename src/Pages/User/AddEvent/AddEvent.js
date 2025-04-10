import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addEvent, getEvent, editEvent, updateBankAccount, updateContentEmail } from '../../../service/eventService';
import { RefreshCcw } from 'lucide-react';
import classNames from 'classnames/bind';
import style from './AddEvent.module.scss';
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

function AddEvent(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setChangeSidebar, setEventId } = useOutletContext();
    const { eventId } = useParams();
    const [newEventId, setNewEventId] = useState('');
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
    const [checkStepTwo, setCheckStepTwo] = useState(false);
    const [contentEmail, setContentEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (eventId || newEventId) {
            fetchEvent(eventId || newEventId);
            if (eventId && location.pathname.includes('edit')) {
                setEventId(eventId);
                setChangeSidebar(true);
            } else {
                setChangeSidebar(false);
                setEventId('');
            }
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
    }, [eventId, newEventId]);

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

    const validateStepTwo = () => {
        if (!eventStartDate || !eventEndDate || !checkStepTwo) {
            return false;
        } else {
            return true;
        }
    };

    const handleSave = async () => {
        if (loading) return;
        setLoading(true);
        if (active === 1) {
            const finalEventId = eventId || newEventId;

            if (!finalEventId) {
                let res = await addEvent(data);
                if (res.EC === 0) {
                    toast.success('Lưu thông tin sự kiện thành công');
                    setNewEventId(res.DT._id);
                    navigate(`/organizer/create-event/${res.DT._id}`);
                } else {
                    toast.error('Lưu thông tin sự kiện thất bại');
                }
            } else {
                let res = await editEvent({ eventId: finalEventId, ...data });
                if (res.EC === 0) {
                    toast.success('Lưu thông tin sự kiện thành công');
                } else {
                    toast.error('Lưu thông tin sự kiện thất bại');
                }
            }
        } else if (active === 2) {
            if (!validateStepTwo()) {
                toast.error('Lưu thông tin sự kiện thất bại');
                setLoading(false);
                return;
            }
            toast.success('Lưu thông tin sự kiện thành công');
        } else if (active === 3) {
            if (!contentEmail) {
                toast.error('Lưu thông tin sự kiện thất bại');
                setLoading(false);
                return;
            }
            let data = await updateContentEmail(eventId, contentEmail);
            if (data.EC === 0) {
                toast.success('Lưu thông tin sự kiện thành công');
            }
        } else if (active === 4) {
            if (!branch || !accountName || !accountNumber || !bankName) {
                toast.error('Lưu thông tin sự kiện thất bại');
                setLoading(false);
                return;
            }
            let data = await updateBankAccount(eventId, accountName, accountNumber, bankName, branch);
            if (data.EC === 0) {
                toast.success('Lưu thông tin sự kiện thành công');
            }
        }
        setLoading(false);
    };

    const handleContinue = async () => {
        if (loading) return;
        setLoading(true);
        const finalEventId = eventId || newEventId;

        if (active === 1) {
            if (!finalEventId) {
                let res = await addEvent(data);
                if (res.EC === 0) {
                    toast.success('Lưu thông tin sự kiện thành công');
                    setNewEventId(res.DT._id);
                    navigate(`/organizer/create-event/${res.DT._id}`);
                    if (active < 4) {
                        setActive(active + 1);
                    }
                } else {
                    toast.error('Lưu thông tin sự kiện thất bại');
                }
            } else {
                let res = await editEvent({ eventId: finalEventId, ...data });
                if (res.EC === 0) {
                    toast.success('Lưu thông tin sự kiện thành công');
                    if (active < 4) {
                        setActive(active + 1);
                    }
                } else {
                    toast.error('Lưu thông tin sự kiện thất bại');
                }
            }
        } else if (active === 2) {
            if (!validateStepTwo()) {
                toast.error('Lưu thông tin sự kiện thất bại');
                setLoading(false);
                return;
            }
            toast.success('Lưu thông tin sự kiện thành công');
            if (active < 4) {
                setActive(active + 1);
            }
        } else if (active === 3) {
            if (!contentEmail) {
                toast.error('Lưu thông tin sự kiện thất bại');
                setLoading(false);
                return;
            }
            let data = await updateContentEmail(eventId, contentEmail);
            if (data.EC === 0) {
                toast.success('Lưu thông tin sự kiện thành công');
            } else {
                toast.error('Lưu thông tin sự kiện thất bại');
                setLoading(false);
                return;
            }
            if (active < 4) {
                setActive(active + 1);
            }
        } else if (active === 4) {
            if (!branch || !accountName || !accountNumber || !bankName) {
                toast.error('Lưu thông tin sự kiện thất bại');
                setLoading(false);
                return;
            }
            let data = await updateBankAccount(eventId, accountName, accountNumber, bankName, branch);
            if (data.EC === 0) {
                toast.success('Lưu thông tin sự kiện thành công');
            }
        }
        setLoading(false);
    };

    return (
        <>
            <div
                style={{ background: 'background: rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(30px)' }}
                className="flex flex-row items-center justify-center px-1 mb-2 border-b border-[#38383D] pt-2 fixed top-[64px] bg-black-30 backdrop-blur-50 w-[calc(100%-250px)] " // z-10
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
                    {/* <button className={cx('btn', 'w-full')} onClick={() => handleSave()}>
                        <span>Lưu</span>
                        <RefreshCcw className="w-4 h-4 ml-1" />
                    </button>
                    <button className={cx('btn', 'btn_continue', 'w-full')} onClick={() => handleContinue()}>
                        <span>Tiếp tục</span>
                        <RefreshCcw className="w-4 h-4 ml-1" />
                    </button> */}
                    <button className={cx('btn', 'w-full')} onClick={handleSave} disabled={loading}>
                        <span>
                            Lưu
                            {loading && (
                                <RefreshCcw className={classNames('w-4 h-4 ml-1', { 'animate-spin': loading })} />
                            )}
                        </span>
                    </button>
                    <button className={cx('btn', 'btn_continue', 'w-full')} onClick={handleContinue} disabled={loading}>
                        <span>
                            Tiếp tục
                            {loading && (
                                <RefreshCcw className={classNames('w-4 h-4 ml-1', { 'animate-spin': loading })} />
                            )}
                        </span>
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
                    setCheckStepTwo={setCheckStepTwo}
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

export default AddEvent;
