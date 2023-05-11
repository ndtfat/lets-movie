import styles from '@/styles/pagination.module.scss';
import block from 'module-clsx';
const clsx = block(styles);

import Proptypes from 'proptypes';
import { useEffect, useRef } from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';

function Pagination({ pages = 20, onPageSelected, currentPage }) {
    const pageList = Array.from({ length: pages }, (v, i) => i + 1);
    const listRef = useRef();

    useEffect(() => {
        if (currentPage <= 4) listRef.current.style.left = `0px`;
        else if (currentPage > 4 && pages - currentPage >= 3)
            listRef.current.style.left = `-${(currentPage - 4) * (34 + 10)}px`;
        else listRef.current.style.left = `-${(pages - 3 - 4) * (34 + 10)}px`;
    }, [currentPage]);

    const handleSelectPage = (num) => {
        onPageSelected(num);
    };
    const prevBtn = () => {
        if (currentPage > 1) onPageSelected(currentPage - 1);
    };
    const nextBtn = () => {
        if (currentPage < pages) onPageSelected(currentPage + 1);
    };

    return (
        <div className={clsx('wrapper')}>
            <HiOutlineArrowNarrowLeft onClick={prevBtn} className={clsx('icon')} />

            <div className={clsx('page-list_wrapper')}>
                <ul ref={listRef} className={clsx('page-list')}>
                    {pageList.map((num) => {
                        return (
                            <li
                                key={num}
                                onClick={() => handleSelectPage(num)}
                                className={clsx('page', { active: currentPage === num })}
                            >
                                {num}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <HiOutlineArrowNarrowRight onClick={nextBtn} className={clsx('icon')} />
        </div>
    );
}

Pagination.proptypes = {
    pages: Proptypes.number,
    onPageSelected: Proptypes.func,
    currentPage: Proptypes.number,
};

export default Pagination;
