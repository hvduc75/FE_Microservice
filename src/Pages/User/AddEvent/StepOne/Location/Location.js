import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import style from './Location.module.scss';

const cx = classNames.bind(style);

function Location(props) {
    const [provinceCode, setProvinceCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [communeCode, setCommuneCode] = useState('');
    const [street, setStreet] = useState('');
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listCommune, setListCommune] = useState([]);

    const { setLocationType, locationName, setLocationName, setAddress, address, locationType } = props;

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

    useEffect(() => {
        if (address && listProvince.length > 0) {
            const addressArr = address.split(', ');
            if (addressArr.length === 4) {
                setStreet(addressArr[0]);
                const province = listProvince.find((item) => item.name === addressArr[3]);
                console.log(province);
                if (province) {
                    setProvinceCode(province.code);
                }
            }
        }
    }, [address]);

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

    useEffect(() => {
        if (provinceCode) {
            fetchDistricts(provinceCode);
        }
    }, [provinceCode]);

    const fetchDistricts = async (provinceCode) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            const data = await response.json();
            setListDistrict(data.districts || []);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    useEffect(() => {
        if (!provinceCode || listDistrict.length === 0) return;
        const addressArr = address.split(', ');
        if (addressArr.length === 4) {
            console.log(addressArr[2]);
            const district = listDistrict.find((item) => item.name === addressArr[2]);
            if (district) {
                setDistrictCode(district.code);
            }
        }
    }, [listDistrict]);

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

    useEffect(() => {
        if (districtCode) {
            fetchCommunes(districtCode);
        }
    }, [districtCode]);

    const fetchCommunes = async (districtCode) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            const data = await response.json();
            setListCommune(data.wards || []);
        } catch (error) {
            console.error('Error fetching communes:', error);
        }
    };

    useEffect(() => {
        if (address && listCommune.length > 0) {
            const addressArr = address.split(', ');
            if (addressArr.length === 4) {
                const commune = listCommune.find((item) => item.name === addressArr[1]);
                if (commune) {
                    setCommuneCode(commune.code);
                }
            }
        }
    }, [address, listCommune]);

    useEffect(() => {
        const province = listProvince.find((item) => item.code === +provinceCode)?.name || '';
        const district = listDistrict.find((item) => item.code === +districtCode)?.name || '';
        const commune = listCommune.find((item) => item.code === +communeCode)?.name || '';

        const fullAddress = `${street ? street + ', ' : ''}${commune ? commune + ', ' : ''}${
            district ? district + ', ' : ''
        }${province}`;
        if (street && commune && district && province) {
            setAddress(fullAddress);
        }
    }, [provinceCode, districtCode, communeCode, street, listProvince, listDistrict, listCommune]);

    return (
        <>
            <div className={cx('custom_title')}>Địa chỉ sự kiện</div>
            <div className={cx('type_event')}>
                <div className={cx('group')}>
                    <input
                        type="radio"
                        id="offline"
                        name="type_event"
                        value="offline"
                        checked={locationType === 'offline'}
                        onChange={(e) => setLocationType(e.target.value)}
                    />
                    <label htmlFor="offline">Sự kiện Offline</label>
                </div>
                <div className={cx('group')}>
                    <input
                        type="radio"
                        id="online"
                        name="type_event"
                        value="online"
                        checked={locationType === 'online'}
                        onChange={(e) => setLocationType(e.target.value)}
                    />
                    <label htmlFor="online">Sự kiện Online</label>
                </div>
            </div>
            <div className={cx('location')}>
                <div className={cx('location_name')}>
                    <div className={cx('custom_title')}>Tên địa điểm</div>
                    <input
                        style={{ height: '40px' }}
                        className={cx('custom_input')}
                        placeholder="Tên địa điểm"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                    />
                </div>
                <div className={cx('detail_location')}>
                    <div className="w-full">
                        <div className={cx('custom_title')}>Tỉnh/Thành</div>
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
                    <div className="w-full">
                        <div className={cx('custom_title')}>Quận/Huyện</div>
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
                </div>
                <div className={cx('detail_location')}>
                    <div className="w-full">
                        <div className={cx('custom_title')}>Phường/Xã</div>
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
                    <div className="w-full">
                        <div className={cx('custom_title')}>Số nhà, đường</div>
                        <input
                            style={{ height: '40px' }}
                            className={cx('custom_input')}
                            placeholder="Số nhà, đường"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Location;
