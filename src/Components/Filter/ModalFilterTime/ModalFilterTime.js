import React from 'react';
import classNames from 'classnames/bind';

import styles from './ModalFilterTime.module.scss';

const cx = classNames.bind(styles);

function ModalFilterTime({ modalTimeRef, date, setDate, handleApplyFilter, handleDateSelection }) {
    return (
        <div ref={modalTimeRef} className={cx('group-filter')}>
            <div className={cx('header-filter')}>
                <div className={cx('header-item', date === '' && 'checked')} onClick={() => handleDateSelection('')}>
                    Tất cả các ngày
                </div>
                <div
                    className={cx('header-item', date === 'today' && 'checked')}
                    onClick={() => handleDateSelection('today')}
                >
                    Hôm nay
                </div>
                <div
                    className={cx('header-item', date === 'tomorrow' && 'checked')}
                    onClick={() => handleDateSelection('tomorrow')}
                >
                    Ngày mai
                </div>
                <div
                    className={cx('header-item', date === 'this_week' && 'checked')}
                    onClick={() => handleDateSelection('this_week')}
                >
                    Cuối tuần này
                </div>
                <div
                    className={cx('header-item', date === 'this_month' && 'checked')}
                    onClick={() => handleDateSelection('this_month')}
                >
                    Tháng này
                </div>
            </div>
            <div className={cx('divide')}></div>
            <div className={cx('list-action')}>
                <button
                    className={cx('btn', 'btn_reset')}
                    onClick={() => {
                        setDate('');
                    }}
                >
                    Thiết lập lại
                </button>
                <button className={cx('btn', 'btn_apply')} onClick={handleApplyFilter}>
                    Áp dụng
                </button>
            </div>
        </div>
    );
}

export default ModalFilterTime;
