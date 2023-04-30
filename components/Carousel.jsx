import block from 'module-clsx';
import styles from '@/styles/carousel.module.scss';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';

const clsx = block(styles);

function Carousle({ children }) {
    const ulRef = useRef();
    let listPosLeft = 0;

    const handleLeft = (e) => {
        if (listPosLeft !== 0) {
            ulRef.current.style.left = `${listPosLeft + 1140}px`;
            listPosLeft += 1140;
        }
    };
    const handleRight = () => {
        if (listPosLeft > -1140 * 2) {
            ulRef.current.style.left = `${listPosLeft - 1140}px`;
            listPosLeft -= 1140;
        }
    };

    return (
        <div className={clsx('wrapper')}>
            <AiFillCaretLeft className={clsx('icon', { left: true })} onClick={handleLeft} />
            <div className={clsx('list-wrapper')}>
                <ul ref={ulRef} className={clsx('list')} onClick={handleLeft}>
                    {children}
                </ul>
            </div>
            <AiFillCaretRight className={clsx('icon', { right: true })} onClick={handleRight} />
        </div>
    );
}

export default Carousle;
