import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from './StepTwo.module.scss';

import { FaAngleUp } from 'react-icons/fa6';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCirclePlus } from 'react-icons/fa6';
import ModalAddTicket from '../../../../Components/Modal/ModalAddTicket/ModalAddTicket';

const cx = classNames.bind(styles);

function StepTwo(props) {
    const [showModal, setShowModal] = useState(false);

    const handleAddTicket = () => {
        setShowModal(true);
    }

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
                                    type='datetime-local'
                                        style={{ height: '40px' }}
                                        className={cx('custom_input')}
                                        placeholder="Thời gian bắt đầu"
                                    />
                                </div>
                                <div className="w-full mb-[24px]">
                                    <div className={cx('custom_title')}>Thời gian kết thúc</div>
                                    <input
                                    type='datetime-local'
                                        style={{ height: '40px' }}
                                        className={cx('custom_input')}
                                        placeholder="Thời gian kết thúc"
                                    />
                                </div>
                            </div>
                            <div className={cx('ticket_type')} >
                                <div className={cx('custom_title', 'text-lg font-bold')}>Loại vé</div>
                                <div className={cx('ticket_group')}>
                                    <button className='mt-[16px] py-[4px] px-[15px] w-full' onClick={() => handleAddTicket()}>
                                        <div className='flex items-center gap-2 justify-center text-[#2DC275]'>
                                            <FaCirclePlus style={{ width: '24px', height: '24px' }} />
                                            <span className='text-sm font-bold'>Tạo loại vé mới</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <ModalAddTicket setShowModal={setShowModal} />}
        </>
    );
}

export default StepTwo;
