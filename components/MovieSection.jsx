import block from 'module-clsx';
import styles from '@/styles/movieSection.module.scss';
const clsx = block(styles);

import { memo } from 'react';
import Link from 'next/link';
import Proptypes from 'proptypes';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import Card from './Card';
import Carousel from './Carousel';

function HomeSection({ title = '', list = [], carousel = false, path }) {
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
                                    <Card
                                        poster={movie.poster_path || movie.backdrop_path}
                                        name={movie.title || movie.name}
                                        release={movie.release_date || movie.first_air_date}
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                ) : (
                    <ul className={clsx('multi-row')}>
                        {list.map((movie) => {
                            return (
                                <div key={movie.id} className={clsx('poster-card')}>
                                    <Card
                                        description
                                        poster={movie.poster_path || movie.backdrop_path}
                                        name={movie.title || movie.name}
                                        release={movie.release_date || movie.first_air_date}
                                    />
                                </div>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

HomeSection.prototype = {
    title: Proptypes.string,
    list: Proptypes.array.isRequired,
    carousel: Proptypes.bool,
    path: Proptypes.string,
};

export default memo(HomeSection);
