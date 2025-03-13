import React from 'react';
import classNames from 'classnames/bind';

import BannerSlider from '../../../Components/Slider/BannerSlider/BannerSlider';
import EventHotSlider from '../../../Components/Slider/EventHotSlider/EventHotSlider';
import styles from './Home.module.scss';
import { GiSmallFire } from 'react-icons/gi';

const cx = classNames.bind(styles);

function Home(props) {
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
            </div>
        </div>
    );
}

export default Home;
