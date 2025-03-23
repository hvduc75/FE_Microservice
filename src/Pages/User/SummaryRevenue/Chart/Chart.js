import React, { useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format, subDays, isWithinInterval, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

// Hàm định dạng số thành tiền VND
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

// Hàm định dạng ngày giờ
const formatDateTime = (date) => {
    return format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
};

const CustomLineChart = ({ booking = [], event }) => {
    // Kiểm tra nếu event có startDate không
    const startDate = event?.startDate ? new Date(event.startDate) : null;

    // Tạo danh sách khoảng thời gian (30 ngày trước startDate, mỗi lần trừ 2 ngày)
    const dateRanges = useMemo(() => {
        if (!startDate) return [];
        return Array.from({ length: 15 }, (_, i) => {
            const start = subDays(startDate, i * 2 + 2); // Ngày bắt đầu của khoảng
            const end = subDays(startDate, i * 2); // Ngày kết thúc của khoảng
            return {
                label: `${format(start, 'dd/MM')} - ${format(end, 'dd/MM')}`,
                start,
                end,
            };
        }).reverse();
    }, [startDate]);

    // Tính toán dữ liệu biểu đồ từ danh sách booking
    const data = useMemo(() => {
        if (!Array.isArray(booking) || booking.length === 0 || dateRanges.length === 0) return [];

        return dateRanges.map(({ label, start, end }) => {
            // Lọc ra các đơn đặt chỗ thuộc khoảng thời gian hiện tại
            const bookingsInRange = booking.filter(({ bookingTime }) => {
                const bookingDate = parseISO(bookingTime);
                return isWithinInterval(bookingDate, { start, end });
            });

            // Tính tổng doanh thu và số vé bán từ tất cả các booking trong khoảng
            const revenue = bookingsInRange.reduce((sum, b) =>
                sum + b.tickets.reduce((subSum, t) => subSum + t.ticketPrice * t.quantity, 0), 0
            );

            const tickets = bookingsInRange.reduce((sum, b) =>
                sum + b.tickets.reduce((subSum, t) => subSum + t.quantity, 0), 0
            );

            return { date: label, revenue, tickets };
        });
    }, [booking, dateRanges]);

    // Nếu không có dữ liệu, hiển thị thông báo
    if (!startDate || data.length === 0) {
        return <p style={{ color: 'white', textAlign: 'center' }}>Không có dữ liệu để hiển thị</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" angle={-30} textAnchor="end" tick={{ fill: 'white' }} />
                <YAxis
                    yAxisId="left"
                    tickFormatter={formatCurrency}
                    label={{ value: 'Doanh thu (VND)', angle: -90, position: 'insideLeft', fill: 'white' }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: 'Số vé bán', angle: -90, position: 'insideRight', fill: 'white' }}
                />
                <Tooltip
                    formatter={(value, name) => (name === "Doanh thu" ? formatCurrency(value) : value)}
                    labelFormatter={(label) => `Khoảng thời gian: ${label}`}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#a855f7" dot={{ fill: '#a855f7' }} name="Doanh thu" />
                <Line yAxisId="right" type="monotone" dataKey="tickets" stroke="#22c55e" dot={{ fill: '#22c55e' }} name="Số vé bán" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
