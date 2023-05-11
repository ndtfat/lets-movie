import block from 'module-clsx';
import styles from '@/styles/filter.module.scss';
const clsx = block(styles);

import { useEffect, useState } from 'react';
import { TiArrowUnsorted } from 'react-icons/ti';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { AiFillFolder, AiTwotoneCalendar } from 'react-icons/ai';
import { Button, FilterOption, Layout, MovieSection, Pagination } from '@/components';
import { media_types, sortOptions } from '@/lib/arr';
import { getDiscoverList } from '@/lib/api';

function FilterPage({ genres, initialList, initialFilter }) {
    const [filter, setFilter] = useState({
        ...initialFilter,
    });
    const [filterList, setFilterList] = useState(initialList);
    console.log(filterList);

    const handleFilterGenres = (id) => {
        setFilter((prev) => {
            const isChecked = filter.genres.includes(id);
            return {
                ...prev,
                genres: isChecked
                    ? filter.genres.filter((item) => item != id)
                    : [...prev.genres, id],
            };
        });
    };

    const handleFilterMedia = (id) => {
        setFilter((prev) => {
            return { ...prev, media_id: id };
        });
    };

    const handleFilterSortOption = (id) => {
        setFilter((prev) => {
            return { ...prev, sortOption_id: id };
        });
    };

    const handleFilterReleaseFrom = (date) => {
        setFilter((prev) => {
            return { ...prev, release_gt: date };
        });
    };
    const handleFilterReleaseTo = (date) => {
        setFilter((prev) => {
            return { ...prev, release_lt: date };
        });
    };

    const fetchFilteredList = async () => {
        const sortOption = sortOptions.filter((item) => item.id === filter.sortOption_id)[0];
        const media = media_types.filter((item) => item.id === filter.media_id)[0];

        const filteredList = await getDiscoverList(
            media.type,
            filter.genres,
            filter.release_lt,
            filter.release_gt,
            sortOption.query,
            filter.currentPage,
        );

        return filteredList;
    };

    const handleFilterBtn = async () => {
        setFilter((prev) => {
            return { ...prev, currentPage: 1 };
        });
        const list = await fetchFilteredList();
        setFilterList(list);
    };

    const handleSelectPage = async (page) => {
        setFilter((prev) => {
            return { ...prev, currentPage: page };
        });
        const list = await fetchFilteredList();
        document.documentElement.scrollTop = 100;
        setFilterList(list);
    };

    return (
        <Layout genres={genres}>
            <div className={clsx('body')}>
                <div className={clsx('content')}>
                    <h1 className={clsx('title')}>Filter</h1>
                    <ul className={clsx('filter-options')}>
                        <li>
                            <FilterOption
                                radio
                                filter="Type"
                                list={media_types}
                                icon={<TfiLayoutMediaCenterAlt />}
                                checkedList={[filter.media_id]}
                                onFilter={handleFilterMedia}
                            />
                        </li>
                        <li>
                            <FilterOption
                                filter="Genres"
                                list={
                                    media_types[filter.media_id - 1].type === 'movie'
                                        ? genres.movie
                                        : genres.tv
                                }
                                icon={<AiFillFolder />}
                                checkedList={filter.genres}
                                onFilter={handleFilterGenres}
                            />
                        </li>
                        <li>
                            <FilterOption
                                filter="Release"
                                icon={<AiTwotoneCalendar />}
                                release_from={filter.release_gt}
                                release_to={filter.release_lt}
                                onFilterReleaseFrom={handleFilterReleaseFrom}
                                onFilterReleaseTo={handleFilterReleaseTo}
                            />
                        </li>
                        <li>
                            <FilterOption
                                radio
                                filter="Sort"
                                list={sortOptions}
                                icon={<TiArrowUnsorted />}
                                checkedList={[filter.sortOption_id]}
                                onFilter={handleFilterSortOption}
                            />
                        </li>
                        <li>
                            <Button onClick={handleFilterBtn} size={16}>
                                Filter
                            </Button>
                        </li>
                    </ul>
                    <MovieSection list={filterList} />
                    <Pagination
                        currentPage={filter.currentPage}
                        onPageSelected={handleSelectPage}
                    />
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async ({ query }) => {
    console.log(query);

    const initialGenre = query.genre ? [Number(query.genre)] : [];
    const initialMediaId = query.media_type
        ? media_types.filter((item) => item.type === query.media_type)[0].id
        : 1;
    let initialSortId = query.sort_by
        ? sortOptions.filter((item) => item.query === query.sort_by)[0].id
        : 1;

    const initialFilter = {
        genres: initialGenre,
        media_id: initialMediaId,
        release_gt: '',
        release_lt: '',
        sortOption_id: initialSortId,
        currentPage: 1,
    };

    const initialList = await getDiscoverList(
        media_types[initialMediaId - 1].type,
        initialGenre,
        '', //from
        '', //to
        sortOptions[initialSortId - 1].query,
    );
    return {
        props: { initialList, initialFilter },
    };
};

export default FilterPage;
