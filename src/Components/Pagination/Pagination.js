import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

function Pagination({ totalPage, currentPage, onPageChange }) {
    const generatePages = () => {
        const pages = [];
        const maxVisiblePages = 5; 

        if (totalPage <= maxVisiblePages) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPage);
            } else if (currentPage >= totalPage - 2) {
                pages.push(1, '...', totalPage - 3, totalPage - 2, totalPage - 1, totalPage);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage);
            }
        }

        return pages;
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPage) {
            onPageChange(currentPage + 1);
        }
    };

    const pages = generatePages();

    return (
        <div className="flex justify-end mt-4 items-center">
            <button
                className={`px-1 py-1 mx-1 border ${
                    currentPage === 1
                        ? 'bg-gray-300 cursor-not-allowed border-gray-400'
                        : 'bg-gray-200 border-gray-500 hover:border-blue-500'
                }`}
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={24} />
            </button>
            {pages.map((page, index) =>
                page === '...' ? (
                    <span key={index} className="px-3 py-1 mx-1 text-gray-500">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        className={`px-3 py-1 mx-1 border ${
                            page === currentPage
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-gray-200 border-gray-500 hover:border-blue-500'
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}
            <button
                className={`px-1 py-1 mx-1 border ${
                    currentPage === totalPage
                        ? 'bg-gray-300 cursor-not-allowed border-gray-400'
                        : 'bg-gray-200 border-gray-500 hover:border-blue-500'
                }`}
                onClick={handleNext}
                disabled={currentPage === totalPage}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}

export default Pagination;