import block from 'module-clsx';
import styles from '@/styles/movieSection.module.scss';
const clsx = block(styles);

import { memo } from 'react';
import Link from 'next/link';
import Proptypes from 'proptypes';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import Card from './Card';
import Carousel from './Carousel';

function MovieSection({ title = '', list = [], carousel = false, path }) {
    console.log(list);

    return (
        <section className={clsx('wrapper')}>
            <div className={clsx('header')}>
                <h1 className={clsx('title')}>{title}</h1>
                {path && (
                    <Link href={path} className={clsx('more-btn')}>
                        See more <BsFillArrowRightCircleFill />
                    </Link>
                )}
            </div>
            <div className={clsx('list')}>
                {carousel ? (
                    <Carousel>
                        {list.map((movie) => {
                            return (
                                <div key={movie.id} className={clsx('poster-card')}>
                                    <Card info={movie} />
                                </div>
                            );
                        })}
                    </Carousel>
                ) : (
                    <ul className={clsx('multi-row')}>
                        {list.map((movie) => {
                            return (
                                <div key={movie.id} className={clsx('poster-card')}>
                                    <Card description info={movie} />
                                </div>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

MovieSection.prototype = {
    title: Proptypes.string,
    list: Proptypes.array.isRequired,
    carousel: Proptypes.bool,
    path: Proptypes.string,
};

export default memo(MovieSection);
