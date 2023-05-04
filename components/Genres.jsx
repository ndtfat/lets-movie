import block from 'module-clsx';
import styles from '@/styles/genres.module.scss';
const clsx = block(styles);

import Propstypes from 'proptypes';
import Link from 'next/link';
import { useState } from 'react';

function Genres({ genres }) {
    const [genresType, setGenresType] = useState('movie');

    const handleSelectGenres = (genres) => {
        setGenresType(genres);
    };

    return (
        <div className={clsx('wrapper')}>
            <ul className={clsx('type-list')}>
                <li
                    onClick={() => handleSelectGenres('movie')}
                    className={clsx('type', { active: genresType === 'movie' })}
                >
                    Movie
                </li>
                <li
                    onClick={() => handleSelectGenres('tv')}
                    className={clsx('type', { active: genresType === 'tv' })}
                >
                    TV
                </li>
            </ul>

            <ul className={clsx('genre-list')}>
                {(genresType === 'movie' ? genres.movie : genres.tv).map((genre) => {
                    return (
                        <Link href={`/filter?genre=${genre.id}`} key={genre.id}>
                            <li className={clsx('genre')}>{genre.name}</li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

Genres.proptypes = {
    genres: Propstypes.array.isRequired,
};

export default Genres;
