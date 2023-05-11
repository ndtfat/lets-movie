import styles from '@/styles/media.module.scss';
import block from 'module-clsx';

const clsx = block(styles);

import { useCallback, useEffect, useState } from 'react';
import { getLatest, getTopRated } from '@/lib/api';
import { Layout, MovieSection, Pagination } from '@/components';

function MediaPage({ genres, media_type, topRated }) {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [latestMovies, setLatestMovies] = useState([]);

    console.log(latestMovies);

    useEffect(() => {
        setCurrentPage(1);
    }, [media_type]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const latestMovies = await getLatest(media_type, currentPage);
            setLatestMovies(latestMovies);
            setLoading(false);
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
                    <MovieSection carousel title="Top Rated" list={topRated} />
                    <MovieSection title="Latest" list={latestMovies} path="/filter" />
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
