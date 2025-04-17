import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '../../../assets/images';

import styles from './PurchasedTickets.module.scss';

const cx = classNames.bind(styles);

function PurchasedTickets(props) {
    const [active, setActive] = useState(0);
    const [condition, setCondition] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Vé đã mua</div>
            <div className={cx('divider')}></div>
            <div className={cx('container')}>
                <div className={cx('list_item')}>
                    <div className={cx('item', active === 0 && 'active')} onClick={() => setActive(0)}>
                        Tất cả
                    </div>
                    <div className={cx('item', { active: active === 1 })} onClick={() => setActive(1)}>
                        Thành công
                    </div>
                    <div className={cx('item', { active: active === 2 })} onClick={() => setActive(2)}>
                        Đang xử lý
                    </div>
                    <div className={cx('item', { active: active === 3 })} onClick={() => setActive(3)}>
                        Đã hủy
                    </div>
                </div>
                <div className={cx('list_condition')}>
                    <div className={cx('condition', {active: condition === 0})} onClick={() => setCondition(0)}>Sắp diễn ra</div>
                    <div className={cx('condition', {active: condition === 1})} onClick={() => setCondition(1)}>Đã kết thúc</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content_empty')}>
                        <img src={images.avatar} alt="image_none" />
                        <span>Bạn chưa có vé nào</span>
                    </div>
                    <div className="mt-[80px]">
                        <Link to="/">
                            <button className={cx('btn')}>Mua vé ngay</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchasedTickets;
