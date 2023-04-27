import block from 'module-clsx';
import styles from '@/styles/footer.module.scss';
import { useSession } from 'next-auth/react';
import Logo from './Logo';
import { BsFacebook, BsGithub } from 'react-icons/bs';

const clsx = block(styles);

function Footer() {
    const { data: session } = useSession();

    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('content')}>
                <section className={clsx('logo')}>
                    <Logo width={200} height={135} fit="contain" />
                    <p>
                        <span>Hi</span>
                        <span>{session.user.name}</span>
                    </p>
                </section>
                <section className={clsx('project-desc')}>
                    <div>
                        <p>
                            UI idea: <a href="https://www.themoviedb.org/">themoviedb</a>,{' '}
                            <a href="https://dribbble.com/">dribbble</a>,{' '}
                            <a href="https://www.netflix.com">netflix</a>
                        </p>
                        <p>
                            Here is <a href="https://github.com/ndtfat/lets-movie">source code</a>{' '}
                            you are interested in
                        </p>
                        <p>
                            This is my first project work with NextJs. If you have any suggestion,
                            don't hestiant to give me feedback.
                        </p>
                    </div>
                    <div className={clsx('contact')}>
                        <ul>
                            <li>
                                <a href=" https://www.facebook.com/tienphat.nguyenduong.7">
                                    <BsFacebook />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ndtfat">
                                    <BsGithub />
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Footer;
