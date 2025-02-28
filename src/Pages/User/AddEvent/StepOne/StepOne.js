import React from 'react';
import classNames from 'classnames/bind';
import styles from './StepOne.module.scss';

import { FiInbox } from 'react-icons/fi';

const cx = classNames.bind(styles);

function StepOne(props) {
    return (
        <div style={{ padding: '72px 16px' }}>
                <div className="max-w-screen-2xl mx-auto rounded-lg p-6">
                    <div className={cx('feature_group')}>
                        <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                            <div className={cx('title')}>Upload hình ảnh</div>
                            <div className={cx('group_image')}>
                                <div className={cx('event_logo')}>
                                    <input type="file" id="event_logo" style={{ display: 'none' }} />
                                    <label htmlFor="event_logo" className={cx('upload_event_logo')}>
                                        <FiInbox style={{ width: '48px', height: '48px', color: '#2dc275' }} />
                                        <p>Thêm logo sự kiện</p>
                                    </label>
                                </div>
                                <div className={cx('event_image')}>
                                    <input type="file" id="event_image" style={{ display: 'none' }} />
                                    <label htmlFor="event_image" className={cx('upload_event_image')}>
                                        <FiInbox style={{ width: '48px', height: '48px', color: '#2dc275' }} />
                                        <p>Thêm ảnh nền sự kiện</p>
                                    </label>
                                </div>
                            </div>
                            <div className={cx('event')}>
                                <div className={cx('event_title')}>Tên sự kiện</div>
                                <input className={cx('css_input')} placeholder="Tên sự kiên" />
                            </div>
                        </div>
                        <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                            <div className={cx('title')}>Địa chỉ sự kiện</div>
                            <div className={cx('type_event')}>
                                <div className={cx('group')}>
                                    <input type="radio" id="offline" name="type_event" value="offline" />
                                    <label htmlFor="offline">Sự kiện Offline</label>
                                </div>
                                <div className={cx('group')}>
                                    <input type="radio" id="online" name="type_event" value="online" />
                                    <label htmlFor="online">Sự kiện Online</label>
                                </div>
                            </div>
                            <div className={cx('location')}>
                                <div className={cx('location_name')}>
                                    <div className={cx('custom_title')}>Tên sự kiện</div>
                                    <input
                                        style={{ height: '40px' }}
                                        className={cx('custom_input')}
                                        placeholder="Tên địa điểm"
                                    />
                                </div>
                                <div className={cx('detail_location')}>
                                    <div className="w-full">
                                        <div className={cx('custom_title')}>Tỉnh/Thành</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Tỉnh/Thành"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <div className={cx('custom_title')}>Quận/Huyện</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Quận/Huyện"
                                        />
                                    </div>
                                </div>
                                <div className={cx('detail_location')}>
                                    <div className="w-full">
                                        <div className={cx('custom_title')}>Phường/Xã</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Phường/Xã"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <div className={cx('custom_title')}>Số nhà, đường</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Số nhà, đường"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                            <div className="w-full mb-[24px]">
                                <div className={cx('custom_title')}>Thể loại sự kiện</div>
                                <input
                                    style={{ height: '40px' }}
                                    className={cx('custom_input')}
                                    placeholder="Vui lòng chọn"
                                />
                            </div>
                        </div>
                        <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                            <div className="w-full mb-[24px]">
                                <div className={cx('custom_title')}>Thông tin sự kiện</div>
                                <input
                                    style={{ height: '40px' }}
                                    className={cx('custom_input')}
                                    placeholder="Markdown"
                                />
                            </div>
                        </div>
                        <div className={cx('feature_item', 'p-4  bg-[#23252C] rounded-lg w-full mb-2 ')}>
                            <div className="flex gap-2 mb-[24px]">
                                <div className="w-[15%] h-[200px]">
                                    <input type="file" id="event_logo" style={{ display: 'none' }} />
                                    <label
                                        htmlFor="event_logo"
                                        className="border border-dashed border-[#fff] text-[#fff] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer h-full"
                                    >
                                        <FiInbox style={{ width: '40px', height: '40px', color: '#2dc275' }} />
                                        <p className="text-center">Thêm logo ban tổ chức</p>
                                    </label>
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="w-full">
                                        <div className={cx('custom_title')}>Tên ban tổ chức</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Tên ban tổ chức"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <div className={cx('custom_title')}>Thông tin ban tổ chức</div>
                                        <textarea
                                            style={{ height: '80px' }}
                                            className={cx('custom_input', 'outline-none')}
                                            placeholder="Thông tin ban tổ chức"
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