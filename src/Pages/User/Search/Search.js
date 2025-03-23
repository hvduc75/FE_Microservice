import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useSearchParams } from 'react-router-dom';

import { search, getEventByTime } from '../../../service/eventService';
import { getImageSrc, formatDateHome, getMinPrice } from '../../../utils';
import styles from './Search.module.scss';
import { Calendar, ChevronDown, Filter } from 'lucide-react';

const cx = classNames.bind(styles);

function Search(props) {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const date = searchParams.get('date');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (category) {
            fetchEvents(category);
        }
        if(date) {
            fetchEventByTime(date);
        }
    }, [category, date]);

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

    const fetchEventByTime = async (date) => {
        let data = await getEventByTime(date, 1, 20);
        if (data.EC === 0) {
            setEvents(data.DT.events);
        }
    }

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
                                                <span className={cx('time')}>{formatDateHome(item.startDate)}</span>
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
