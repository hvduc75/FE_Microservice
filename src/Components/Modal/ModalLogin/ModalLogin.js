import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { IoClose } from 'react-icons/io5';
import { FaGoogle } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from './ModalLogin.module.scss';
import { loginUser, registerNewUser } from '../../../service/authService';

const cx = classNames.bind(styles);

function ModalLogin({ setShowModal }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleShowLogin = () => {
        setIsLogin(true);
        resetForm();
    };

    const handleShowRegister = () => {
        setIsLogin(false);
        resetForm();
    };

    // Hàm reset dữ liệu input
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleLogin = async () => {
        const response = await loginUser(email, password);
        if (response.EC === 0) {
            toast.success('Đăng nhập thành công');
            setShowModal(false);
            resetForm();
        } else {
            toast.error(response.EM);
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp');
            return;
        }

        const userData = {
            email,
            password,
        };

        const response = await registerNewUser(userData);
        if (response.EC === 0) {
            toast.success('Đăng ký thành công');
            resetForm();
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <div>
            <div className={cx('modal_overlay')}>
                <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                    <button className={cx('close_btn')} onClick={() => setShowModal(false)}>
                        <IoClose style={{ width: '24px', height: '24px' }} />
                    </button>
                    <div className={cx('header')}>
                        <div className={cx('content_header')}>
                            {isLogin ? (
                                <span className={cx('login')}>Đăng nhập</span>
                            ) : (
                                <span className={cx('register')}>Đăng ký tài khoản</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {isLogin ? (
                            <>
                                <div className={cx('form')}>
                                    <div className={cx('form_control')}>
                                        <input
                                            type="text"
                                            placeholder="Nhập email hoặc số điện thoại"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className={cx('form_control')}>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Nhập mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className={cx('eye_icon')} onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </span>
                                    </div>
                                    <div className={cx('form_control', 'submit')}>
                                        <button onClick={() => handleLogin()}>Đăng nhập</button>
                                    </div>
                                </div>
                                <div className={cx('forgot_password')}>
                                    <p>Quên mật khẩu?</p>
                                </div>
                                <div className={cx('register')}>
                                    <div className={cx('title')}>Chưa có tài khoản?</div>
                                    <div className={cx('make_account')} onClick={() => handleShowRegister()}>
                                        Tạo tài khoản ngay
                                    </div>
                                </div>
                                <div className={cx('or-text')}>Hoặc</div>
                                <div className={cx('oauth')}>
                                    <div className={cx('google')}>
                                        <FaGoogle style={{ height: '18px', width: '18px', color: 'red' }} />
                                    </div>
                                </div>
                                <div className={cx('commitment')}>
                                    Bằng việc tiếp tục, bạn đã đọc và đồng ý với <Link>Điều khoản sử dụng</Link> và{' '}
                                    <Link> Chính sách bảo mật thông tin cá nhân</Link> của Ticketbox
                                </div>
                            </>
                        ) : (
                            <div className={cx('form')}>
                                <div className={cx('form_control')}>
                                    <input
                                        type="text"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={cx('form_control')}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className={cx('eye_icon')} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </span>
                                </div>
                                <div className={cx('form_control')}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Nhập lại mật khẩu"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        className={cx('eye_icon')}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </span>
                                </div>
                                <div className={cx('form_control', 'submit')}>
                                    <button onClick={() => handleRegister()}>Đăng ký</button>
                                </div>
                                <div className={cx('register')}>
                                    <div className={cx('title')}>Đã có tài khoản?</div>
                                    <div className={cx('make_account')} onClick={() => handleShowLogin()}>
                                        Đăng nhập ngay
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalLogin;
