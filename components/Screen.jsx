import block from 'module-clsx';
import styles from '@/styles/screen.module.scss';
const clsx = block(styles);

function Screen(src) {
    return (
        <div className={clsx('wrapper')}>
            <iframe src={src}></iframe>
        </div>
    );
}

export default Screen;
