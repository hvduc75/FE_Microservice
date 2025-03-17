import React from 'react';
import classNames from 'classnames/bind';

import styles from './CategorySlider.module.scss';
import { Calendar } from 'lucide-react';

const cx = classNames.bind(styles);

function CategorySlider(props) {
    const { listEvent } = props;

    const getImageSrc = (image) => {
        if (image && image.data) {
            const binary = new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), '');
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    const getMinPrice = (tickets) => {
        if (!tickets || tickets.length === 0) return 'Đang cập nhật';
        let minPrice = Math.min(...tickets.map((ticket) => ticket.ticketPrice));
        return `Từ ${minPrice.toLocaleString('vi-VN')}đ`;
    };

    return (
        <div className={cx('slider-container')}>
            {listEvent &&
                listEvent.length > 0 &&
                listEvent.slice(0, 4).map((item, index) => (
                    <div className={cx('container')} key={index}>
                        <div className={cx('banner')}>
                            <img
                                className={cx('slider-image')}
                                src={
                                    getImageSrc(item.eventLogo) ||
                                    'https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761'
                                }
                                alt="background event"
                            />
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('content_container')}>
                                <span className={cx('title')}>{item.eventName}</span>
                                <span className={cx('price')}>{getMinPrice(item.tickets)}</span>
                                <span className={cx('calendal')}>
                                    <Calendar /> <span className={cx('time')}>{formatDate(item.startDate)}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default CategorySlider;
