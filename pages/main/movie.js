import { Layout } from '@/components';
import { getSession } from 'next-auth/react';

function MoviePage() {
    return (
        <Layout>
            <h1>MoviePage</h1>
        </Layout>
    );
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanace: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default MoviePage;
