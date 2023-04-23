import block from 'module-clsx';
import styles from '@/styles/footer.module.scss';

const clsx = block(styles);

function Footer() {
    return (
        <div className={clsx('wrapper')}>
            <h1>Footer</h1>
        </div>
    );
}

export default Footer;
