import React, { useState } from 'react';

function StepFour(props) {
    const { accountName, setAccountName, accountNumber, setAccountNumber, bankName, setBankName, branch, setBranch } = props;

    return (
        <div style={{ padding: '72px 16px' }}>
            <div className="max-w-screen-2xl mx-auto rounded-lg p-6">
                <div className="p-4 bg-[#23252C] rounded-lg w-full mb-2">
                    <div className="mb-2">
                        <h2 className="text-sm font-semibold flex items-center">
                            <span className="text-white">
                                <p className="text-[16px]">Thông tin thanh toán</p>
                            </span>
                        </h2>
                    </div>
                    <span className="block mb-2">
                        <p className="mb-1 text-white leading-inherit text-[14px]">
                            Ticketbox sẽ chuyển tiền bán vé đến tài khoản của bạn
                        </p>
                        <p className="leading-tight text-white text-[14px]">
                            Tiền bán vé (sau khi trừ phí dịch vụ cho Ticketbox) sẽ vào tài khoản của bạn sau khi xác
                            nhận sale report từ 7 - 10 ngày. Nếu bạn muốn nhận được tiền sớm hơn, vui lòng liên hệ chúng
                            tôi qua số 1900.6408 hoặc info@ticketbox.vn
                        </p>
                    </span>
                    <div className="flex flex-col gap-6 w-[80%] mb-[25px]">
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-[150px] text-white text-end text-[14px]">Chủ tài khoản: </span>
                            <input
                                placeholder="Tên chủ tài khoản"
                                className="custom_input"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-[150px] text-white text-end text-[14px]">Số tài khoản: </span>
                            <input
                                placeholder="Số tài khoản"
                                className="custom_input"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-[150px] text-white text-end text-[14px]">Tên ngân hàng: </span>
                            <input
                                placeholder="Tên ngân hàng"
                                className="custom_input"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-[150px] text-white text-end text-[14px]">Chi nhánh: </span>
                            <input
                                placeholder="Chi nhánh"
                                className="custom_input"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepFour;
