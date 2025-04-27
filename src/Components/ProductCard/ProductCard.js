import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { Calendar } from 'lucide-react';
import { getMinPrice, formatDateHome } from '../../utils';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ item, index, handleUpdateScore, size }) {
    return (
        <Link className={cx({ small: size === 'small' })} to={`/event-detail/${item.id}`} key={index} onClick={() => handleUpdateScore(item._id)}>
            <div className={cx('container')}>
                <div className={cx('banner')}>
                    <img
                        className={cx('slider-image')}
                        src={
                            item.backgroundEvent ||
                            'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=KIjsfDl8R04Q7kNvwEvNhdp&_nc_oc=AdlgAJCMEy-lV0k1tezQVt8J2cl2gMO_ozmIAcmtlLe-jh_xay6IlapFh7qZhfyTRIE&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=siKdpnhSe-HYVvGy-C3aow&oh=00_AfGN5x22Dp1NU2Z8fmyAavmRwUjZ6PnJ2Fb0VY36MDwIFA&oe=6832F0A1'
                        }
                        alt="background event"
                    />
                </div>
                <div className={cx('content')}>
                    <div className={cx('content_container')}>
                        <span className={cx('title')}>{item.eventName}</span>
                        <span className={cx('price')}>Từ {getMinPrice(item.tickets)}</span>
                        <span className={cx('calendal')}>
                            <Calendar /> <span className={cx('time')}>{formatDateHome(item.startDate)}</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
