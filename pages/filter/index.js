import block from 'module-clsx';
import styles from '@/styles/filter.module.scss';
const clsx = block(styles);

import { useRouter } from 'next/router';
import { Layout, MovieSection } from '@/components';

function FilterPage({ genres }) {
    console.log(useRouter().query);

    return (
        <Layout genres={genres}>
            <div className={clsx('body')}>
                <div className={clsx('content')}>
                    <h1 className={clsx('title')}>Filter</h1>
                    <ul className={clsx('ffilter-options')}></ul>
                </div>
                <MovieSection />
            </div>
        </Layout>
    );
}

export default FilterPage;
