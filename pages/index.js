import styles from '@/styles/index.module.scss';
import block from 'module-clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components';
import logoImg from '../public/logo.png';
import handImg from '../public/startPage/handing-remote.png';

const clsx = block(styles);

function WelcomePage() {
    const [mount, setMount] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setMount(false);
        }, 3800);
    }, []);

    return (
        <div className={clsx('wrapper')}>
            {mount && (
                <div className={clsx('animate-wrapper')}>
                    <Image priority className={clsx('hand-img')} src={handImg} alt="hand" />
                </div>
            )}

            <div className={clsx('logo-wrapper')}>
                <Image priority className={clsx('logo')} src={logoImg} alt="logo" />
                <p className={clsx('slogan')}>
                    <span>Let's</span> <span>movie</span>
                </p>
            </div>

            <Link href="/login" className={clsx('login-btn')}>
                <Button size={20}>Get started</Button>
            </Link>
        </div>
    );
}

export default WelcomePage;
