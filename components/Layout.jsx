import Header from './Header';
import Footer from './Footer';
import NextNProgress from 'nextjs-progressbar';

function Layout({ children, transparent = false }) {
    return (
        <>
            <NextNProgress color="#f69416" />
            <Header transparent={transparent} />
            {children}
            <Footer />
        </>
    );
}

export default Layout;
