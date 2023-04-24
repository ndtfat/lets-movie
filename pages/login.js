import { Button } from '@/components';
import styles from '@/styles/login.module.scss';
import block from 'module-clsx';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { GrGoogle } from 'react-icons/gr';
import logoImg from '../public/logo.png';

const clsx = block(styles);

function LoginPage() {
    const handleSignIn = (method) => {
        signIn(method, { callbackUrl: 'http://localhost:3000/main/home' });
    };

    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('login-box')}>
                <div className={clsx('title')}>
                    L
                    <Image src={logoImg} alt="backgournd" />
                    gin
                </div>

                <div className={clsx('logins')}>
                    <div onClick={() => handleSignIn('github')} className={clsx('method', { github: true })}>
                        <Button bold size={14} border>
                            Login with github
                            <BsGithub className={clsx('icon')} />
                        </Button>
                    </div>
                    <div onClick={() => handleSignIn('google')} className={clsx('method', { google: true })}>
                        <Button bold size={14} border>
                            Login with google
                            <GrGoogle className={clsx('icon')} />
                        </Button>
                    </div>
                    <div onClick={() => handleSignIn('facebook')} className={clsx('method', { facebook: true })}>
                        <Button bold size={14} border>
                            Login with facebook
                            <BsFacebook className={clsx('icon')} />
                        </Button>
                    </div>
                </div>

                <footer className={clsx('footer')}>@let's discover cinema world</footer>
            </div>
        </div>
    );
}

export default LoginPage;
