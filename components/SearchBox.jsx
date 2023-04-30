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
    const [searchBox, setSearchBox] = useState({
        text: '',
        isOpen: false,
        isFocus: false,
        results: [],
    });
    const inputRef = useRef();

    const handleOpenSearchBox = () => {
        setSearchBox((prev) => {
            if (!prev.isOpen) inputRef.current.focus();

            return {
                text: '',
                isOpen: !prev.isOpen,
                isFocus: true,
                results: [],
            };
        });
    };

    useEffect(() => {
        const { current: input } = inputRef;
        const handleFocus = () => {
            setSearchBox((prev) => {
                return { ...prev, isFocus: true };
            });
        };
        const handleBlur = () => {
            setSearchBox((prev) => {
                return { ...prev, isFocus: false };
            });
        };

        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);

        return () => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
        };
    }, []);

    // fetch search value
    const searchDebounced = useDebounce(searchBox.text, 500);
    useEffect(() => {
        if (searchDebounced) {
            (async () => {
                const searchRes = await getSearchRes(searchDebounced, 7);
                setSearchBox((prev) => {
                    return { ...prev, results: searchRes };
                });
            })();
        } else {
            setSearchBox((prev) => {
                return { ...prev, results: [] };
            });
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

            {searchBox.isFocus && (
                <div className={clsx('search-list')}>
                    {searchBox.results.map((result) => {
                        return (
                            <Link key={result.id} href="/home" className={clsx('search-item')}>
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
                        <Link href="/home" className={clsx('more-btn')}>
                            See more
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBox;
