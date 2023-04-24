import proptypes from 'proptypes';
import block from 'module-clsx';
import styles from '@/styles/header.module.scss';
import Image from 'next/image';
import NavLink from './NavLink';
import { useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import { FiSearch } from 'react-icons/fi';
import { RiCloseCircleFill } from 'react-icons/ri';
import logoImg from '@/public/logo-slogan.png';
import Link from 'next/link';
import { getSearchRes } from '@/lib/movie';

const clsx = block(styles);

function Header({ transparent }) {
    const [searchText, setSearchText] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const headerRef = useRef();
    const inputRef = useRef();

    const handleSearchBox = () => {
        setSearchOpen((prev) => !prev);
        setSearchText('');
        inputRef.current.focus();
        console.log('open search');
    };

    useEffect(() => {
        const handleScroll = () => {
            const opacity = window.scrollY / 500;
            if (transparent) headerRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity > 1 ? 1 : opacity})`;
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // search value
    useEffect(() => {
        (async () => {
            const searchRes = await getSearchRes(searchText);
            setSearchResults(searchRes.results);
        })();
    }, [searchText]);

    return (
        <div ref={headerRef} className={clsx('wrapper', { transparent })}>
            <div className={clsx('header-left')}>
                <Image priority className={clsx('logo')} src={logoImg} alt="logo" />

                <ul className={clsx('navbar')}>
                    <li>
                        <NavLink className={clsx('nav-item')} activeClassName={clsx('active')} href="/main/home">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={clsx('nav-item')} activeClassName={clsx('active')} href="/main/movie">
                            Movie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={clsx('nav-item')} activeClassName={clsx('active')} href="/main/tv">
                            TV
                        </NavLink>
                    </li>
                    <li className={clsx('nav-item')}>Genre</li>
                </ul>
            </div>

            <div className={clsx('header-right')}>
                <div className={clsx('search-box', { open: searchOpen })}>
                    <button onClick={handleSearchBox} className={clsx('search-btn')}>
                        {searchOpen ? <RiCloseCircleFill /> : <FiSearch />}
                    </button>

                    <input
                        ref={inputRef}
                        value={searchText}
                        className={clsx('search-input')}
                        onInput={(e) => setSearchText(e.target.value)}
                    ></input>

                    <div className={clsx('search-list')}>
                        {searchResults
                            .map((result) => {
                                return (
                                    <Link href="/main/home" className={clsx('search-item')}>
                                        <p>{result.name}</p>
                                    </Link>
                                );
                            })
                            .filter((result, index) => {
                                return index < 10;
                            })}
                    </div>
                </div>

                <button onClick={() => signOut()} className={clsx('logout-btn')}>
                    Log out
                </button>
            </div>
        </div>
    );
}

Header.proptypes = {
    transprent: proptypes.bool,
};

export default Header;
