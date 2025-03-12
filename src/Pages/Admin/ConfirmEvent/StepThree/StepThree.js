import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdOutlineMail } from 'react-icons/md';

function StepThree(props) {
    const { contentEmail, setContentEmail } = props;
    const [customLink, setCustomLink] = useState('');

    return (
        <div style={{ padding: '72px 0' }}>
            <div className="max-w-screen-2xl mx-auto rounded-lg py-6">
                <div className="undefined">
                    <div className="p-4  bg-[#23252C] rounded-lg w-full mb-2 ">
                        <div className="undefined mb-2">
                            <h2 className="text-sm font-semibold flex items-center">
                                <span className="text-red-500 text-lg">*</span>
                                <span className="ml-1 text-white">
                                    <p className="text-lg">Link dẫn đến sự kiện</p>
                                </span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-1 mb-[24px]">
                            <span className="text-red-500 text-lg">*</span>
                            <span className="text-[14px] text-white min-w-[150px]">Tùy chỉnh đường dẫn:</span>
                            <input
                                className="custom_input"
                                placeholder="Event URL"
                                onChange={(e) => setCustomLink(e.target.value)}
                                value={customLink}
                            />
                        </div>
                        <div className="text-white text-[13px]">
                            <span>
                                Đường dẫn sự kiện của bạn là:{' '}
                                <Link
                                    to={`http://localhost:3000/${customLink}`}
                                    className="text-[#1677FF]"
                                >{`http://localhost:3000/${customLink}`}</Link>
                            </span>
                        </div>
                    </div>
                    <div className="p-4  bg-[#23252C] rounded-lg w-full mb-2 ">
                        <div className="flex gap-[2px] text-white mb-2">
                            <MdOutlineMail style={{ width: '24px', height: '24px' }} />
                            <span className="ml-1">
                                <p className="text-lg">Tin nhắn xác nhận cho người tham gia</p>
                            </span>
                        </div>
                        <div className="mb-2 ml-1 text-white text-sm">
                            Tin nhắn xác nhận này sẽ được gửi đến cho người tham gia sau khi đặt vé thành công
                        </div>
                        <textarea
                            style={{ height: '230px' }}
                            className="custom_input outline-none"
                            value={contentEmail}
                            onChange={(e) => setContentEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepThree;
