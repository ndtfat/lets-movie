import '@/styles/globals.scss';
import { motion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import App from 'next/app';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { getGenreList } from '../lib/api';

export default function MyApp({ Component, pageProps, genres }) {
    const router = useRouter();

    return (
        <SessionProvider session={pageProps.session}>
            {/* <AnimatePresence mode="wait"> */}
            <motion.div key={router.route}>
                <NextNProgress color="#f69416" />
                <Component {...pageProps} genres={genres} />
            </motion.div>
            {/* </AnimatePresence> */}
        </SessionProvider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const genresMovie = await getGenreList('movie');
    const genresTV = await getGenreList('tv');

    const genres = { movie: genresMovie.genres, tv: genresTV.genres };

    return {
        ...appProps,
        genres,
    };
};
