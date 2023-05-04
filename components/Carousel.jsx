import styles from '@/styles/carousel.module.scss';
import block from 'module-clsx';
const clsx = block(styles);

import { useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function Carousle({ children, info }) {
    const ulRef = useRef();
    const listTranslateX = 8 * (150 + 10) - 10;
    let listPosLeft = 0;

    const handleLeft = (e) => {
        if (listPosLeft !== 0) {
            ulRef.current.style.left = `${listPosLeft + listTranslateX}px`;
            listPosLeft += listTranslateX;
        }
    };
    const handleRight = () => {
        if (listPosLeft > -listTranslateX * 4) {
            ulRef.current.style.left = `${listPosLeft - listTranslateX}px`;
            listPosLeft -= listTranslateX;
        }
    };

    return (
        <div className={clsx('wrapper')}>
            <BsChevronLeft className={clsx('icon', { left: true })} onClick={handleLeft} />
            <div className={clsx('list-wrapper')}>
                <ul ref={ulRef} className={clsx('list')} onClick={handleLeft}>
                    {children}
                </ul>
            </div>
            <BsChevronRight className={clsx('icon', { right: true })} onClick={handleRight} />
        </div>
    );
}

export default Carousle;
