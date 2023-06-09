import block from 'module-clsx';
import styles from '@/styles/home.module.scss';
const clsx = block(styles);

import Head from 'next/head';
import { MovieSection, Layout, Slider } from '@/components';
import { getPopular, getTrending, getUpcomingMovies } from '@/lib/api';

function HomePage({ genres, trendingDay, trendingWeek, upcomingMovies, popularTV }) {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Layout genres={genres} transparent>
                <div className={clsx('slider-movie')}>
                    <Slider list={trendingDay} />
                </div>

                <div className={clsx('body')}>
                    <div className={clsx('content')}>
                        <MovieSection carousel title={'Trending'} list={trendingWeek} />
                        <div className={clsx('separate-section')}>
                            <h1>Upcoming/Popular</h1>
                            <p>List of upcoming movies in theatres and popular on TV</p>
                        </div>
                        <MovieSection
                            carousel
                            title={'Movies'}
                            list={upcomingMovies}
                            path="/filter?media_type=movie"
                        />
                        <MovieSection
                            carousel
                            title={'TVs'}
                            list={popularTV}
                            path="/filter?media_type=tv&sort_by=release_date"
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export const getServerSideProps = async () => {
    const trendingDay = await getTrending('all', 'day');
    const trendingWeek = await getTrending('all', 'week');
    const popularTV = await getPopular('tv', 1);
    const upcomingMovies = await getUpcomingMovies(1);

    return {
        props: { trendingDay, trendingWeek, upcomingMovies, popularTV },
    };
};

export default HomePage;
