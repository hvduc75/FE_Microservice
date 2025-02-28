import React from 'react';
import classNames from 'classnames/bind';
import styles from './StepTwo.module.scss';

const cx = classNames.bind(styles);

function StepTwo(props) {
    return (
        <div style={{ padding: '72px 16px' }}>
            <div className="max-w-screen-2xl mx-auto rounded-lg p-6">
                <h1 className="text-[#fff]">nhin cai dell gi</h1>
            </div>
        </div>
    );
}

export default StepTwo;
