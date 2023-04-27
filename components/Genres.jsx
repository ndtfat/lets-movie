import styles from '@/styles/genres.module.scss';
import block from 'module-clsx';
import { useState } from 'react';

const clsx = block(styles);

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
                        <li key={genre.id} className={clsx('genre')}>
                            {genre.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Genres;
