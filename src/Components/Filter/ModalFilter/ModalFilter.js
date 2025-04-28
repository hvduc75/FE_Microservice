import React from 'react';
import classNames from 'classnames/bind';

import styles from './ModalFilter.module.scss';

const cx = classNames.bind(styles);

function ModalFilter({ modalRef, location, setLocation, isFree, setIsFree, category, setCategory, handleApplyFilter, handleToggle }) {
    return (
        <div ref={modalRef} className={cx('group-filter')}>
            <div className={cx('header-filter')}>
                <strong>Vị trí</strong>
            </div>
            <div className={cx('list-location')}>
                {['', 'hcm', 'hn', 'dl'].map((loc) => (
                    <div key={loc} className={cx('location')}>
                        <input
                            type="radio"
                            id={loc || 'all'}
                            name="location"
                            checked={location === loc}
                            onChange={() => setLocation(loc)}
                        />
                        <label htmlFor={loc || 'all'}>
                            {loc === ''
                                ? 'Toàn quốc'
                                : loc === 'hcm'
                                ? 'Hồ Chí Minh'
                                : loc === 'hn'
                                ? 'Hà Nội'
                                : loc === 'dl'
                                ? 'Đà Lạt'
                                : ''}
                        </label>
                    </div>
                ))}
            </div>
            <div className={cx('divide')}></div>
            <div className={cx('title-price')}>
                <strong>Giá tiền</strong>
            </div>
            <div className={cx('group-price')}>
                <span>Miễn phí</span>
                <div className={cx('tabs', { active: isFree })} onClick={handleToggle}></div>
            </div>
            <div className={cx('divide')}></div>
            <div className={cx('genre-title')}>
                <strong>Thể loại</strong>
            </div>
            <div className={cx('list-genre')}>
                {['music', 'theatersandart', 'sport', 'others'].map((cate) => (
                    <div
                        key={cate}
                        className={cx('genre', category === cate && 'checked')}
                        onClick={() => setCategory(cate)}
                    >
                        {cate === 'music' && 'Nhạc sống'}
                        {cate === 'theatersandart' && 'Sân khấu & Nghệ thuật'}
                        {cate === 'sport' && 'Thể thao khác'}
                        {cate === 'others' && 'Khác'}
                    </div>
                ))}
            </div>
            <div className={cx('list-action')}>
                <button
                    className={cx('btn', 'btn_reset')}
                    onClick={() => {
                        setLocation('');
                        setIsFree(false);
                        setCategory('');
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

export default ModalFilter;
