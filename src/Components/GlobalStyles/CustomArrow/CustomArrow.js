import React from 'react';
import classNames from 'classnames/bind';
import styles from './CustomArrow.module.scss';
import { ChevronRight, ChevronLeft  } from 'lucide-react';

const cx = classNames.bind(styles);

function SampleNextArrow({ onClick }) {
    return (
        <div className={cx('arrow-button', 'next-arrow')} onClick={onClick}>
            {<ChevronRight />}
        </div>
    );
}

function SamplePrevArrow({ onClick }) {
    return (
        <div className={cx('arrow-button', 'prev-arrow')} onClick={onClick}>
            {<ChevronLeft />}
        </div>
    );
}

function EventNextArrow({ onClick }) {
    return (
        <div className={cx('custom-arrow-button', 'next-arrow')} onClick={onClick}>
            {<ChevronRight />}
        </div>
    );
}

function EventPrevArrow({ onClick }) {
    return (
        <div className={cx('custom-arrow-button', 'prev-arrow')} onClick={onClick}>
            {<ChevronLeft />}
        </div>
    );
}

export { SampleNextArrow, SamplePrevArrow, EventNextArrow, EventPrevArrow };
