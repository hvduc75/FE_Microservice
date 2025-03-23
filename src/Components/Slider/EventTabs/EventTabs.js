import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { EventNextArrow, EventPrevArrow } from '../../GlobalStyles/CustomArrow/CustomArrow';

import styles from './EventTabs.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { updateScore } from '../../../service/eventService';
import { getImageSrc, formatDateHome, getMinPrice } from '../../../utils';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function EventTabs(props) {
    const { listEventDate } = props;
    const settings = {
        dots: false,
        infinite: listEventDate?.length > 1,
        slidesToShow: listEventDate?.length < 4 ? listEventDate?.length : 4,
        slidesToScroll: listEventDate?.length < 4 ? listEventDate?.length : 4,
        nextArrow: <EventNextArrow />,
        prevArrow: <EventPrevArrow />,
    };

    const handleUpdateScore = async (eventId) => {
        await updateScore(eventId);
    }

    return (
        <div className="slider-container">
            <Slider className={cx('customize-css')} {...settings}>
                {listEventDate &&
                    listEventDate.length > 0 &&
                    listEventDate.map((item, index) => (
                        <Link to={`/event-detail/${item.id}`} key={index} onClick={() => handleUpdateScore(item._id)} >
                            <div className={cx('container')} >
                                <div className={cx('banner')}>
                                    <img
                                        className={cx('slider-image')}
                                        src={
                                            getImageSrc(item.eventLogo) ||
                                            'https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761'
                                        }
                                        alt="banner"
                                    />
                                </div>
                                <div className={cx('content')}>
                                    <div className={cx('content_container')}>
                                        <span className={cx('title')}>{item.eventName}</span>
                                        <span className={cx('price')}>Từ {getMinPrice(item.tickets)}đ</span>
                                        <span className={cx('calendal')}>
                                            <Calendar />{' '}
                                            <span className={cx('time')}>{formatDateHome(item.startDate)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </Slider>
        </div>
    );
}

export default EventTabs;
