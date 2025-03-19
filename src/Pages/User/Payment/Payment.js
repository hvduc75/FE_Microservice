import React from 'react';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import images from '../../../assets/images';
import { CircleCheck, Circle, Calendar, MapPin, CircleAlert } from 'lucide-react';

const cx = classNames.bind(styles);

function Payment(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('content')}>
                    <div className={cx('item_wrapper')}>
                        <div className={cx('item')}>
                            <div>
                                <CircleCheck size={18} />
                            </div>
                            <div>Chọn vé</div>
                        </div>
                        <div className={cx('path_container')}>
                            <div className={cx('path')}></div>
                        </div>
                    </div>
                    <div className={cx('item_wrapper')}>
                        <div className={cx('item', 'active')}>
                            <div>
                                <Circle size={18} />
                            </div>
                            <div>Thanh toán</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={cx('event_desc')}
                style={{
                    backgroundImage: `url(${'https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=DIBbnYOhK2sQ7kNvgGFvlZH&_nc_oc=Adh0Aj7ZTUWqUcqMnOrw0vQy-qERNbEx0k9x09np4QerfNRWFYcr8VLG1QsMO5msgpw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A4NdmfzODDG5g0mWuzYa_HA&oh=00_AYH3OPzgZNcRKmXPN1kqzhxhHfgNMZvzhpiGIj5p4xENJg&oe=67F99761'})`,
                }}
            >
                <div className={cx('banner_content')}>
                    <div className={cx('content_main')}>
                        <div className={cx('text_info')}>
                            <p className={cx('title')}>LULULOLA SHOW LÂN NHÃ | DÙ TA VẪN YÊU</p>
                            <div>
                                <hr />
                            </div>
                            <div className={cx('venue')}>
                                <MapPin size={24} />
                                <span>Lululola</span>
                            </div>
                            <p className={cx('address')}>
                                Đầu đèo Prenn, Số 32/2 Đường 3/4, Phường 3, Thành Phố Đà Lạt, Tỉnh Lâm Đồng
                            </p>
                            <div className={cx('datetime')}>
                                <Calendar size={24} />
                                <span>17:30 - 19:30, 12 tháng 04, 2025</span>
                            </div>
                        </div>
                        <div className={cx('count_info')}>
                            <div className={cx('count_container')}>
                                <p>Hoàn tất đặt vé trong</p>
                                <div className={cx('count_down')}>
                                    <span className={cx('cd_container')}>
                                        <span className={cx('cd_number')}>14</span>
                                        <span className={cx('cd_separator')}>:</span>
                                    </span>
                                    <span className={cx('cd_container')}>
                                        <span className={cx('cd_number')}>03</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('payment_desc')}>
                <div className={cx('payment_container')}>
                    <div className={cx('content_left')}>
                        <div className={cx('title')}>Thanh toán</div>
                        <div className={cx('attention')}>
                            <div className={cx('text_attent')}>
                                <CircleAlert size={20} />
                                Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi, vui lòng
                                <span>cập nhật tại đây</span>
                            </div>
                            <button>X</button>
                        </div>
                        <div className={cx('user_info')}>
                            <div className={cx('title_user')}>
                                <span>Thông tin nhận vé</span>
                                <button>Sửa</button>
                            </div>
                            <div className={cx('user')}>
                                <span className={cx('name')}>Đức Hoàng</span>
                                <span>No phone</span>
                            </div>
                            <div className={cx('email')}>duch52362@gmail.com</div>
                        </div>
                        <div className={cx('payment_method')}>
                            <div className={cx('title_payment')}>
                                <span>Phương thức thanh toán</span>
                            </div>
                            <div className={cx('method_container')}>
                                <div className={cx('method')}>
                                    <input type="radio" id="vn_pay" name="payment" value="vn_pay" />
                                    <label htmlFor="vn_pay">
                                        <img src={images.pm_vnpay} alt="VNPAY" />
                                        <span>Ứng dụng ngân hàng (VNPAY)</span>
                                    </label>
                                </div>
                                <div className={cx('method')}>
                                    <input type="radio" id="momo" name="payment" value="momo" />
                                    <label htmlFor="momo">
                                        <img src={images.pm_momo} alt="MOMO" />
                                        <span>Ví momo</span>
                                    </label>
                                </div>
                                <div className={cx('method')}>
                                    <input type="radio" id="zalo_pay" name="payment" value="zalo_pay" />
                                    <label htmlFor="zalo_pay">
                                        <img src={images.pm_zalopay} alt="ZALOPAY" />
                                        <span>Zalopay</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content_right')}>
                        <div className={cx('payment_info')}>
                            <div className={cx('ticket_info')}>
                                <div className={cx('title')}>
                                    <div className={cx('left_node')}>Thông tin đặt vé</div>
                                    <div className={cx('right_node')}>Chọn lại vé</div>
                                </div>
                                <div className={cx('content')}>
                                    <div className={cx('header')}>
                                        <div className={cx('left_node')}>Loại vé</div>
                                        <div className={cx('right_node')}>Số lượng</div>
                                    </div>
                                    <div className={cx('ticket')}>
                                        <div className={cx('content_top')}>
                                            <div className={cx('left_node')}>Phụ thu Bến Thành</div>
                                            <div className={cx('right_node')}>01</div>
                                        </div>
                                        <div className={cx('content_bot')}>
                                            <div className={cx('left_node')}>1.000.000 đ</div>
                                            <div className={cx('right_node')}>1.000.000 đ</div>
                                        </div>
                                        <div className={cx('separator')}></div>
                                    </div>
                                    <div className={cx('ticket')}>
                                        <div className={cx('content_top')}>
                                            <div className={cx('left_node')}>Phụ thu Bến Thành</div>
                                            <div className={cx('right_node')}>01</div>
                                        </div>
                                        <div className={cx('content_bot')}>
                                            <div className={cx('left_node')}>1.000.000 đ</div>
                                            <div className={cx('right_node')}>1.000.000 đ</div>
                                        </div>
                                        <div className={cx('separator')}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('order_info')}>
                                <div className={cx('title')}>
                                    <div className={cx('left_node')}>Thông tin đơn hàng</div>
                                </div>
                                <div className={cx('content')}>
                                    <div className={cx('header')}>
                                        <div className={cx('left_node')}>Tạm tính</div>
                                        <div className={cx('right_node')}>2.400.000 đ</div>
                                    </div>
                                    <div className={cx('separator')}></div>
                                    <div className={cx('total_price')}>
                                        <div className={cx('left_node')}>Tổng tiền</div>
                                        <div className={cx('right_node')}>2.400.000 đ</div>
                                    </div>
                                    <div className={cx('node')}>
                                        Bằng việc tiến hành đặt mua, bạn đã đồng ý với{' '}
                                        <span>Điều Kiện Giao Dịch Chung</span>
                                    </div>
                                    <button>Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
