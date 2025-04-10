import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { SampleNextArrow, SamplePrevArrow } from '../../GlobalStyles/CustomArrow/CustomArrow';
import { Link } from 'react-router-dom';

import styles from './EventHotSlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getImageSrc } from '../../../utils';
import { updateScore } from '../../../service/eventService';

const cx = classNames.bind(styles);

function EventHotSlider({ listEventHot }) {
    console.log(listEventHot);
    const settings = {
        dots: false,
        infinite: listEventHot?.length > 4,
        slidesToShow: listEventHot.length > 4 ? 4 : listEventHot.length,
        slidesToScroll: listEventHot.length > 4 ? 4 : listEventHot.length,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const handleUpdateScore = async (eventId) => {
        await updateScore(eventId);
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {listEventHot &&
                    listEventHot.length > 0 &&
                    listEventHot.map((event, index) => (
                        <Link to={`/event-detail/${event.id}`} key={index} onClick={() => handleUpdateScore(event._id)}>
                            <div className={cx('container')} >
                                <div className={cx('banner')}>
                                    <img
                                        className={cx('slider-image')}
                                        src={
                                            event.backgroundEvent ||
                                            'https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761'
                                        }
                                        alt="eventImage"
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
            </Slider>
        </div>
    );
}

export default EventHotSlider;
