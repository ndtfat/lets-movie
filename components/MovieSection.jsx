import block from 'module-clsx';
import styles from '@/styles/movieSection.module.scss';
const clsx = block(styles);

import { memo } from 'react';
import Proptypes from 'proptypes';
import Card from './Card';
import Carousel from './Carousel';

function HomeSection({ title = '', list = [], carousel = false }) {
    return (
        <section className={clsx('wrapper')}>
            <h1 className={clsx('title')}>{title}</h1>
            <div className={clsx('list')}>
                {carousel ? (
                    <Carousel>
                        {list.map((movie) => {
                            return (
                                <div key={movie.id} className={clsx('poster-card')}>
                                    <Card
                                        poster={movie.poster_path}
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
                                        poster={movie.poster_path}
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
    title: Proptypes.string.isRequired,
    list: Proptypes.array.isRequired,
    carousel: Proptypes.bool,
};

export default memo(HomeSection);
