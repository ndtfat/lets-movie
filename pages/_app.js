import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return (
        <SessionProvider session={pageProps.session}>
            <AnimatePresence mode="wait">
                <motion.div key={router.route}>
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </SessionProvider>
    );
}
