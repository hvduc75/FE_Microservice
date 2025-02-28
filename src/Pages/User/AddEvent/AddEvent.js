import React, { useState } from 'react';
import classNames from 'classnames/bind';

import style from './AddEvent.module.scss';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';

const cx = classNames.bind(style);

function AddEvent(props) {
    const [active, setActive] = useState(1);

    const handleContinue = () => {
        if (active < 4) {
            setActive(active + 1);
        }
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
                    <button className={cx('btn', 'w-full')}>
                        <span>Lưu</span>
                    </button>
                    <button className={cx('btn', 'btn_continue', 'w-full')}>
                        <span onClick={() => handleContinue()}>Tiếp tục</span>
                    </button>
                </div>
            </div>
            {active === 1 && <StepOne />}
            {active === 2 && <StepTwo />}
        </>
    );
}

export default AddEvent;
