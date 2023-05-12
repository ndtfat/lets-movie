import styles from '@/styles/detail.module.scss';
import block from 'module-clsx';
const clsx = block(styles);

import { Button, Layout, Card, Screen } from '@/components';
import { getDetail } from '@/lib/api';
import { BsFillStarFill } from 'react-icons/bs';

function DetailPage({ genres, detail }) {
    console.log(detail);

    const handlePlay = () => {
        document.documentElement.scrollTop = 750;
    };

    return (
        <Layout genres={genres}>
            <div className={clsx('body')}>
                <div className={clsx('content')}>
                    <div className={clsx('detail-wrapper')}>
                        <aside className={clsx('poster')}>
                            <img src={detail.poster_path} />
                            {detail.imdb_id ? (
                                <Button
                                    solid
                                    border
                                    className={clsx('play-btn')}
                                    onClick={handlePlay}
                                >
                                    Play
                                </Button>
                            ) : (
                                <span className={clsx('play-btn')}>
                                    tv dont have video try movie
                                </span>
                            )}
                        </aside>
                        <div className={clsx('detail')}>
                            <section className={clsx('header')}>
                                <div className={clsx('title')}>
                                    <h1>{detail.title || detail.name}</h1>
                                    <p>
                                        <span>
                                            {detail.release_date || detail.first_air_date || 'none'}
                                        </span>
                                        <span>{detail.runtime || '0'}m</span>
                                        <span>{detail.adult ? '18+' : '14+'}</span>
                                    </p>
                                </div>

                                <aside className={clsx('rate')}>
                                    {detail.vote_average.toFixed(1)}
                                    <BsFillStarFill
                                        style={{ marginLeft: '20px', color: '#dff236' }}
                                    />
                                </aside>
                            </section>

                            <section className={clsx('info')}>
                                <p className={clsx('overview')}>{detail.overview}</p>
                                <p className={clsx('cast')}>
                                    <span>Cast:</span>
                                    {detail.credits.cast.length > 0 ? (
                                        detail.credits.cast
                                            .filter((cast, index) => index < 6)
                                            .map((cast) => <span key={cast.id}>{cast.name}, </span>)
                                    ) : (
                                        <span>none</span>
                                    )}
                                </p>
                                <p className={clsx('genre')}>
                                    <span>Genre:</span>
                                    {detail.genres.map((genre) => (
                                        <span key={genre.id}>{genre.name}, </span>
                                    ))}
                                </p>
                                <p className={clsx('country')}>
                                    <span>country:</span>
                                    {detail.production_countries.length > 0 ? (
                                        detail.production_countries.map((country) => (
                                            <span key={country}>{country.name}, </span>
                                        ))
                                    ) : (
                                        <span>none</span>
                                    )}
                                </p>
                                <p className={clsx('production')}>
                                    <span>Production:</span>
                                    {detail.production_companies.length > 0 ? (
                                        detail.production_companies.map((production) => (
                                            <span key={production}>{production.name}, </span>
                                        ))
                                    ) : (
                                        <span>none</span>
                                    )}
                                </p>
                            </section>

                            <section className={clsx('similar')}>
                                <h1>Similar Movies</h1>
                                {detail.similar.length > 0 ? (
                                    <ul>
                                        {detail.similar.map((item) => (
                                            <li key={item.id}>
                                                <Card info={item} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ fontSize: '1.4rem' }}>
                                        there is no movie similar {detail.title || detail.name}
                                    </p>
                                )}
                            </section>
                        </div>
                    </div>

                    {detail.imdb_id && (
                        <embed
                            className={clsx('screen')}
                            src={`https://www.2embed.cc/embed/${detail.imdb_id}`}
                        ></embed>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async ({ query }) => {
    const detail = await getDetail(query.media_type, query.id);

    return { props: { detail } };
};

export default DetailPage;
