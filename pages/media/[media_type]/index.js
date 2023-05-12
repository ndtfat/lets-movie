import styles from '@/styles/media.module.scss';
import block from 'module-clsx';

const clsx = block(styles);

import { Layout, MovieSection, Pagination } from '@/components';
import { getLatest, getTopRated } from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';

function MediaPage({ genres, media_type, topRated }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [latestMovies, setLatestMovies] = useState([]);

    console.log(latestMovies);

    useEffect(() => {
        setCurrentPage(1);
    }, [media_type]);

    useEffect(() => {
        (async () => {
            const latestMovies = await getLatest(media_type, currentPage);
            setLatestMovies(latestMovies);
        })();
    }, [currentPage, media_type]);

    const handlePageSelected = useCallback((numPage) => {
        setCurrentPage(numPage);
        document.documentElement.scrollTop = 470;
    }, []);

    return (
        <Layout genres={genres}>
            <div className={clsx('body')}>
                <div className={clsx('content')}>
                    <h1 className={clsx('title')}>{media_type === 'movie' ? 'MOVIEs' : 'TVs'}</h1>
                    <MovieSection
                        carousel
                        title="Top Rated"
                        list={topRated}
                        media_type={media_type}
                    />
                    <MovieSection
                        title="Latest"
                        list={latestMovies}
                        path="/filter"
                        media_type={media_type}
                    />
                    <Pagination onPageSelected={handlePageSelected} currentPage={currentPage} />
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async ({ params }) => {
    const media_type = params.media_type;
    const topRated = await getTopRated(media_type, 1);

    return { props: { media_type, topRated } };
};

export default MediaPage;
