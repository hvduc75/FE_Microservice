import React from 'react';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header(props) {
    return (
        <div>
            <h1>Header Organizer</h1>
        </div>
    );
}

export default Header;