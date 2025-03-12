import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Language.module.scss';
import images from '../../assets/images';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Language(props) {
    const [language, setLanguage] = useState('vn'); // State lưu ngôn ngữ hiện tại

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        // Nếu cần lưu vào localStorage để nhớ sau khi reload
        localStorage.setItem('language', lang);
    };

    return (
        <>
            <Tippy
                interactive
                offset={[0, 1]}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('account-content')} tabIndex="-1" {...attrs}>
                        <div
                            onClick={() => handleLanguageChange('vn')}
                            className={`flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded ${
                                language === 'vn' ? 'bg-gray-200' : ''
                            }`}
                        >
                            <div className="w-6 h-6 bg-red-600 rounded-full overflow-hidden flex items-center justify-center">
                                <img src={images.flag_vn} alt="flag_vn" className="w-full h-full object-cover" />
                            </div>
                            Tiếng Việt
                        </div>
                        <div
                            onClick={() => handleLanguageChange('en')}
                            className={`flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded ${
                                language === 'en' ? 'bg-gray-200' : ''
                            }`}
                        >
                            <div className="w-6 h-6 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
                                <img src={images.flag_uk} alt="flag_uk" className="w-full h-full object-cover" />
                            </div>
                            English
                        </div>
                    </div>
                )}
            >
                <div className={cx('location')}>
                    <div className={cx('languages')}>
                        <div className={cx('flag-icon-container')}>
                            <img src={language === "vn" ? images.flag_vn : images.flag_uk} alt="flag_vn" />
                        </div>
                        <img
                            src={images.dropdown}
                            style={{ width: '8px', height: '8px', marginLeft: '8px' }}
                            alt="dropdown-icon"
                        />
                    </div>
                </div>
            </Tippy>
        </>
    );
}

export default Language;
