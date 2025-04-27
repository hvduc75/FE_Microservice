import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';
import { search, getEventByTime, updateScore } from '../../../service/eventService';
import { formatDateHome, getMinPrice } from '../../../utils';
import { Calendar, ChevronDown, Filter, X } from 'lucide-react';

const cx = classNames.bind(styles);

function Search(props) {
    const [searchParams] = useSearchParams();
    const [modalFilter, setModalFilter] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);
    const category = searchParams.get('category');
    const date = searchParams.get('date');
    const q = searchParams.get('q');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (category || q) {
            fetchEvents(category, q);
        }
        if (date) {
            fetchEventByTime(date);
        }
    }, [category, date, q]);

    const fetchEvents = async (category, q) => {
        let categorySearch = undefined;
        if (category === 'music') {
            categorySearch = 1;
        } else if (category === 'others') {
            categorySearch = 4;
        } else if (category === 'theatersandart') {
            categorySearch = 2;
        }
        let data = await search(categorySearch, q, 1, 20);
        if (data.EC === 0) {
            setEvents(data.DT.events);
        }
    };

    const fetchEventByTime = async (date) => {
        let data = await getEventByTime(date, 1, 20);
        if (data.EC === 0) {
            setEvents(data.DT.events);
        }
    };

    const handleUpdateScore = async (eventId) => {
        await updateScore(eventId);
    };

    const handleFilter = () => {
        setModalFilter(!modalFilter);
    };

    const handleFilterTime = () => {
        setModalFilterTime(!modalFilterTime);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tbox-container')}>
                <div className={cx('header')}>
                    <div className={cx('title')}>Kết quả tìm kiếm:</div>
                    <div className={cx('filter')}>
                        <button className={cx('filter-button', modalFilterTime && 'active')} onClick={() => handleFilterTime()}>
                            <Calendar size={20} fill='white'/>
                            <span>Tất cả các ngày</span>
                            {modalFilterTime ? <X size={20} /> : <ChevronDown size={20} />}
                        </button>
                        <button className={cx('filter-button', modalFilter && 'active')} onClick={() => handleFilter()}>
                            <Filter size={20} fill="white" />
                            <span>Bộ lọc</span>
                            {modalFilter ? <X size={20} /> : <ChevronDown size={20} />}
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
                            <Link
                                to={`/event-detail/${item.id}`}
                                key={index}
                                onClick={() => handleUpdateScore(item._id)}
                            >
                                <div className={cx('container')}>
                                    <div className={cx('banner')}>
                                        <img
                                            className={cx('slider-image')}
                                            src={item.eventLogo}
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
