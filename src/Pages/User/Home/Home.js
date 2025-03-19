import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import BannerSlider from '../../../Components/Slider/BannerSlider/BannerSlider';
import EventHotSlider from '../../../Components/Slider/EventHotSlider/EventHotSlider';
import EventTabs from '../../../Components/Slider/EventTabs/EventTabs';
import CategorySlider from '../../../Components/Slider/CategorySlider/CategorySlider';
import styles from './Home.module.scss';
import { search } from '../../../service/eventService';
import { GiSmallFire } from 'react-icons/gi';
import { ChevronRight } from 'lucide-react';

const cx = classNames.bind(styles);

function Home(props) {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const [listEventMusic, setListEventMusic] = useState([]);
    const [listEventOther, setListEventOther] = useState([]);
    const [listEventTheater, setListEventTheater] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [dataMusic, dataOther, dataTheater] = await Promise.all([
                search(1, 1, 20),
                search(4, 1, 20),
                search(2, 1, 20)
            ]);
    
            if (dataMusic.EC === 0) setListEventMusic(dataMusic.DT.events);
            if (dataOther.EC === 0) setListEventOther(dataOther.DT.events);
            if (dataTheater.EC === 0) setListEventTheater(dataTheater.DT.events);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };    

    const handleClickExtra = (category) => {
        navigate(`search?category=${category}`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('tbox-container')}>
                <div className={cx('list_banner')}>
                    <BannerSlider />
                </div>
                <div className={cx('event_special')}>
                    <div className={cx('title')}>Sự kiện đặc biệt</div>
                    <div className={cx('event_container')}></div>
                </div>
                <div className={cx('event_hot')}>
                    <div className={cx('title')}>
                        <GiSmallFire fill="#ffbe40" size={24} />
                        <span className={cx('label')}>Sự kiện xu hướng</span>
                    </div>
                    <div className={cx('list_event_hot')}>
                        <EventHotSlider />
                    </div>
                </div>
                <div className={cx('tabs_wrapper')}>
                    <div className={cx('tablist')}>
                        <div className={cx('tab_container')}>
                            <div className={cx('tab')} onClick={() => setActive(0)}>
                                <div className={cx('this_week', active === 0 ? 'active' : '')}>Cuối tuần này</div>
                            </div>
                            <div className={cx('tab')} onClick={() => setActive(1)}>
                                <div className={cx('this_month', active === 1 ? 'active' : '')}>Tháng này</div>
                            </div>
                        </div>
                        <div className={cx('tab_extra')}>
                            <span>Xem thêm</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className={cx('tabs_content')}>
                        <EventTabs />
                    </div>
                </div>
                <div className={cx('event_type_wrapper')}>
                    <div className={cx('tablist')}>
                        <div className={cx('this_week')}>Nhạc sống</div>
                        <div className={cx('tab_extra')} onClick={() => handleClickExtra('music')}>
                            <span>Xem thêm</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className={cx('tabs_content')}>
                        <CategorySlider listEvent={listEventMusic} />
                    </div>
                </div>
                <div className={cx('event_type_wrapper')}>
                    <div className={cx('tablist')}>
                        <div className={cx('this_week')}>Sân khấu & Nghệ thuật</div>
                        <div className={cx('tab_extra')} onClick={() => handleClickExtra('theatersandart')}>
                            <span>Xem thêm</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className={cx('tabs_content')}>
                        <CategorySlider listEvent={listEventTheater} />
                    </div>
                </div>
                <div className={cx('event_type_wrapper')}>
                    <div className={cx('tablist')}>
                        <div className={cx('this_week')}>Thể loại khác</div>
                        <div className={cx('tab_extra')} onClick={() => handleClickExtra('others')}>
                            <span>Xem thêm</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className={cx('tabs_content')}>
                        <CategorySlider listEvent={listEventOther} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
