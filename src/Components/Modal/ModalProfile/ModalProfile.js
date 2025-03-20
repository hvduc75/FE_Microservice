import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './ModalProfile.module.scss';
import { UserLoginSuccess } from '../../../redux/action/userAction';
import { IoClose } from 'react-icons/io5';
import { FaGoogle } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { loginUser, registerNewUser } from '../../../service/authService';
const cx = classNames.bind(styles);

function ModalProfile({ setShowModal }) {
    const dispatch = useDispatch();
    const [provinceCode, setProvinceCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [communeCode, setCommuneCode] = useState('');
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listCommune, setListCommune] = useState([]);
    const [street, setStreet] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
            const data = await response.json();
            setListProvince(data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    // useEffect(() => {
    //     if (address && listProvince.length > 0) {
    //         const addressArr = address.split(', ');
    //         if (addressArr.length === 4) {
    //             setStreet(addressArr[0]);
    //             const province = listProvince.find((item) => item.name === addressArr[3]);
    //             if (province) {
    //                 setProvinceCode(province.code);
    //             }
    //         }
    //     }else{
    //         setProvinceCode('');
    //         setDistrictCode('');
    //         setCommuneCode('');
    //         setStreet('');
    //     }
    // }, [address, listProvince]);

    const handleProvinceChange = async (e) => {
        const selectedProvinceCode = e.target.value;
        setProvinceCode(selectedProvinceCode);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`);
            const data = await response.json();
            setListDistrict(data.districts || []);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    // useEffect(() => {
    //     if (provinceCode) {
    //         fetchDistricts(provinceCode);
    //     }
    // }, [provinceCode]);

    // const fetchDistricts = async (provinceCode) => {
    //     try {
    //         const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    //         const data = await response.json();
    //         setListDistrict(data.districts || []);
    //     } catch (error) {
    //         console.error('Error fetching districts:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (!provinceCode || listDistrict.length === 0) return;
    //     const addressArr = address.split(', ');
    //     if (addressArr.length === 4) {
    //         const district = listDistrict.find((item) => item.name === addressArr[2]);
    //         if (district) {
    //             setDistrictCode(district.code);
    //         }
    //     }
    // }, [listDistrict]);

    const handleDistrictChange = async (e) => {
        const selectedDistrictCode = e.target.value;
        setDistrictCode(selectedDistrictCode);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`);
            const data = await response.json();
            setListCommune(data.wards || []);
        } catch (error) {
            console.error('Error fetching communes:', error);
        }
    };

    // useEffect(() => {
    //     if (districtCode) {
    //         fetchCommunes(districtCode);
    //     }
    // }, [districtCode]);

    // const fetchCommunes = async (districtCode) => {
    //     try {
    //         const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    //         const data = await response.json();
    //         setListCommune(data.wards || []);
    //     } catch (error) {
    //         console.error('Error fetching communes:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (address && listCommune.length > 0) {
    //         const addressArr = address.split(', ');
    //         if (addressArr.length === 4) {
    //             const commune = listCommune.find((item) => item.name === addressArr[1]);
    //             if (commune) {
    //                 setCommuneCode(commune.code);
    //             }
    //         }
    //     }
    // }, [address, listCommune]);

    useEffect(() => {
        const province = listProvince.find((item) => item.code === +provinceCode)?.name || '';
        const district = listDistrict.find((item) => item.code === +districtCode)?.name || '';
        const commune = listCommune.find((item) => item.code === +communeCode)?.name || '';

        const address = `${street ? street + ', ' : ''}${commune ? commune + ', ' : ''}${
            district ? district + ', ' : ''
        }${province}`;
        if (street && commune && district && province) {
            setFullAddress(address);
        }
    }, [provinceCode, districtCode, communeCode, street, listProvince, listDistrict, listCommune]);

    const handleConfirm = () => {
        alert(`${fullAddress}, ${receiverName}, ${phone}, ${email}`);
    };

    return (
        <div className={cx('modal_overlay')}>
            <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <span>Cập nhật thông tin nhận vé</span>
                </div>
                <button className={cx('close_btn')} onClick={() => setShowModal(false)}>
                    <IoClose size={24} />
                </button>
                <div className={cx('content')}>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Tên người nhận</div>
                        <input
                            className={cx('custom_input')}
                            style={{ height: '40px' }}
                            placeholder="Nhập tên người nhận"
                            value={receiverName}
                            onChange={(e) => setReceiverName(e.target.value)}
                        />
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Số điện thoại</div>
                        <input
                            className={cx('custom_input')}
                            style={{ height: '40px' }}
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Email</div>
                        <input
                            className={cx('custom_input')}
                            style={{ height: '40px' }}
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Tỉnh/Thành phố</div>
                        <select
                            value={provinceCode}
                            style={{ height: '40px' }}
                            className={cx('custom_input')}
                            onChange={handleProvinceChange}
                        >
                            <option value="">Chọn Tỉnh/Thành Phố</option>
                            {listProvince.map((province) => (
                                <option key={province.code} value={province.code}>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Quận/Huyện</div>
                        <select
                            value={districtCode}
                            style={{ height: '40px' }}
                            className={cx('custom_input')}
                            onChange={handleDistrictChange}
                        >
                            <option value="">Chọn Quận/Huyện</option>
                            {listDistrict.map((district) => (
                                <option key={district.code} value={district.code}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Phường/Xã</div>
                        <select
                            value={communeCode}
                            style={{ height: '40px' }}
                            className={cx('custom_input')}
                            onChange={(e) => setCommuneCode(e.target.value)}
                        >
                            <option value="">Chọn Phường/Xã</option>
                            {listCommune.map((commune) => (
                                <option key={commune.code} value={commune.code}>
                                    {commune.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Địa chỉ</div>
                        <input
                            className={cx('custom_input')}
                            style={{ height: '40px' }}
                            placeholder="Nhập địa chỉ"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <div className={cx('group_btn')}>
                        <button className={cx('btn_cancel')} onClick={() => setShowModal(false)}>
                            Hủy bỏ
                        </button>
                        <button className={cx('btn_cancel', 'disable')} onClick={() => handleConfirm()}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalProfile;
