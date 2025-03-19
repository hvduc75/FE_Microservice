import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useSearchParams } from 'react-router-dom';

import { search } from '../../../service/eventService';
import { getImageSrc } from '../../../utils';
import styles from './Search.module.scss';
import { Calendar, ChevronDown, Filter } from 'lucide-react';

const cx = classNames.bind(styles);

function Search(props) {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (category) {
            fetchEvents(category);
        }
    }, [category]);

    const fetchEvents = async (category) => {
        let categorySearch;
        if (category === 'music') {
            categorySearch = 1;
        } else if (category === 'others') {
            categorySearch = 4;
        } else if (category === 'theatersandart') {
            categorySearch = 2;
        }
        let data = await search(categorySearch, 1, 20);
        if (data.EC === 0) {
            setEvents(data.DT.events);
        }
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
        <div className={cx('wrapper')}>
            <div className={cx('tbox-container')}>
                <div className={cx('header')}>
                    <div className={cx('title')}>Kết quả tìm kiếm:</div>
                    <div className={cx('filter')}>
                        <button className={cx('filter-button')}>
                            <Calendar size={20} />
                            <span>Tất cả các ngày</span>
                            <ChevronDown size={20} />
                        </button>
                        <button className={cx('filter-button')}>
                            <Filter size={20} />
                            <span>Bộ lọc</span>
                            <ChevronDown size={20} />
                        </button>
                        <div className={cx('list_condition')}>
                            <div className={cx('item_condition')}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('tbox-container')}>
                <div className={cx('search_container')}>
                    {events &&
                        events.length > 0 &&
                        events.map((item, index) => (
                            <Link to={`/event-detail/${item.id}`} key={index}>
                                <div className={cx('container')}>
                                    <div className={cx('banner')}>
                                        <img
                                            className={cx('slider-image')}
                                            src={getImageSrc(item.eventLogo)}
                                            alt="background event"
                                        />
                                    </div>
                                    <div className={cx('content')}>
                                        <div className={cx('content_container')}>
                                            <span className={cx('title')}>{item.eventName}</span>
                                            <span className={cx('price')}>{getMinPrice(item.tickets)}</span>
                                            <span className={cx('calendal')}>
                                                <Calendar />{' '}
                                                <span className={cx('time')}>{formatDate(item.startDate)}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Search;
