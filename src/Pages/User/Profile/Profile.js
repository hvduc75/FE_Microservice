import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Camera, CircleCheck } from 'lucide-react';
import styles from './Profile.module.scss';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

function Profile(props) {
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDay, setBirthDay] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>Thông tin tài khoản</div>
            <div className={cx('divider')}></div>
            <div className={cx('container')}>
                <div className={cx('form')}>
                    <div className={cx('user_avatar')}>
                        <input
                            type="file"
                            id="user_avatar"
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageChange(e)}
                        />
                        <label htmlFor="user_avatar">
                            <img src={avatarPreview || images.avatar} alt="avatar" />
                            <Camera size="24" className={cx('camera')} />
                        </label>
                    </div>
                    <div className={cx('attention')}>
                        Cung cấp thông tin chính xác sẽ hỗ trợ bạn trong quá trình mua vé, hoặc khi cần xác thực vé
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Họ và tên</div>
                        <input
                            className={cx('custom_input')}
                            style={{ height: '42px' }}
                            placeholder="Nhập ở đây"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Số điện thoại</div>
                        <input
                            className={cx('custom_input')}
                            style={{ height: '42px' }}
                            placeholder="Nhập ở đây"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Email</div>
                        <input
                            className={cx('custom_input', 'disabled')}
                            style={{ height: '42px' }}
                            placeholder="test"
                        />
                        <CircleCheck size={16} className={cx('tick')} />
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Ngày tháng năm sinh</div>
                        <input
                            type="date"
                            className={cx('custom_input')}
                            style={{ height: '42px' }}
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                        />
                    </div>
                    <div className={cx('form_group')}>
                        <div className={cx('custom_title', 'css_inline')}>Giới tính</div>
                        <div className={cx('gender')}>
                            <div className={cx('item')}>
                                <input type="radio" name="gender" id="male" />
                                <label htmlFor="male"> Nam</label>
                            </div>
                            <div className={cx('item')}>
                                <input type="radio" name="gender" id="fe_male" />
                                <label htmlFor="fe_male">Nữ</label>
                            </div>
                            <div className={cx('item')}>
                                <input type="radio" name="gender" id="other" />
                                <label htmlFor="other">Khác</label>
                            </div>
                        </div>
                    </div>
                    <button>Hoàn thành</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
