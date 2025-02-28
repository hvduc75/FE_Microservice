import React from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';

import styles from './Header.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import images from '../../../../assets/images';
import { updateItemActive } from '../../../../redux/action/eventAction';

const cx = classNames.bind(styles);

function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddEvent = () => {
        dispatch(updateItemActive(''));
        navigate('/organizer/add-event');
    };

    return (
        <div className={cx('wrapper')}>
            <div className="flex items-center">
                <div className="font-bold text-2xl text-white truncate w-[450px]">Sự kiện của tôi</div>
            </div>
            <div className="flex w-full justify-end">
                <div
                    onClick={() => handleAddEvent()}
                    className="px-3 py-[5.5px] bg-[#2dc275] rounded-[39px] justify-start items-center gap-2 inline-flex hover:bg-[#28a864] cursor-pointer hidden lg:inline-flex"
                >
                    <AiOutlinePlus style={{ width: '20px', height: '20px', color: 'white' }} />
                    <div className="text-center text-white text-sm font-medium leading-normal">Tạo sự kiện</div>
                </div>
                <div className="inline-flex items-center p-2 cursor-pointer bg-transparent hover:bg-transparent rounded-full">
                    <img className="w-8 h-8 rounded-full border-1 p-0.5" src={images.avatar} alt="avatar" />
                    <span className="ml-2 text-sm font-medium text-white hidden md:block">Tài khoản</span>
                    <img src={images.dropdown} className="w-4 h-4 ml-2 text-white hidden md:block" alt="dropdown" />
                </div>
            </div>
        </div>
    );
}

export default Header;
