import { Button } from '@/components';
import styles from '@/styles/slider.module.scss';
import block from 'module-clsx';
import { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const clsx = block(styles);
const textEffect = {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
};

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
                        <div style={{ overflow: 'hidden' }}>
                            <motion.h1
                                className={clsx('title')}
                                variants={textEffect}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                {list[currentMovie].title || list[currentMovie].name}
                            </motion.h1>
                        </div>

                        <div style={{ overflow: 'hidden' }}>
                            <motion.div
                                className={clsx('sub-title')}
                                variants={textEffect}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                <BsFillStarFill className={clsx('star-icon')} />
                                <span className={clsx('rate')}>
                                    {list[currentMovie].vote_average.toFixed(1)}
                                </span>
                                <span className={clsx('release')}>
                                    {list[currentMovie].release_date ||
                                        list[currentMovie].first_air_date}
                                </span>
                            </motion.div>
                        </div>

                        <div style={{ overflow: 'hidden' }}>
                            <motion.p
                                className={clsx('overview')}
                                variants={textEffect}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                {list[currentMovie].overview}
                            </motion.p>
                        </div>

                        <div style={{ overflow: 'hidden' }}>
                            <motion.div
                                variants={textEffect}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                <Button solid bold size={26} className={clsx('play-btn')}>
                                    Play
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
}

export default RepresentrativeMovie;
