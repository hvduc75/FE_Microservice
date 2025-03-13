import React from 'react';
import classNames from 'classnames/bind';
import styles from './CustomArrow.module.scss';

const cx = classNames.bind(styles);

function SampleNextArrow({ onClick }) {
    return (
        <div className={cx("arrow-button", "next-arrow")} onClick={onClick}>
            {'>'}
        </div>
    );
}

function SamplePrevArrow({ onClick }) {
    return (
        <div className={cx("arrow-button", "prev-arrow")} onClick={onClick}>
            {'<'}
        </div>
    );
}

export { SampleNextArrow, SamplePrevArrow };
