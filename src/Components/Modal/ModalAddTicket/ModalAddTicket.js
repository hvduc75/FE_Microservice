import React, { useState } from 'react';
import classNames from 'classnames/bind';

import style from './ModalAddTicket.module.scss';
import { IoClose } from 'react-icons/io5';
import { FiInbox } from 'react-icons/fi';

const cx = classNames.bind(style);

function ModalAddTicket({ setShowModal }) {
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
                                    />
                                </div>
                                <div className="flex md:flex-row flex-col gap-10 w-full justify-between mb-6">
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Giá vé</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Giá vé"
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Tổng số lượng vé</div>
                                        <input
                                            style={{ height: '40px', minWidth: '230px' }}
                                            className={cx('custom_input')}
                                            placeholder="Tổng số lượng vé"
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Số vé tối thiểu trong một đơn hàng</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Số vé tối thiểu trong một đơn hàng"
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Số vé tối đa trong một đơn hàng</div>
                                        <input
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Số vé tối đa trong một đơn hàng"
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
                                        />
                                    </div>
                                    <div className="w-full mb-6">
                                        <div className={cx('custom_title')}>Thời gian kết thúc bán vé</div>
                                        <input
                                            type="datetime-local"
                                            style={{ height: '40px' }}
                                            className={cx('custom_input')}
                                            placeholder="Thời gian kết thúc bán vé"
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
                                            />
                                        </div>
                                    </div>
                                    <div className="w-[350px] h-[170px]">
                                        <div className={cx('custom_title')}>Hình ảnh vé</div>
                                        <input type="file" id="event_logo" style={{ display: 'none' }} />
                                        <label
                                            htmlFor="event_logo"
                                            className="border border-dashed border-[#fff] text-[#fff] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer h-full"
                                        >
                                            <FiInbox style={{ width: '40px', height: '40px', color: '#2dc275' }} />
                                            <p className="text-center">Thêm</p>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={cx('modal_footer')}>
                        <div className='flex justify-center pl-3 pr-3 pb-3'>
                            <button>
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
