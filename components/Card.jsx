import block from 'module-clsx';
import styles from '@/styles/card.module.scss';
const clsx = block(styles);

import Proptypes from 'proptypes';
import { BsPlayCircleFill } from 'react-icons/bs';
import Link from 'next/link';

function Card({ description = false, info }) {
    return (
        <Link href={`/detail?media_type=${info.media_type}&id=${info.id}`}>
            <div className={clsx('wrapper')}>
                <div className={clsx('poster')}>
                    <img
                        src={info.poster_path || info.backdrop_path}
                        alt={info.title || info.name}
                    />
                    <span>
                        <BsPlayCircleFill />
                    </span>
                </div>
                {description && (
                    <div className={clsx('description')}>
                        <h3 className={clsx('name')}>{info.title || info.name}</h3>
                        <span className={clsx('release')}>
                            {info.release_date || info.first_air_date}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

Card.proptypes = {
    info: Proptypes.object.isRequired,
    description: Proptypes.bool,
};

export default Card;
