import { Button } from '@/components';
import styles from '@/styles/slider.module.scss';
import block from 'module-clsx';
import { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const clsx = block(styles);

function RepresentrativeMovie({ list }) {
    const [currentMovie, setCurrentMovie] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMovie((prev) => {
                return prev < list.length - 1 ? prev + 1 : 0;
            });
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            <div key={list[currentMovie].id} className={clsx('wrapper')}>
                <motion.img
                    src={list[currentMovie].backdrop_path}
                    className={clsx('image')}
                    alt="representative-movie"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
                <div className={clsx('overview-wrapper')}>
                    <div className={clsx('overview-content')}>
                        <h1 className={clsx('title')}>
                            {list[currentMovie].title || list[currentMovie].name}
                        </h1>
                        <div className={clsx('sub-title')}>
                            <BsFillStarFill className={clsx('star-icon')} />
                            <span className={clsx('rate')}>
                                {list[currentMovie].vote_average.toFixed(1)}
                            </span>
                            <span className={clsx('release')}>
                                {list[currentMovie].release_date ||
                                    list[currentMovie].first_air_date}
                            </span>
                        </div>
                        <p className={clsx('overview')}>{list[currentMovie].overview}</p>

                        <div>
                            <Button solid bold size={26} className={clsx('play-btn')}>
                                Play
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
}

export default RepresentrativeMovie;
