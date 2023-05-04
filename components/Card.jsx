import block from 'module-clsx';
import styles from '@/styles/card.module.scss';
const clsx = block(styles);

import Proptypes from 'proptypes';
import { BsPlayCircleFill } from 'react-icons/bs';

function Card({ poster, name, release, description = false }) {
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('poster')}>
                <img src={poster} alt={name} />
                <span>
                    <BsPlayCircleFill />
                </span>
            </div>
            {description && (
                <div className={clsx('description')}>
                    <h3 className={clsx('name')}>{name}</h3>
                    <span className={clsx('release')}>{release}</span>
                </div>
            )}
        </div>
    );
}

Card.proptypes = {
    poster: Proptypes.string.isRequired,
    name: Proptypes.string,
    release: Proptypes.string,
    description: Proptypes.bool,
    detail: Proptypes.array,
};

export default Card;
