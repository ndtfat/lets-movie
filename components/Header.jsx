import Proptypes from 'proptypes';
import block from 'module-clsx';
import styles from '@/styles/header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import NavLink from './NavLink';
import { useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Genres from './Genres';
import SearchBox from './SearchBox';
import Logo from './Logo';

const clsx = block(styles);

function Header({ transparent, genres }) {
    const { data: session, status } = useSession();
    const headerRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            const opacity = window.scrollY / 500;
            if (transparent && headerRef.current)
                headerRef.current.style.backgroundColor = `rgba(0, 0, 0, ${
                    opacity > 1 ? 1 : opacity
                })`;
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [transparent]);

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
                            href="/media/movie"
                        >
                            Movie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={clsx('nav-item')}
                            activeClassName={clsx('active')}
                            href="/media/tv"
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

                {session && (
                    <Image
                        className={clsx('user-avatar')}
                        width={100}
                        height={50}
                        src={session.user.image}
                        alt="user-avatar"
                    />
                )}

                {status === 'unauthenticated' ? (
                    <Link href="/login">
                        <button className={clsx('logout-btn')}>Log in</button>
                    </Link>
                ) : (
                    <Link href="/login">
                        <button onClick={() => signOut()} className={clsx('logout-btn')}>
                            Log out
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

Header.proptypes = {
    transprent: Proptypes.bool,
    genres: Proptypes.array.isRequired,
};

export default Header;
