import styles from '@/styles/layout.module.scss';

import Header from './Header';
import Footer from './Footer';

function LaypOut({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default LaypOut;
