import React from 'react';
import classNames from 'classnames/bind';

import styles from './TicketTable.module.scss';
import { formatPrice } from '../../../../utils';

const cx = classNames.bind(styles);

const TicketTable = ({ tickets }) => {
    const percent = (sold, total) => {
        return ((sold / total) * 100).toFixed(2) + '%';
    };
    
    return (
        <div className={cx('container')}>
            <table className={cx('table')}>
                <thead className={cx('tb_header')}>
                    <tr>
                        <th className={cx('tb_row', 'col-first')} style={{ textAlign: 'left' }}>
                            Loại Vé
                        </th>
                        <th className={cx('tb_row')} style={{ textAlign: 'right' }}>
                            Giá bán
                        </th>
                        <th className={cx('tb_row')} style={{ textAlign: 'right' }}>
                            Đã bán
                        </th>
                        <th className={cx('tb_row')} style={{ textAlign: 'right' }}>
                            Bị khoá
                        </th>
                        <th className={cx('tb_row', 'col-last')} style={{ textAlign: 'right' }}>
                            Tỉ lệ bán
                        </th>
                    </tr>
                </thead>
                <tbody className={cx('tb_body')}>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <td className={cx('tb_row', 'bold-text', 'col-first')} style={{ textAlign: 'left' }}>
                                {ticket.ticketName}
                            </td>
                            <td className={cx('tb_row')} style={{ textAlign: 'right' }}>
                                {formatPrice(ticket.ticketPrice)}đ
                            </td>
                            <td className={cx('tb_row', 'bold-text')} style={{ textAlign: 'right' }}>
                                {ticket.soldQuantity} / {ticket.ticketAmount + ticket.soldQuantity}
                            </td>
                            <td className={cx('tb_row')} style={{ textAlign: 'right' }}>
                                0
                            </td>
                            <td className={cx('tb_row', 'progress-cell', 'col-last')} style={{ textAlign: 'right' }}>
                                <div className={cx('progress-container')}>
                                    <div
                                        className={cx('progress-bar')}
                                        style={{
                                            width: `${percent(
                                                ticket.soldQuantity,
                                                ticket.ticketAmount + ticket.soldQuantity,
                                            )}`,
                                        }}
                                    ></div>
                                </div>
                                <span className={cx('progress-text')}>
                                    {percent(ticket.soldQuantity, ticket.ticketAmount + ticket.soldQuantity)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;
