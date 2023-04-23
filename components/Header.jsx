import block from 'module-clsx';
import styles from '@/styles/header.module.scss';

const clsx = block(styles);

function Header() {
    return (
        <div className={clsx('wrapper')}>
            <h1>Header</h1>
        </div>
    );
}

export default Header;
