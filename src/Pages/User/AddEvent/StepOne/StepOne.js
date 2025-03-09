import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './StepOne.module.scss';

import { FiInbox } from 'react-icons/fi';
import Location from './Location/Location';
import { getEvent } from '../../../../service/eventService';

const cx = classNames.bind(styles);

function StepOne(props) {
    const [logoPreview, setLogoPreview] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(null);
    const [logoOrganizerPreview, setLogoOrganizerPreview] = useState(null);

    const eventTypes = ['Nhạc sống', 'Sân Khấu & Nghệ thuật', 'Thể Thao', 'Khác'];

    const {
        eventName,
        eventLogo,
        setEventLogo,
        backgroundEvent,
        setBackgroundEvent,
        setEventName,
        locationType,
        setLocationType,
        locationName,
        setLocationName,
        address,
        setAddress,
        eventType,
        setEventType,
        eventDescription,
        setEventDescription,
        organizerName,
        setOrganizerName,
        organizerDesc,
        setOrganizerDesc,
        organizerLogo,
        setOrganizerLogo,
    } = props;

    const handleImageChange = (event, setPreview, setImage) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const getImageSrc = (image) => {
        if (image && image.data) {
            const binary = new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), '');
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };    

    return (
        <div style={{ padding: '72px 16px' }}>
            <div className="max-w-screen-2xl mx-auto rounded-lg p-6">
                <div className={cx('feature_group')}>
                    <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                        <div className={cx('title')}>Upload hình ảnh</div>
                        <div className={cx('group_image')}>
                            <div className={cx('event_logo')}>
                                <input
                                    type="file"
                                    id="event_logo"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageChange(e, setLogoPreview, setEventLogo)}
                                />
                                <label htmlFor="event_logo" className={cx('upload_event_logo')}>
                                    {logoPreview || eventLogo ? (
                                        <img
                                            src={logoPreview || getImageSrc(eventLogo)}
                                            alt="Logo Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <>
                                            <FiInbox style={{ width: '48px', height: '48px', color: '#2dc275' }} />
                                            <p>Thêm logo sự kiện</p>
                                        </>
                                    )}
                                </label>
                            </div>
                            <div className={cx('event_image')}>
                                <input
                                    type="file"
                                    id="event_image"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageChange(e, setBackgroundPreview, setBackgroundEvent)}
                                />
                                <label htmlFor="event_image" className={cx('upload_event_image')}>
                                    {backgroundPreview || backgroundEvent ? (
                                        <img
                                            src={backgroundPreview || getImageSrc(backgroundEvent)}
                                            alt="Background Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <>
                                            <FiInbox style={{ width: '48px', height: '48px', color: '#2dc275' }} />
                                            <p>Thêm ảnh nền sự kiện</p>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className={cx('event')}>
                            <div className={cx('event_title')}>Tên sự kiện</div>
                            <input
                                className={cx('css_input')}
                                placeholder="Tên sự kiên"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                        <Location
                            address={address}
                            setAddress={setAddress}
                            locationName={locationName}
                            setLocationName={setLocationName}
                            locationType={locationType}
                            setLocationType={setLocationType}
                        />
                    </div>
                    <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                        <div className="w-full mb-[24px]">
                            <div className={cx('custom_title')}>Thể loại sự kiện</div>
                            <select
                                value={eventType}
                                style={{ height: '40px' }}
                                className={cx('custom_input')}
                                onChange={(e) => setEventType(e.target.value)}
                            >
                                {eventTypes.map((value, index) => (
                                    <option key={index} value={index + 1}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                        <div className="w-full mb-[24px]">
                            <div className={cx('custom_title')}>Thông tin sự kiện</div>
                            <input
                                style={{ height: '40px' }}
                                className={cx('custom_input')}
                                placeholder="Markdown"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                        <div className="flex gap-2 mb-[24px]">
                            <div className="w-[15%] h-[200px]">
                                <input
                                    type="file"
                                    id="event_logo_organizer"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageChange(e, setLogoOrganizerPreview, setOrganizerLogo)}
                                />
                                <label
                                    htmlFor="event_logo_organizer"
                                    className="border border-dashed border-[#fff] text-[#fff] rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer h-full"
                                >
                                    {logoOrganizerPreview || organizerLogo ? (
                                        <img
                                            src={logoOrganizerPreview || getImageSrc(organizerLogo)}
                                            alt="logo organizer Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <>
                                            <FiInbox style={{ width: '40px', height: '40px', color: '#2dc275' }} />
                                            <p className="text-center">Thêm logo ban tổ chức</p>
                                        </>
                                    )}
                                </label>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="w-full">
                                    <div className={cx('custom_title')}>Tên ban tổ chức</div>
                                    <input
                                        style={{ height: '40px' }}
                                        className={cx('custom_input')}
                                        placeholder="Tên ban tổ chức"
                                        value={organizerName}
                                        onChange={(e) => setOrganizerName(e.target.value)}
                                    />
                                </div>
                                <div className="w-full">
                                    <div className={cx('custom_title')}>Thông tin ban tổ chức</div>
                                    <textarea
                                        style={{ height: '90px' }}
                                        className={cx('custom_input', 'outline-none')}
                                        placeholder="Thông tin ban tổ chức"
                                        value={organizerDesc}
                                        onChange={(e) => setOrganizerDesc(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepOne;
