import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './EventDetail.module.scss';
import { getEvent } from '../../../service/eventService';
import { Calendar, MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import { getImageSrc, getMinPrice, formatPrice, formatDate } from '../../../utils';

const cx = classNames.bind(styles);

function EventDetail(props) {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [isTicketOpen, setIsTicketOpen] = useState(true);

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    const fetchEvent = async () => {
        let data = await getEvent(eventId);
        if (data.EC === 0) {
            setEvent(data.DT);
        }
    };

    console.log(event);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('tbox-container')}>
                    <div className={cx('content')}>
                        <div className={cx('text_wrapper')}>
                            <div className={cx('circle_1', 'circle')}></div>
                            <div className={cx('circle_2', 'circle')}></div>
                            <div className={cx('description')}>
                                <div className={cx('info')}>
                                    <p className={cx('title')}>{event?.eventName}</p>
                                    <p className={cx('date')}>
                                        <Calendar size={22} />
                                        <span>{formatDate(event?.startDate)}</span>
                                    </p>
                                    <p className={cx('venue')}>
                                        <MapPin size={22} />
                                        <span>{event?.locationName}</span>
                                    </p>
                                    <p className={cx('address')}>{event?.address}</p>
                                </div>
                                <div className={cx('price')}>
                                    <div className={cx('ticket_price')}>
                                        Giá từ
                                        <span>{getMinPrice(event?.tickets)}</span>
                                    </div>
                                    <Link>
                                        <button className={cx('css_button')}>Mua vé ngay</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('img_wrapper')}>
                            <img
                                src={
                                    getImageSrc(event?.backgroundEvent) ||
                                    'https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761'
                                }
                                alt="background Event"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('tbox-container')}>
                <div className={cx('tbox-row')}>
                    <div className={cx('tbox-col-lg-9')}>
                        <div className={cx('event_detail')}>
                            <div className={cx('event_desc')}>
                                <h4 className={cx('title')}>Giới thiệu</h4>
                                <div className={cx('content')}>{event?.eventDescription || 'Updating...'}</div>
                            </div>
                            <div className={cx('ticket_info')}>
                                <h4 className={cx('title')}>Thông tin vé</h4>
                                <div className={cx('content')}>
                                    <div className={cx('header')} onClick={() => setIsTicketOpen(!isTicketOpen)}>
                                        <div className="flex gap-2 align-center">
                                            {isTicketOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                            <span>{formatDate(event?.startDate)}</span>
                                        </div>
                                        <div>
                                            <button className={cx('css_button')}>Mua vé ngay</button>
                                        </div>
                                    </div>
                                    {isTicketOpen && (
                                        <div className={cx('list_ticket')}>
                                            {event?.tickets.map((ticket, index) => (
                                                <div className={cx('ticket')} key={index}>
                                                    <span className={cx('text')}>{ticket.ticketName}</span>
                                                    <span className={cx('price')}>
                                                        {formatPrice(ticket?.ticketPrice)}đ
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={cx('organizer_info')}>
                                <h4 className={cx('title')}>Ban tổ chức</h4>
                                <div className={cx('content')}>
                                    <div className={cx('img_organizer')}>
                                        <img
                                            src={
                                                getImageSrc(event?.organizerLogo) ||
                                                'https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761'
                                            }
                                            alt="OrganizerImage"
                                        />
                                    </div>
                                    <div className={cx('content_organizer')}>
                                        <p className={cx('name')}>{event?.organizerName}</p>
                                        <div className={cx('description')}>{event?.organizerDesc}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('tbox-col-lg-3', 'desktop')}>
                        <div className={cx('advert')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;
