import Proptypes from 'proptypes';
import block from 'module-clsx';
import styles from '@/styles/header.module.scss';
import Image from 'next/image';
import NavLink from './NavLink';
import { useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Genres from './Genres';
import SearchBox from './SearchBox';
import Logo from './Logo';

const clsx = block(styles);

function Header({ transparent, genres }) {
    const { data: session } = useSession();
    const headerRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            const opacity = window.scrollY / 500;
            if (transparent)
                headerRef.current.style.backgroundColor = `rgba(0, 0, 0, ${
                    opacity > 1 ? 1 : opacity
                })`;
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={headerRef} className={clsx('wrapper', { transparent })}>
            <div className={clsx('header-left')}>
                <Logo width={136} height={44} fit="contain" className={clsx('logo')} />

                <ul className={clsx('navbar')}>
                    <li>
                        <NavLink
                            className={clsx('nav-item')}
                            activeClassName={clsx('active')}
                            href="/home"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={clsx('nav-item')}
                            activeClassName={clsx('active')}
                            href="/main/movie"
                        >
                            Movie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={clsx('nav-item')}
                            activeClassName={clsx('active')}
                            href="/main/tv"
                        >
                            TV
                        </NavLink>
                    </li>
                    <li className={clsx('nav-item', { genres: true })}>
                        Genre
                        <div className={clsx('genre-list')}>
                            <Genres genres={genres} />
                        </div>
                    </li>
                </ul>
            </div>

            <div className={clsx('header-right')}>
                <SearchBox />

                <Image
                    className={clsx('user-avatar')}
                    width={100}
                    height={50}
                    src={session.user.image}
                    alt="user-avatar"
                />

                <button onClick={() => signOut()} className={clsx('logout-btn')}>
                    Log out
                </button>
            </div>
        </div>
    );
}

Header.proptypes = {
    transprent: Proptypes.bool,
    genres: Proptypes.array.isRequired,
};

export default Header;
