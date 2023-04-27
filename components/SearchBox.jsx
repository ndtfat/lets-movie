import block from 'module-clsx';
import styles from '@/styles/searchBox.module.scss';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useDebounce } from '@/hooks';
import { getSearchRes } from '@/lib/api';

const clsx = block(styles);

function SearchBox() {
    const [searchBox, setSearchBox] = useState({ text: '', isOpen: false, results: [] });
    const inputRef = useRef();

    const handleOpenSearchBox = () => {
        setSearchBox((prev) => {
            if (!prev.isOpen) inputRef.current.focus();

            return {
                text: '',
                isOpen: !prev.isOpen,
                results: [],
            };
        });
    };

    // fetch search value
    const searchDebounced = useDebounce(searchBox.text, 500);
    useEffect(() => {
        if (searchDebounced) {
            (async () => {
                const searchRes = await getSearchRes(searchDebounced);
                setSearchBox((prev) => {
                    return { ...prev, results: searchRes.results };
                });
            })();
        }
    }, [searchDebounced]);

    return (
        <div className={clsx('search-box', { open: searchBox.isOpen })}>
            <button onClick={handleOpenSearchBox} className={clsx('search-btn')}>
                {searchBox.isOpen ? <RiCloseCircleFill /> : <FiSearch />}
            </button>

            <input
                ref={inputRef}
                value={searchBox.text}
                className={clsx('search-input')}
                onInput={(e) =>
                    setSearchBox((prev) => {
                        return { ...prev, text: e.target.value };
                    })
                }
            ></input>

            <div className={clsx('search-list')}>
                {searchBox.results
                    .map((result) => {
                        const movie = result.media_type === 'person' ? result.known_for[0] : result;

                        return movie;
                    })
                    .filter((result) => {
                        return result !== undefined;
                    })
                    .filter((result, index) => {
                        return searchBox.results.length < 7 ? searchBox.results.length : index < 7;
                    })
                    .map((result) => {
                        return (
                            <Link key={result.id} href="/main/home" className={clsx('search-item')}>
                                <p>
                                    <span className={clsx('type')}>{result.media_type}</span>
                                    <span className={clsx('name')}>
                                        {result.title || result.name} --{' '}
                                        {result.release_date || result.first_air_date}
                                    </span>
                                </p>
                            </Link>
                        );
                    })}

                {searchBox.results.length > 0 && (
                    <Link href="/main/home" className={clsx('more-btn')}>
                        See more
                    </Link>
                )}
            </div>
        </div>
    );
}

export default SearchBox;
