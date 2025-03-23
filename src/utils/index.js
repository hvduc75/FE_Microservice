export const getImageSrc = (image) => {
    if (image && image.data) {
        const byteArray = new Uint8Array(image.data);
        let binary = '';
        byteArray.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });
        return `data:image/jpeg;base64,${window.btoa(binary)}`;
    }
    return null;
};

export const getMinPrice = (tickets) => {
    if (!tickets || tickets.length === 0) return 'Đang cập nhật';
    let minPrice = Math.min(...tickets.map((ticket) => ticket.ticketPrice));
    return `${minPrice.toLocaleString('vi-VN')}đ`;
};

export const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return '0';
    }
    return price.toLocaleString('vi-VN');
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}, ${day} Tháng ${month}, ${year}`;
};

export const formatDateCustom = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day} Tháng ${month}, ${year} - ${hours}:${minutes}`;
};