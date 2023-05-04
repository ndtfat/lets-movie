import styles from '@/styles/login.module.scss';
import block from 'module-clsx';
import Image from 'next/image';
import { signIn, getSession } from 'next-auth/react';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { GrGoogle } from 'react-icons/gr';
import logoImg from '../public/logo.png';
import { Button, Logo } from '@/components';
import Link from 'next/link';

const clsx = block(styles);

function LoginPage() {
    const handleSignIn = (method) => {
        signIn(method, { callbackUrl: 'http://localhost:3000/home' });
    };

    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('login-box')}>
                <div className={clsx('title')}>
                    L
                    <Logo width={44} height={34} />
                    gin
                </div>

                <div className={clsx('logins')}>
                    <div
                        onClick={() => handleSignIn('github')}
                        className={clsx('method', { github: true })}
                    >
                        <Button bold size={14} border>
                            Login with github
                            <BsGithub className={clsx('icon')} />
                        </Button>
                    </div>
                    <div
                        onClick={() => handleSignIn('google')}
                        className={clsx('method', { google: true })}
                    >
                        <Button bold size={14} border>
                            Login with google
                            <GrGoogle className={clsx('icon')} />
                        </Button>
                    </div>
                    <div
                        onClick={() => handleSignIn('facebook')}
                        className={clsx('method', { facebook: true })}
                    >
                        <Button bold size={14} border>
                            Login with facebook
                            <BsFacebook className={clsx('icon')} />
                        </Button>
                    </div>
                    <div className={clsx('method')}>
                        <Link href="/home">
                            <Button solid bold size={14} border>
                                Guess
                            </Button>
                        </Link>
                    </div>
                </div>

                <footer className={clsx('footer')}>@let's discover movie world</footer>
            </div>
        </div>
    );
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: '/home',
                permanace: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default LoginPage;
