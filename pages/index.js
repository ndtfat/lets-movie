import styles from '@/styles/index.module.scss';
import block from 'module-clsx';
const clsx = block(styles);

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import handImg from '../public/startPage/handing-remote.png';
import { Button, Logo } from '@/components';

function WelcomePage() {
    const [mount, setMount] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setMount(false);
        }, 3800);
    }, []);

    return (
        <>
            <Head>
                <title>Lets movie</title>
            </Head>
            <div className={clsx('wrapper')}>
                {mount && (
                    <div className={clsx('animate-wrapper')}>
                        <Image priority className={clsx('hand-img')} src={handImg} alt="hand" />
                    </div>
                )}

                <div className={clsx('logo-wrapper')}>
                    <Logo width={120} height={120} fit="contain" className={clsx('logo')} />

                    <p className={clsx('slogan')}>
                        <span>Lets</span> <span>movie</span>
                    </p>
                </div>

                <Link href="/home" className={clsx('start-btn')}>
                    <Button size={20}>Get started</Button>
                </Link>
            </div>
        </>
    );
}

export default WelcomePage;
