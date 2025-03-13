import React, { useState } from 'react';
import classNames from 'classnames/bind';

import BannerSlider from '../../../Components/Slider/BannerSlider/BannerSlider';
import EventHotSlider from '../../../Components/Slider/EventHotSlider/EventHotSlider';
import EventTabs from '../../../Components/Slider/EventTabs/EventTabs';
import EventTypeSlider from '../../../Components/Slider/EventTypeSlider/EventTypeSlider';
import styles from './Home.module.scss';
import { GiSmallFire } from 'react-icons/gi';
import { ChevronRight } from 'lucide-react';

const cx = classNames.bind(styles);

function Home(props) {
    const [active, setActive] = useState(0);

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
                        <div className={cx('this_week')}>Sân khấu & Nghệ thuật</div>
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
                        <div className={cx('this_week')}>Thể loại khác</div>
                        <div className={cx('tab_extra')}>
                            <span>Xem thêm</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className={cx('tabs_content')}>
                        <EventTypeSlider />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
