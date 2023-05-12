import block from 'module-clsx';
import styles from '@/styles/search.module.scss';
const clsx = block(styles);

import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
import { getSearchRes } from '@/lib/api';
import { Layout, MovieSection, Pagination } from '@/components';
import Head from 'next/head';

function SearchPage({ genres }) {
    const [resultType, setResultType] = useState('movie');
    const [results, setResults] = useState([]);

    const { query } = useRouter();

    useLayoutEffect(() => {
        (async () => {
            const results = await getSearchRes(query.key, resultType);
            setResults(results);
        })();
    }, [resultType, query.key]);

    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <Layout genres={genres}>
                <div className={clsx('body')}>
                    <div className={clsx('content')}>
                        <h1 className={clsx('title')}>Search Results</h1>
                        <div className={clsx('media-types')}>
                            <span
                                className={clsx('type', { active: resultType === 'movie' })}
                                onClick={() => setResultType('movie')}
                            >
                                Movie
                            </span>
                            <span
                                className={clsx('type', { active: resultType === 'tv' })}
                                onClick={() => setResultType('tv')}
                            >
                                TV
                            </span>
                        </div>
                        <MovieSection list={results} path={`/filter?media_type=${resultType}`} />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default SearchPage;
