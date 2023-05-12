import styles from '@/styles/login.module.scss';
import block from 'module-clsx';
const clsx = block(styles);

import Link from 'next/link';
import Head from 'next/head';
import { getSession, signIn } from 'next-auth/react';
import { GrGoogle } from 'react-icons/gr';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { Button, Logo } from '@/components';

function LoginPage() {
    const handleSignIn = (method) => {
        signIn(method, { callbackUrl: 'http://localhost:3000/home' });
    };

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
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

                    <footer className={clsx('footer')}>@lets discover movie world</footer>
                </div>
            </div>
        </>
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
