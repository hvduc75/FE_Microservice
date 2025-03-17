import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { EventNextArrow, EventPrevArrow } from '../../GlobalStyles/CustomArrow/CustomArrow';

import styles from './EventTabs.module.scss';
import { getImageSrc } from '../../../utils';
import { Calendar } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

function EventTabs(props) {
    const { listEvent } = props;
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <EventNextArrow/>,
        prevArrow: <EventPrevArrow />,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {listEvent && listEvent.length > 0 && listEvent.map((item, index) => (
                    <div className={cx('container')} key={index}>
                        <div className={cx('banner')}>
                            <img
                                className={cx('slider-image')}
                                src={getImageSrc(item.eventLogo)}
                                alt="banner"
                            />
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('content_container')}>
                                <span className={cx('title')}>{item.eventName}</span>
                                <span className={cx('price')}>Từ {item.price}đ</span>
                                <span className={cx('calendal')}>
                                    <Calendar /> <span className={cx('time')}>{item.startDate}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className={cx('container')}>
                    <div className={cx('banner')}>
                        <img
                            className={cx('slider-image')}
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761"
                            alt="banner"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content_container')}>
                            <span className={cx('title')}>
                                [SKQT] [MUA 1 TẶNG 1] [Mã: QUOCTHAO50] Nhạc kịch: "Những Kẻ dị Mộng Mơ"- Em không có ước
                                mơ hả?
                            </span>
                            <span className={cx('price')}>Từ 80.000đ</span>
                            <span className={cx('calendal')}>
                                <Calendar /> <span className={cx('time')}>15 tháng 03, 2025</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('banner')}>
                        <img
                            className={cx('slider-image')}
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761"
                            alt="banner"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content_container')}>
                            <span className={cx('title')}>
                                [SKQT] [MUA 1 TẶNG 1] [Mã: QUOCTHAO50] Nhạc kịch: "Những Kẻ dị Mộng Mơ"- Em không có ước
                                mơ hả?
                            </span>
                            <span className={cx('price')}>Từ 80.000đ</span>
                            <span className={cx('calendal')}>
                                <Calendar /> <span className={cx('time')}>15 tháng 03, 2025</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('banner')}>
                        <img
                            className={cx('slider-image')}
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761"
                            alt="banner"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content_container')}>
                            <span className={cx('title')}>
                                [SKQT] [MUA 1 TẶNG 1] [Mã: QUOCTHAO50] Nhạc kịch: "Những Kẻ dị Mộng Mơ"- Em không có ước
                                mơ hả?
                            </span>
                            <span className={cx('price')}>Từ 80.000đ</span>
                            <span className={cx('calendal')}>
                                <Calendar /> <span className={cx('time')}>15 tháng 03, 2025</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('banner')}>
                        <img
                            className={cx('slider-image')}
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761"
                            alt="banner"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content_container')}>
                            <span className={cx('title')}>
                                [SKQT] [MUA 1 TẶNG 1] [Mã: QUOCTHAO50] Nhạc kịch: "Những Kẻ dị Mộng Mơ"- Em không có ước
                                mơ hả?
                            </span>
                            <span className={cx('price')}>Từ 80.000đ</span>
                            <span className={cx('calendal')}>
                                <Calendar /> <span className={cx('time')}>15 tháng 03, 2025</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default EventTabs;
