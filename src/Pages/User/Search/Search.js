import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';
import { search, updateScore } from '../../../service/eventService';
import { formatDateHome, getMinPrice } from '../../../utils';
import { Calendar, ChevronDown, Filter, X, CircleX } from 'lucide-react';
import ModalFilter from '../../../Components/Filter/ModalFilter/ModalFilter';
import ModalFilterTime from '../../../Components/Filter/ModalFilterTime/ModalFilterTime';

const cx = classNames.bind(styles);

function Search(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const modalRef = useRef();
    const modalTimeRef = useRef();

    const [modalFilter, setModalFilter] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);

    const [location, setLocation] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [selectedDateLabel, setSelectedDateLabel] = useState('Tất cả các ngày');

    const [selectedFilters, setSelectedFilters] = useState([]);

    const dateParam = searchParams.get('date');
    const q = searchParams.get('q');
    const categoryParam = searchParams.get('category');
    const locationParam = searchParams.get('location');
    const isFreeParam = searchParams.get('isFree');

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalFilter(false);
            }
            if (modalTimeRef.current && !modalTimeRef.current.contains(event.target)) {
                setModalFilterTime(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDate(dateParam || '');
        updateSelectedDateLabel();
        const initialFilters = [];
        if (locationParam) {
            initialFilters.push({
                type: 'location',
                value:
                    locationParam === 'hcm'
                        ? 'Hồ Chí Minh'
                        : locationParam === 'hn'
                        ? 'Hà Nội'
                        : locationParam === 'dl'
                        ? 'Đà Lạt'
                        : '',
            });
        }
        if (isFreeParam === 'true') {
            initialFilters.push({ type: 'isFree', value: 'Miễn phí' });
        }
        if (categoryParam) {
            let categoryLabel = '';
            if (categoryParam === 'music') categoryLabel = 'Nhạc sống';
            else if (categoryParam === 'theatersandart') categoryLabel = 'Sân khấu & Nghệ thuật';
            else if (categoryParam === 'sport') categoryLabel = 'Thể thao khác';
            else if (categoryParam === 'others') categoryLabel = 'Khác';
            initialFilters.push({ type: 'category', value: categoryLabel });
        }
        setSelectedFilters(initialFilters);
    }, [locationParam, isFreeParam, categoryParam, dateParam]);

    useEffect(() => {
        let initialCategory = categoryParam || '';
        let initialLocation = locationParam || '';
        let initialIsFree = isFreeParam === 'true';
        setCategory(initialCategory);
        setLocation(initialLocation);
        setIsFree(initialIsFree);

        fetchEvents(categoryParam, q, dateParam, locationParam, isFreeParam);
    }, [searchParams]);

    const fetchEvents = async (category, q, date, location, isFree) => {
        let categorySearch = undefined;
        if (category === 'music') {
            categorySearch = 1;
        } else if (category === 'others') {
            categorySearch = 4;
        } else if (category === 'theatersandart') {
            categorySearch = 2;
        }
        let data = await search(categorySearch, q, 1, 20, date, location, isFree);
        if (data.EC === 0) {
            setEvents(data.DT.events);
        }
    };

    const updateSelectedDateLabel = () => {
        setSelectedDateLabel(() => {
            switch (dateParam) {
                case 'today':
                    return 'Hôm nay';
                case 'tomorrow':
                    return 'Ngày mai';
                case 'this_week':
                    return 'Cuối tuần này';
                case 'this_month':
                    return 'Tháng này';
                default:
                    return 'Tất cả các ngày';
            }
        });
    };

    const handleUpdateScore = async (eventId) => {
        await updateScore(eventId);
    };

    const handleFilter = () => {
        setModalFilterTime(false);
        setModalFilter(!modalFilter);
    };

    const handleFilterTime = () => {
        setModalFilter(false);
        setModalFilterTime(!modalFilterTime);
    };

    const handleToggle = () => {
        setIsFree(!isFree);
    };

    const handleApplyFilter = () => {
        const params = {};

        if (category) params.category = category;
        if (location) params.location = location;
        if (isFree) params.isFree = true;
        if (date) params.date = date;
        if (q) params.q = q;

        setSearchParams(params);
        updateSelectedDateLabel();
        const filters = [];
        if (location)
            filters.push({
                type: 'location',
                value:
                    location === 'hcm'
                        ? 'Hồ Chí Minh'
                        : location === 'hn'
                        ? 'Hà Nội'
                        : location === 'dl'
                        ? 'Đà Lạt'
                        : '',
            });
        if (isFree) filters.push({ type: 'isFree', value: 'Miễn phí' });
        if (category) {
            let categoryLabel = '';
            if (category === 'music') categoryLabel = 'Nhạc sống';
            else if (category === 'theatersandart') categoryLabel = 'Sân khấu & Nghệ thuật';
            else if (category === 'sport') categoryLabel = 'Thể thao khác';
            else if (category === 'others') categoryLabel = 'Khác';
            filters.push({ type: 'category', value: categoryLabel });
        }
        setSelectedFilters(filters);
        setModalFilter(false);
        setModalFilterTime(false);
    };

    const handleRemoveFilter = (filter) => {
        const updatedFilters = selectedFilters.filter((f) => f.type !== filter.type);
        setSelectedFilters(updatedFilters);

        const params = Object.fromEntries([...searchParams]);

        if (filter.type === 'location') {
            delete params.location;
            setLocation('');
        } else if (filter.type === 'isFree') {
            delete params.isFree;
            setIsFree(false);
        } else if (filter.type === 'category') {
            delete params.category;
            setCategory('');
        }

        setSearchParams(params);
    };

    const handleDateSelection = (selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tbox-container')}>
                <div className={cx('header')}>
                    <div className={cx('title')}>Kết quả tìm kiếm:</div>
                    <div className={cx('filter-container')}>
                        <div className={cx('filter')}>
                            <button
                                className={cx('filter-button', (modalFilterTime || date !== '') && 'active')}
                                onClick={() => handleFilterTime()}
                            >
                                <Calendar size={20} fill="white" />
                                <span>{selectedDateLabel}</span>
                                {modalFilterTime ? <X size={20} /> : <ChevronDown size={20} />}
                            </button>
                            {modalFilterTime && (
                                <ModalFilterTime
                                    modalTimeRef={modalTimeRef}
                                    handleApplyFilter={handleApplyFilter}
                                    date={date}
                                    setDate={setDate}
                                    handleDateSelection={handleDateSelection}
                                />
                            )}
                        </div>
                        <div className={cx('filter')}>
                            <button
                                className={cx('filter-button', (modalFilter || selectedFilters.length > 0) && 'active')}
                                onClick={() => handleFilter()}
                            >
                                <Filter size={20} fill="white" />
                                <span>Bộ lọc</span>
                                {modalFilter ? <X size={20} /> : <ChevronDown size={20} />}
                            </button>
                            {modalFilter && (
                                <ModalFilter
                                    modalRef={modalRef}
                                    location={location}
                                    setLocation={setLocation}
                                    isFree={isFree}
                                    setIsFree={setIsFree}
                                    category={category}
                                    setCategory={setCategory}
                                    handleApplyFilter={handleApplyFilter}
                                    handleToggle={handleToggle}
                                />
                            )}
                        </div>
                        <div className={cx('list_condition')}>
                            {selectedFilters.map((filter, idx) => (
                                <div
                                    key={idx}
                                    className={cx('item_condition')}
                                    onClick={() => handleRemoveFilter(filter)}
                                >
                                    <CircleX size={16} />
                                    <span>{filter.value}</span>
                                </div>
                            ))}
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
