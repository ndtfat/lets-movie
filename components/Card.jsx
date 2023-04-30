import block from 'module-clsx';
import styles from '@/styles/card.module.scss';
const clsx = block(styles);

function Card({ poster, name, release }) {
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('poster')}>
                <img src={poster} alt={name} />
                <span>{name}</span>
            </div>
            <div className={clsx('detail')}>
                <h3 className={clsx('name')}>{name}</h3>
                <span className={clsx('release')}>{release}</span>
            </div>
        </div>
    );
}

export default Card;
