import { HomeSection, Layout, Slider } from '@/components';
import { getPopular, getTrending } from '@/lib/api';
import block from 'module-clsx';
import { getSession } from 'next-auth/react';
import styles from '@/styles/home.module.scss';

const clsx = block(styles);

function HomePage({ genres, trendingDay, trendingWeek, popularMovie, popularTV }) {
    return (
        <>
            <Layout genres={genres} transparent>
                <div className={clsx('slider-movie')}>
                    <Slider list={trendingDay} />
                </div>

                <div className={clsx('body')}>
                    <div className={clsx('content')}>
                        <HomeSection title={'Trending'} list={trendingWeek} />
                        <div className={clsx('separate-section')}>
                            <h1>Popular</h1>
                            <p>List of popular movies/TV on TMDB</p>
                        </div>
                        <HomeSection title={'Movies'} list={popularMovie} />
                        <HomeSection title={'TVs'} list={popularTV} />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    const trendingDay = await getTrending('all', 'day');
    const trendingWeek = await getTrending('all', 'week', 18);
    const popularMovie = await getPopular('movie', 1, 18);
    const popularTV = await getPopular('tv', 1, 18);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanace: false,
            },
        };
    }

    return {
        props: { session, trendingDay, trendingWeek, popularMovie, popularTV },
    };
};

export default HomePage;
