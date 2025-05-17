import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Clock, Trash } from 'lucide-react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';
import ProductCard from '../ProductCard/ProductCard';

const cx = classNames.bind(styles);

function Search(props) {
    const { t } = useTranslation('home');
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const handleDelete = () => {
        alert('Delete history');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalVisible(false);
            }
        };

        if (isModalVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalVisible]);

    const recommendedProducts = [
        {
            id: '1',
            _id: '1',
            eventName: 'Workshop "TERRARIUM"',
            backgroundEvent:
                'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=KIjsfDl8R04Q7kNvwEvNhdp&_nc_oc=AdlgAJCMEy-lV0k1tezQVt8J2cl2gMO_ozmIAcmtlLe-jh_xay6IlapFh7qZhfyTRIE&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=siKdpnhSe-HYVvGy-C3aow&oh=00_AfGN5x22Dp1NU2Z8fmyAavmRwUjZ6PnJ2Fb0VY36MDwIFA&oe=6832F0A1',
            tickets: [{ price: 200000 }],
            startDate: '2025-05-01',
        },
        {
            id: '2',
            _id: '2',
            eventName: 'Workshop "GỐM TIÊN"',
            backgroundEvent:
                'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=KIjsfDl8R04Q7kNvwEvNhdp&_nc_oc=AdlgAJCMEy-lV0k1tezQVt8J2cl2gMO_ozmIAcmtlLe-jh_xay6IlapFh7qZhfyTRIE&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=siKdpnhSe-HYVvGy-C3aow&oh=00_AfGN5x22Dp1NU2Z8fmyAavmRwUjZ6PnJ2Fb0VY36MDwIFA&oe=6832F0A1',
            tickets: [{ price: 250000 }],
            startDate: '2025-05-10',
        },
        {
            id: '3',
            _id: '3',
            eventName: 'Workshop "VẼ TRANH"',
            backgroundEvent:
                'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=KIjsfDl8R04Q7kNvwEvNhdp&_nc_oc=AdlgAJCMEy-lV0k1tezQVt8J2cl2gMO_ozmIAcmtlLe-jh_xay6IlapFh7qZhfyTRIE&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=siKdpnhSe-HYVvGy-C3aow&oh=00_AfGN5x22Dp1NU2Z8fmyAavmRwUjZ6PnJ2Fb0VY36MDwIFA&oe=6832F0A1',
            tickets: [{ price: 180000 }],
            startDate: '2025-05-15',
        },
        {
            id: '4',
            _id: '4',
            eventName: 'Workshop "TERRARIUM"',
            backgroundEvent:
                'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=KIjsfDl8R04Q7kNvwEvNhdp&_nc_oc=AdlgAJCMEy-lV0k1tezQVt8J2cl2gMO_ozmIAcmtlLe-jh_xay6IlapFh7qZhfyTRIE&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=siKdpnhSe-HYVvGy-C3aow&oh=00_AfGN5x22Dp1NU2Z8fmyAavmRwUjZ6PnJ2Fb0VY36MDwIFA&oe=6832F0A1',
            tickets: [{ price: 200000 }],
            startDate: '2025-05-01',
        },
        {
            id: '5',
            _id: '5',
            eventName: 'Workshop "GỐM TIÊN"',
            backgroundEvent:
                'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=KIjsfDl8R04Q7kNvwEvNhdp&_nc_oc=AdlgAJCMEy-lV0k1tezQVt8J2cl2gMO_ozmIAcmtlLe-jh_xay6IlapFh7qZhfyTRIE&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=siKdpnhSe-HYVvGy-C3aow&oh=00_AfGN5x22Dp1NU2Z8fmyAavmRwUjZ6PnJ2Fb0VY36MDwIFA&oe=6832F0A1',
            tickets: [{ price: 250000 }],
            startDate: '2025-05-10',
        },
        {
            id: '6',
            _id: '6',
            eventName: 'Workshop "VẼ TRANH"',
            backgroundEvent:
                'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-9/184970261_181060250552248_1110713495327264304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=KIjsfDl8R04Q7kNvwEvNhdp&_nc_oc=AdlgAJCMEy-lV0k1tezQVt8J2cl2gMO_ozmIAcmtlLe-jh_xay6IlapFh7qZhfyTRIE&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=siKdpnhSe-HYVvGy-C3aow&oh=00_AfGN5x22Dp1NU2Z8fmyAavmRwUjZ6PnJ2Fb0VY36MDwIFA&oe=6832F0A1',
            tickets: [{ price: 180000 }],
            startDate: '2025-05-15',
        },
    ];

    const handleSearch = () => {
        navigate(`search?q=${searchText}`);
        setIsModalVisible(false);
    };

    const handleUpdateScore = (id) => {
        console.log('Update score for:', id);
        // Thực hiện logic cập nhật điểm gợi ý nếu cần
    };

    const handleSearchByCategory = (category) => {
        if (category === 'Nhạc sống') {
            navigate('/search?category=music');
        } else if (category === 'Sân khấu & Nghệ thuật') {
            navigate('/search?category=theatersandart');
        } else if (category === 'Thể Thao') {
            navigate('/search?category=sport');
        } else if (category === 'Khác') {
            navigate('/search?category=others');
        }
        setIsModalVisible(false);
    };

    return (
        <div className={cx('group_search')}>
            <span style={{ color: '#868e99' }}>
                <IoSearch style={{ width: '24px', height: '24px' }} />
            </span>
            <input
                type="text"
                placeholder={t('header.search.placeholder')}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setIsModalVisible(true)}
            />
            <button onClick={() => handleSearch()}>{t('header.search.button')}</button>
            {isModalVisible && (
                <div className={cx('modal-search')} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('search-history')}>
                        <div className={cx('item')}>
                            <div className={cx('title')}>
                                <Clock size={21} />
                                <span>anh</span>
                            </div>
                            <Trash size={16} color="gray" onClick={() => handleDelete()} />
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('title')}>
                                <Clock size={21} />
                                <span>anh</span>
                            </div>
                            <Trash size={16} color="gray" onClick={() => handleDelete()} />
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('title')}>
                                <Clock size={21} />
                                <span>anh</span>
                            </div>
                            <Trash size={16} color="gray" onClick={() => handleDelete()} />
                        </div>
                    </div>
                    <div className={cx('categories')}>
                        <h4>Khám phá theo Thể loại</h4>
                        <div className={cx('categories-list')}>
                            <div className={cx('category')} onClick={() => handleSearchByCategory('Nhạc sống')}>
                                Nhạc sống
                            </div>
                            <div
                                className={cx('category')}
                                onClick={() => handleSearchByCategory('Sân khấu & Nghệ thuật')}
                            >
                                Sân khấu & Nghệ thuật
                            </div>
                            <div className={cx('category')} onClick={() => handleSearchByCategory('Thể Thao')}>
                                Thể thao
                            </div>
                            <div className={cx('category')} onClick={() => handleSearchByCategory('Khác')}>
                                Khác
                            </div>
                        </div>
                    </div>
                    <div className={cx('recommendation')}>
                        <h4>Gợi ý dành cho bạn</h4>
                        <div className={cx('cards')}>
                            {recommendedProducts.map((item, index) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    handleUpdateScore={handleUpdateScore}
                                    size={'small'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
