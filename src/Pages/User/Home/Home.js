import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import styles from './Home.module.scss';
import BannerSlider from '../../../Components/Slider/BannerSlider/BannerSlider';
import EventHotSlider from '../../../Components/Slider/EventHotSlider/EventHotSlider';
import EventTabs from '../../../Components/Slider/EventTabs/EventTabs';
import CategorySlider from '../../../Components/Slider/CategorySlider/CategorySlider';
import { search, getEventByTime, getEventByScore } from '../../../service/eventService';
import { GiSmallFire } from 'react-icons/gi';
import { ChevronRight } from 'lucide-react';

const cx = classNames.bind(styles);

function Home(props) {
    const navigate = useNavigate();
    const { t } = useTranslation("home");
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);
    const [listEventMusic, setListEventMusic] = useState([]);
    const [listEventOther, setListEventOther] = useState([]);
    const [listEventTheater, setListEventTheater] = useState([]);
    const [listEventDate, setListEventDate] = useState([]);
    const [listEventHot, setListEventHot] = useState([]);

    useEffect(() => {
        fetchData();
        fetchEventByTime();
    }, []);

    useEffect(() => {
        fetchEventByTime()
    }, [active]);

    const fetchData = async () => {
        setLoading(true); // Bắt đầu tải dữ liệu
        try {
            const [dataMusic, dataOther, dataTheater, dataHot] = await Promise.all([
                search(1, 1, 20),
                search(4, 1, 20),
                search(2, 1, 20),
                getEventByScore(),
            ]);

            if (dataMusic.EC === 0) setListEventMusic(dataMusic.DT.events);
            if (dataOther.EC === 0) setListEventOther(dataOther.DT.events);
            if (dataTheater.EC === 0) setListEventTheater(dataTheater.DT.events);
            if (dataHot.EC === 0) setListEventHot(dataHot.DT);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
        setLoading(false); 
    };

    const fetchEventByTime = async () => {
        let dataDate;
        if (active === 0) {
            dataDate = await getEventByTime('this_week', 1, 20);
        } else if (active === 1) {
            dataDate = await getEventByTime('this_month', 1, 20);
        }

        if (dataDate && dataDate.EC === 0) {
            setListEventDate(dataDate.DT.events);
        }
    };

    const handleClickExtra = (category) => {
        if (category === 'date') {
            if (active === 0) {
                navigate('search?date=this_week');
            }
            if (active === 1) {
                navigate('search?date=this_month');
            }
        } else {
            navigate(`search?category=${category}`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-md z-50">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className={cx('tbox-container')}>
                    <div className={cx('list_banner')}>
                        <BannerSlider listEventHot={listEventHot} />
                    </div>
                    <div className={cx('event_special')}>
                        <div className={cx('title')}>{t("specialEvents")}</div>
                        <div className={cx('event_container')}></div>
                    </div>
                    <div className={cx('event_hot')}>
                        <div className={cx('title')}>
                            <GiSmallFire fill="#ffbe40" size={24} />
                            <span className={cx('label')}>{t("trendingEvents")}</span>
                        </div>
                        <div className={cx('list_event_hot')}>
                            <EventHotSlider listEventHot={listEventHot} />
                        </div>
                    </div>
                    <div className={cx('tabs_wrapper')}>
                        <div className={cx('tablist')}>
                            <div className={cx('tab_container')}>
                                <div className={cx('tab')} onClick={() => setActive(0)}>
                                    <div className={cx('this_week', active === 0 ? 'active' : '')}>{t('thisWeek')}</div>
                                </div>
                                <div className={cx('tab')} onClick={() => setActive(1)}>
                                    <div className={cx('this_month', active === 1 ? 'active' : '')}>{t('thisMonth')}</div>
                                </div>
                            </div>
                            <div className={cx('tab_extra')} onClick={() => handleClickExtra('date')}>
                                <span>{t('viewMore')}</span>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                        <div className={cx('tabs_content')}>
                            <EventTabs listEventDate={listEventDate} />
                        </div>
                    </div>
                    <div className={cx('event_type_wrapper')}>
                        <div className={cx('tablist')}>
                            <div className={cx('this_week')}>{t('category.music')}</div>
                            <div className={cx('tab_extra')} onClick={() => handleClickExtra('music')}>
                                <span>{t('viewMore')}</span>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                        <div className={cx('tabs_content')}>
                            <CategorySlider listEvent={listEventMusic} />
                        </div>
                    </div>
                    <div className={cx('event_type_wrapper')}>
                        <div className={cx('tablist')}>
                            <div className={cx('this_week')}>{t('category.art')}</div>
                            <div className={cx('tab_extra')} onClick={() => handleClickExtra('theatersandart')}>
                                <span>{t('viewMore')}</span>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                        <div className={cx('tabs_content')}>
                            <CategorySlider listEvent={listEventTheater} />
                        </div>
                    </div>
                    <div className={cx('event_type_wrapper')}>
                        <div className={cx('tablist')}>
                            <div className={cx('this_week')}>{t('category.others')}</div>
                            <div className={cx('tab_extra')} onClick={() => handleClickExtra('others')}>
                                <span>{t('viewMore')}</span>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                        <div className={cx('tabs_content')}>
                            <CategorySlider listEvent={listEventOther} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
