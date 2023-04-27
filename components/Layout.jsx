import Proptypes from 'proptypes';
import NextNProgress from 'nextjs-progressbar';

import Header from './Header';
import Footer from './Footer';

function Layout({ children, transparent = false, genres }) {
    return (
        <>
            <NextNProgress color="#f69416" />
            <Header genres={genres} transparent={transparent} />
            {children}
            <Footer />
        </>
    );
}

Layout.prototype = {
    children: Proptypes.any,
    transparent: Proptypes.bool,
    genres: Proptypes.array.isRequired,
};

export default Layout;
